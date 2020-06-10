<template>
  <!-- <div class="home-search-bar"> -->
  <i-input v-model="searchText" size="large" @on-enter="doSearch">
    <i-select v-model="select" slot="prepend" placeholder="文章" style="width: 80px">
      <i-option value="Article" label="文章"></i-option>
      <i-option value="Question" label="问题">问题</i-option>
    </i-select>
    <i-button icon="ios-search" slot="append" @click="doSearch"></i-button>
  </i-input>
  <!-- </div> -->
</template>

<script>
import Util from "./../common/Util";
export default {
  name: "home-search-bar",
  data() {
    return {
      searchText: "",
      select: "Article"
    };
  },
  methods: {
    doSearch() {
      if (this.select === "Article") {
        Util.searchAPI(this.$router, {
          searchText: this.searchText,
          select: this.select
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../themes/base.less";
.home-search-bar {
  max-width: 1050px;
}
.input-search {
  outline: none;
  width: 70%;
  height: @home-search-bar-height;
  box-sizing: border-box;
  border: solid 1px #dfe1e5;
  vertical-align: bottom;
  font-size: 1.2em;
  border-top-left-radius: @home-search-bar-border-radius;
  border-bottom-left-radius: @home-search-bar-border-radius;
  padding: 20px;
}
.btn-search {
  outline: none;
  width: 30%;
  height: @home-search-bar-height;
  box-sizing: border-box;
  background-color: @color-primary;
  color: white;
  font-size: 1.6em;
  border: none;
  border-top-right-radius: @home-search-bar-border-radius;
  border-bottom-right-radius: @home-search-bar-border-radius;
}
</style>
