<template>
  <el-header class="me-area">
    <el-row class="me-header">
      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="http://39.99.203.80:8080/images/1.jpg" />
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="16">
        <el-menu
          :router="true"
          menu-trigger="click"
          active-text-color="#5FB878"
          :default-active="activeIndex"
          mode="horizontal"
        >
          <el-menu-item index="/index">首页</el-menu-item>
          <el-menu-item index="/question">等你来答</el-menu-item>
          <el-menu-item index="/answer">回答</el-menu-item>

          <el-menu-item>
            <i-input icon="ios-search" placeholder="输入问题"></i-input>
            <i-button type="primary" @click="askShow()">提问</i-button>
          </el-menu-item>
          <el-col :span="2" :offset="4">
            <el-menu-item index="/article/article_page">
              <i class="el-icon-edit"></i>写文章
            </el-menu-item>
          </el-col>
        </el-menu>
      </el-col>
      <template v-else>
        <slot></slot>
      </template>
    </el-row>
    <el-dialog title :visible.sync="askVisible">
      <el-form :model="form">
        <el-form-item>
          <img src="http://39.99.203.80:8080/images/zhihu.jpg" height="40" width="40" />
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth"> -->
        <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
        <markdown-editor :editor="form.editor"></markdown-editor>
        <!-- </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="askVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishAsk()">确 定</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
import User from "@/components/main/components/user";
import MarkdownEditor from "@/components/markdown";
import { mapActions } from "vuex";
export default {
  name: "BaseHeader",
  components: {
    User,
    MarkdownEditor
  },
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      homeImg: "http://39.99.203.80:8080/images/1.jpg",
      unreadCount: [3, 2, 1],
      askVisible: false,
      form: {
        title: "",
        editor: {
          value: "",
          ref: "", //保存mavonEditor实例  实际不该这样
          default_open: "edit",
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            imagelink: true, // 图片链接
            code: true, // code
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            navigation: true, // 导航目录
            //subfield: true, // 单双栏模式
            preview: true // 预览
          }
        }
      }
    };
  },
  computed: {
    user() {
      let login = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      return {
        login,
        avatar
      };
    }
  },
  methods: {
    ...mapActions(["publishNetAsk"]),
    logout() {
      let that = this;
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({ message: error, type: "error", showClose: true });
          }
        });
    },
    askShow() {
      this.askVisible = true;
    },
    publishAsk() {
      if (!this.form.title) {
        this.$message({
          message: "标题不能为空哦",
          type: "warning",
          showClose: true
        });
        return;
      }

      if (this.form.title.length > 10) {
        this.$message({
          message: "标题不能大于10个字符",
          type: "warning",
          showClose: true
        });
        return;
      }

      if (!this.form.editor.ref.d_render) {
        this.$message({
          message: "内容不能为空哦",
          type: "warning",
          showClose: true
        });
        return;
      }
      let loading = this.$loading({
        lock: true,
        text: "发布中，请稍后..."
      });
      loading.default_open();
      this.publishNetAsk()
        .then(res => {
          loading.close();
          that.$message({
            message: "发布成功啦",
            type: "success",
            showClose: true
          });
        })
        .catch(err => {
          loading.close();
          that.$message({
            message: error,
            type: "error",
            showClose: true
          });
        });
    }
  }
};
</script>

<style>
.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}

.me-title {
  margin-top: 10px;
  font-size: 12px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
</style>

<style lang="less" scoped>
@import "./themes/base.less";
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
  color: white;
  font-size: 1.6em;
  border: none;
  border-top-right-radius: @home-search-bar-border-radius;
  border-bottom-right-radius: @home-search-bar-border-radius;
}
</style>