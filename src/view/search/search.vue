<template>
  <div class="home">
    <div class="home-search-panel">
      <SearchLogo class="my-search-logo" />
      <SearchBar class="my-search-bar" />
    </div>
  </div>
</template>

<script>
import SearchLogo from "./components/search-logo.vue";
import SearchBar from "./components/search-bar.vue";
export default {
  name: "search_page",
  components: {
    SearchLogo,
    SearchBar
  },
  data() {
    return {

    }
  }
};
</script>

<style lang="less" scoped>
.my-search-logo {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
}
.my-search-bar {
  margin: auto;
}
</style>

