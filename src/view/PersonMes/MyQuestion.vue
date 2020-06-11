<template>
  <div>
    <question-item v-for=" (a,index) in articles" :key="a.id" v-bind="a" ref="QuestionItem">
      <el-dropdown slot="MoreAction" @command="handleCommand">
        <span class="el-dropdown-link">
          更多操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="index">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </question-item>

    <Page
      :total="questionNum"
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
  name: "QuestionScrollPage",
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
        this.innerPage.pageNumber = 1;
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
    this.getQuestions({ pageIndex: this.innerPage.pageNumber });
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
      questionNum: 0
    };
  },
  methods: {
    ...mapActions(["getNetAskByAuthor", "countOfAuthorQuestions"]),
    load() {},
    view(id) {
      this.$router.push({ path: `/viewQuestion/${id}` });
    },
    
    handleCommand(command) {
      this.$refs.QuestionItem[command].delete();
            this.$message({
        type: "success",
        message: "删除成功!",
        showClose: true
      });
    },
    handleCurrentChange(val) {
      this.getQuestions({ pageIndex: val - 1 });
    },
    getQuestions({ pageIndex }) {
      let that = this;
      that.loading = true;
      this.countOfAuthorQuestions().then(res => {
        this.questionNum = res.data;
      });
      this.getNetAskByAuthor({ pageIndex })
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
