<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <question-item v-for="a in articles" :key="a.id" v-bind="a"></question-item>
        <Page
      :total="questionNum"
      @on-change="handleCurrentChange"
      class="page-jump"
      :page-size="5"
      show-total
      show-elevator
    ></Page>
  </scroll-page>
</template>

<script>
import QuestionItem from "@/components/question/QuestionItem";
import ScrollPage from "./ScrollPage.vue";
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
    }
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage.pageNumber = 0;
        this.getArticles();
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage = this.page;
        this.getArticles();
      },
      deep: true
    }
  },
  created() {
    this.getQuestions({pageIndex:this.innerPage.pageNumber});
  },
  data() {
    return {
      loading: false,
      noData: false,
      innerPage: {
        pageSize: 5,
        pageNumber: 0,
        name: "a.createDate",
        sort: "desc"
      },
      articles: [],
      questionNum:0
    };
  },
  methods: {
    ...mapActions(["getNetAsk","countOfAllQuestions"]),
    load() {
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    handleCurrentChange(val) {
      this.getQuestions({pageIndex:val - 1});
    },
    getQuestions({pageIndex}) {
      let that = this;
      that.loading = true;
      this.countOfAllQuestions().then(res =>{
        this.questionNum = res.data
      })
      this.getNetAsk({pageIndex})
        .then(res => {
          let newArticles = res.data;
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            that.articles = newArticles;
          } else {
            that.noData = true;
          }
        })
        .catch(err => {
          if (error !== "error") {
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
    }
  },
  components: {
    "scroll-page": ScrollPage,
    QuestionItem
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
