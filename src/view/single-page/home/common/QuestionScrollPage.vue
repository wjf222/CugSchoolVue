<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <question-item v-for="a in articles" :key="a.id" v-bind="a"></question-item>
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
    this.getArticles();
  },
  data() {
    return {
      loading: false,
      noData: false,
      innerPage: {
        pageSize: 5,
        pageNumber: 1,
        name: "a.createDate",
        sort: "desc"
      },
      articles: []
    };
  },
  methods: {
    ...mapActions(["getNetAsk"]),
    load() {
      this.getArticles();
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    getArticles() {
      let that = this;
      that.loading = true;
      this.getNetAsk()
        .then(res => {
           console.log(res);
          let newArticles = res.data;
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            that.articles = that.articles.concat(newArticles);
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
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
}
</style>
