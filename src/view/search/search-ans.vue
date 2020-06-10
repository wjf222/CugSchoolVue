<template>
  <div class="search-page">
    <SearchResultToolBar v-model="search" />
    <div>
      <el-container>
        <el-main class="me-articles">
          <article-scroll-page ref="articlePage" v-bind="searchParams"></article-scroll-page>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import SearchResultToolBar from "./components/SearchResultToolBar.vue";
import SearchResultItem from "./components/SearchResultItem.vue";
import ArticleScrollPage from "@/components/article/ArticleScrollPage";
import { mapActions } from "vuex";
export default {
  components: {
    SearchResultToolBar,
    SearchResultItem,
    ArticleScrollPage
  },
  data() {
    return {
      searchResultList: [],
      searchParams: {
        searchText: "",
        select: ""
      }
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
      console.log(this);
      this.searchParams.searchText = this.$route.query.searchText;
      this.searchParams.select = this.$route.query.select;
      console.log(this.searchParams.searchText);
      
      this.$refs.articlePage.rePageNumber();
      this.$refs.articlePage.getArticles(this.searchParams.searchText);
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 960px;
}
</style>
