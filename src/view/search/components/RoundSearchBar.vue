<template>
  <div class="round-search-bar">
    <i-input v-model="searchText" size="large" @on-enter="doSearch">
      <i-select v-model="select" slot="prepend" style="width: 80px">
        <i-option value="Article">文章</i-option>
        <i-option value="Question">问题</i-option>
      </i-select>
      <i-button icon="ios-search" slot="append" @click="doSearch"></i-button>
    </i-input>
  </div>
</template>

<script>
import Util from "./../common/Util";
export default {
  name: "round-search-bar",
  props: ["search"],
  data() {
    return {
      searchText: "",
      select: "Article"
    };
  },
  created() {
    this.searchText = this.search;
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

.round-search-bar {
  width: 400px;
  position: relative;
  display: inline-block;
}
.input-search {
  outline: none;
  width: 100%;
  height: @round-search-bar-height;
  border-radius: @round-search-bar-border-radius;
  border: solid 1px @color-border-gray;
  padding: 20px;
  box-sizing: border-box;
  font-size: 1.2em;
}
.btn-search {
  outline: none;
  height: @round-search-bar-height;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
}
.icon-search {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
</style>

