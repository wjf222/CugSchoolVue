<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.Id" v-bind="a"></article-item>
    <Page
      :total="ArticlNum"
      @on-change="handleCurrentChange"
      class="page-jump"
      :page-size="5"
      show-total
      show-elevator
    ></Page>
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
    },
    searchText: "",
    select: ""
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage.pageNumber = 1;
        this.getArticles(this.searchText);
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage = this.page;
        this.getArticles(this.searchText);
      },
      deep: true
    }
  },
  created() {},
  data() {
    return {
      articleNum: Number,
      loading: false,
      noData: false,
      ArticlNum: 0,
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
  created() {
    console.log();
    this.getArticles(this.searchText);
  },
  methods: {
    ...mapActions(["searchArticle", "getEssaies"]),
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
      this.searchArticle({ searchText, page: that.innerPage.pageNumber })
        .then(res => {
          this.ArticlNum = res.data.count;

          let newArticles = res.data.searchList;
          // if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            that.articles = newArticles;
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
      this.searchArticle({ searchText, page: val - 1 })
        .then(res => {
          let newArticles = res.data.searchList;
          if (newArticles && newArticles.length > 0) {
            this.innerPage.pageNumber += 1;
            this.articles = newArticles;
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
