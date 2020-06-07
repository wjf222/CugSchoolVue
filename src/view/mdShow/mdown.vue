<template>
  <div>
    <index-item></index-item>
    <!-- <vue-markdown :source="htmlMD"></vue-markdown>
    <button @click="getMd"></button> -->
  </div>
</template>
<script>
import IndexItem from "./index.md";
import HttpRequest from "@/libs/axios";
import VueMarkdown from "vue-markdown";
import marked from "marked";
import 'highlight.js/styles/github.css'
import 'github-markdown-css'
const axios = new HttpRequest("http://39.99.203.80:8080/");
// import Index from "./index.md"
export default {
  name: "mdown_page",
  components: {
    VueMarkdown,
    IndexItem
  },
  methods: {
    getMd() {
      axios
        .request({
          url: "images/index.md"
        })
        .then(res => {
          this.htmlMD = res.data
        });
    }
  },
  data() {
    return {
      htmlMD: ""
    };
  },
  beforeCreate() {

  }
};
</script>

<style>
</style>

