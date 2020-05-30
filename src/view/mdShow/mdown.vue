<template>
  <div>
    <index-item></index-item>
    <vue-markdown :source="htmlMD"></vue-markdown>
  </div>
</template>
<script>
import IndexItem from "./index.md";
import axios from "axios";
import VueMarkdown from "vue-markdown";
// import 'highlight.js/styles/github.css'
// import 'github-markdown-css'

// import Index from "./mdFiles/index.md"
export default {
  name: "mdown_page",
  components: {
    VueMarkdown,
    IndexItem
  },
  data() {
    return {
      htmlMD
    };
  },
  beforeCreate() {
    this.$nextTick(function() {
      const url = `./index.md`;
      axios.get(url).then(response => {
        this.htmlMD = response.data;
      });
    });
  }
};
</script>

<style>
</style>

