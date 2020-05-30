<template>
  <div>
    <blog-item></blog-item>
  </div>
</template>
<script>
import BlogItem from "./blog-item.vue";
// import 'highlight.js/styles/github.css'
// import 'github-markdown-css'

// import Index from "./mdFiles/index.md"
export default {
  name: "blog_page",
  components: {
    BlogItem
  },
  methods: {
    $save(value, render) {
      console.log(value);
      console.log(render);
    },
    $htmlCode(status, value) {
      console.log(value);
      console.log(render);
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      axios({
        url: "server url",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url);
      });
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>

<style lang="less">
.search-con {
  padding: 10px 0;
  .search {
    &-col {
      display: inline-block;
      width: 200px;
    }
    &-input {
      display: inline-block;
      width: 400px;
      margin-left: 300px;
    }
    &-btn {
      margin-left: 2px;
    }
  }
}
</style>

