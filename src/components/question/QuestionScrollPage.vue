<template>
  <div>
    <question-item v-for="a in questions" :key="a.Id" v-bind="a"></question-item>
    <Page
      :total="ArticlNum"
      @on-change="handleCurrentChange"
      class="page-jump"
      :page-size="5"
      show-total
      show-elevator
    ></Page>
  </div>
</template>

<script>
import QuestionItem from "@/components/question/QuestionItem";
import { mapActions } from "vuex";
export default {
  name: "ArticleScrollPage",
  props: {
    offset: {
      type: Number,
      default: 100
    },
    page: {
      type: Object,
      default() {
        return {};
      }
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    },
    searchText: "",
    select: ""
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.questions = [];
        this.innerPage.pageNumber = 1;
        this.getArticles(this.searchText);
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.questions = [];
        this.innerPage = this.page;
        this.getArticles(this.searchText);
      },
      deep: true
    }
  },
  created() {},
  data() {
    return {
      questionNum: Number,
      loading: false,
      noData: false,
      ArticlNum: 0,
      innerPage: {
        pageSize: 5,
        pageNumber: 0,
        name: "a.createDate",
        sort: "desc"
      },
      questions: []
    };
  },
  created() {
    console.log();
    this.getArticles(this.searchText);
  },
  methods: {
    ...mapActions(["searchQuestion", "getEssaies"]),
    load() {
      this.getArticles(this.searchText);
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    rePageNumber() {
      this.innerPage.pageNumber = 0;
    },
    getArticles(searchText) {
      let that = this;
      console.log(searchText);
      that.loading = true;
      this.searchQuestion({ searchText, page: that.innerPage.pageNumber })
        .then(res => {
            console.log(res);
          this.ArticlNum = res.data.count;

          let newArticles = res.data.searchList;
          // if (newArticles && newArticles.length > 0) {
          that.innerPage.pageNumber += 1;
          that.questions = newArticles;
          // } else {
          //   that.noData = true;
          // }
        })
        .catch(err => {
          if (err !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          that.loading = false;
        });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      const { searchText } = this.$route.query.searchText;
      this.searchQuestion({ searchText, page: val - 1 })
        .then(res => {
          let newArticles = res.data.searchList;
          if (newArticles && newArticles.length > 0) {
            this.innerPage.pageNumber += 1;
            this.questions = newArticles;
          } else {
            this.noData = true;
          }
        })
        .catch(err => {
          if (err !== "error") {
            this.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: {
    "question-item": QuestionItem,
  }
};
</script>

<style scoped>
.page-jump {
  text-align: center;
}
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
}
</style>
