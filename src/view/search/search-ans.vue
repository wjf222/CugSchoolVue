<template>
  <div class="search-page">
    <SearchResultToolBar v-model="search" />
    <div>
      <el-container>
        <el-main class="me-articles">
          <article-scroll-page v-if="showArticle" ref="articlePage" v-bind="searchParams"></article-scroll-page>
          <question-scroll-page v-if="!showArticle" ref="questionPage" v-bind="searchParams"></question-scroll-page>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import SearchResultToolBar from "./components/SearchResultToolBar.vue";
import SearchResultItem from "./components/SearchResultItem.vue";
import ArticleScrollPage from "@/components/article/ArticleScrollPage";
import QuestionScrollPage from "@/components/question/QuestionScrollPage";
import { mapActions } from "vuex";
export default {
  components: {
    SearchResultToolBar,
    SearchResultItem,
    ArticleScrollPage,
    QuestionScrollPage
  },
  data() {
    return {
      searchResultList: [],
      searchParams: {
        searchText: "",
        select: ""
      },
      showArticle: true
    };
  },
  computed: {
    search() {
      return this.$route.query.searchText;
    }
  },
  created() {
    this.searchParams.searchText = this.$route.query.searchText;
    this.searchParams.select = this.$route.query.select;
    this.doSearchResult();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.doSearchResult();
  },
  methods: {
    ...mapActions(["searchArticle"]),
    doSearchResult() {
      this.searchParams.searchText = this.$route.query.searchText;
      this.searchParams.select = this.$route.query.select;
      console.log(this.searchParams.select);
      if (this.searchParams.select === "Question") {
        this.showArticle = false;
        console.log(this.searchParams.searchText);
        this.$refs.questionPage.rePageNumber();
        this.$refs.questionPage.getArticles(this.searchParams.searchText);
      }
      if (this.searchParams.select === "Article") {
        showArticle = true;
        console.log(this.searchParams.searchText);
        this.$refs.articlePage.rePageNumber();
        this.$refs.articlePage.getArticles(this.searchParams.searchText);
      }
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 960px;
}
</style>
