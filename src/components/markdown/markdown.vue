<template>
  <mavon-editor
    class="me-editor"
    ref="md"
    v-model="editor.value"
    @imgAdd="imgAdd"
    v-bind="editor">
  </mavon-editor>
</template>


<script>

  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import { mapActions } from "vuex";

  export default {
    name: 'MarkdownEditor',
    props: {
      editor: Object
    },
    data() {
      return {}
    },
    mounted() {
      this.$set(this.editor, 'ref', this.$refs.md)
    },
    methods: {
      ...mapActions(["imgUpload"]),
      imgAdd(pos, $file) {
        let formData = new FormData();
        formData.append('file', $file);
        this.imgUpload({formData}).then(res => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          console.log(res);
          this.$refs.md.$img2Url(pos, res.data);
        }).catch(err => {
          this.$message({message: err, type: 'error', showClose: true});
        })
      }
    },
    components: {
      mavonEditor
    }
  }
</script>
<style scoped>
  .me-editor {
    z-index: 6 !important;
  }

  .v-note-wrapper.fullscreen {
    top: 60px !important
  }
</style>
