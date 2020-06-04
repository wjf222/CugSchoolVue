<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.Id" v-bind="a">你好</article-item>
  </scroll-page>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
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
        pageNumber: 0,
        name: "a.createDate",
        sort: "desc"
      },
      articles: []
    };
  },
  methods: {
    ...mapActions(["searchArticle"]),
    load() {
      this.getArticles();
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    getArticles() {
      let that = this;
      const { searchText } = this.$route.params;
      that.loading = true;
      this.searchArticle({searchText, page: that.innerPage.pageNumber })
        .then(res => {
          let newArticles = res.data.searchList;
          console.log(newArticles);
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
        console.log(this.articles);
    }
  },
  components: {
    'article-item': ArticleItem,
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
