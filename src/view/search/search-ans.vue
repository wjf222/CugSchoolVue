<template>
  <div class="search-page">
    <SearchResultToolBar v-model="search" />
    <div v-for="info in searchResultList" :key="info.essayId">
      <SearchResultItem :info="info" />
    </div>
  </div>
</template>

<script>
import SearchResultToolBar from "./components/SearchResultToolBar.vue";
import SearchResultItem from "./components/SearchResultItem.vue";
import { mapActions } from "vuex";
const DB = require("./data/search.json");
export default {
  components: {
    SearchResultToolBar,
    SearchResultItem
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
      // this.searchResultList = DB["searchList"];
      // console.log(this.searchResultList);
    }
  }
};
</script>
