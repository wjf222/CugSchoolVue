<template>
  <div class="search-page">
    <SearchResultToolBar v-model="search" />
    <div>
      <el-container>
        <el-main class="me-articles">
          <article-scroll-page></article-scroll-page>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import SearchResultToolBar from "./components/SearchResultToolBar.vue";
import SearchResultItem from "./components/SearchResultItem.vue";
import ArticleScrollPage from "@/components/article/ArticleScrollPage"
import { mapActions } from "vuex";
export default {
  components: {
    SearchResultToolBar,
    SearchResultItem,
    ArticleScrollPage
  },
  data() {
    return {
      searchResultList: []
    };
  },
  computed: {
    search() {
      return this.$route.params.searchText;
    }
  },
  created() {
    this.doSearchResult();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.doSearchResult();
  },
  methods: {
    ...mapActions(["searchArticle"]),
    doSearchResult() {
      const { searchText } = this.$route.params;
      this.searchArticle({ searchText }).then(res => {
        const data = res.data
        this.searchResultList = data.searchList
      });
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 960px;
}
</style>
