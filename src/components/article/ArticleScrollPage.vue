<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.Id" v-bind="a"></article-item>
  </scroll-page>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
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
      questions: []
    };
  },
  methods: {
    ...mapActions(["searchArticle", "getEssaies"]),
    load() {
      this.getArticles();
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    rePageNumber() {
      this.innerPage.pageNumber = 0;
    },
    getArticles() {
      let that = this;
      const { searchText } = this.$route.params;
      that.loading = true;
      this.searchArticle({ searchText, page: that.innerPage.pageNumber })
        .then(res => {
          console.log(res);
          let newArticles = res.data.searchList;
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
    },
    getArticleByAuthor(Author) {
      that.loading = true;
      this.searchArticle({ author: Author })
        .then(res => {
          let newArticles = res.data.searchList;
          if (newArticles && newArticles.length > 0) {
            // that.innerPage.pageNumber += 1;
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
    "article-item": ArticleItem,
    "scroll-page": ScrollPage
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
