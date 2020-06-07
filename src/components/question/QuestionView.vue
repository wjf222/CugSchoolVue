<template>
  <div>
    <el-container class="me-view-container">
      <el-main>
        <div class="me-view-card">
          <h1 class="me-view-title">{{article.title}}</h1>
          <div class="me-view-author">
            <a class>
              <img class="me-view-picture" src="http://39.99.203.80:8080/images/1.jpg" />
            </a>
            <div class="me-view-info">
              <span>{{article.name}}</span>
              <div class="me-view-meta">
                <span>{{article.createDate}}</span>
                <span>阅读 {{article.viewCounts}}</span>
                <span>评论 {{article.commentCounts}}</span>
              </div>
            </div>
            <!-- v-if="this.article.author.id == this.$store.state.id" -->
            <!-- <el-button
              @click="editArticle()"
              style="position: absolute;left: 60%;"
              size="mini"
              round
              icon="el-icon-edit"
            >编辑</el-button>-->
          </div>
          <div class="me-view-content">
            <!-- <markdown-editor :editor="article.editor"></markdown-editor> -->
            <vue-markdown :source="htmlMD"></vue-markdown>
          </div>

          <div class="me-view-end">
            <!-- <el-alert title="文章End..." type="success" center :closable="false"></el-alert> -->
            <el-row>
              <el-button type="primary">关注问题</el-button>
              <el-button
                type="primary"
                icon="el-icon-edit"
                plain
                v-on:click="answerShow=!answerShow"
              >写回答</el-button>
              <el-button type="info" icon="el-icon-user" plain>邀请回答</el-button>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-card :body-style="{ padding: '10px'}" class="card-body" v-if="answerShow">
                <el-row>
                  <div>
                    <img
                      src="http://39.99.203.80:8080/images/zhihu.jpg "
                      class="image"
                      height="40"
                      width="40"
                    />
                  </div>
                  <div>
                    <span style="padding-top:4px;14px Base">王纪锋</span>
                  </div>
                </el-row>
                <el-divider></el-divider>
                <div style="margin-top: 20px;">
                  <markdown-editor :editor="form.editor"></markdown-editor>
                  <el-button
                    type="primary"
                    style="margin-top: 10px;margin-bottom: 10px;float:right"
                  >提交回答</el-button>
                </div>
              </el-card>
            </el-row>
          </div>
          <!-- <div class="me-view-tag">
            标签：
            <el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagname}}</el-tag>
            <el-button
              @click="tagOrCategory('tag', t.id)"
              size="mini"
              type="primary"
              v-for="t in article.tags"
              :key="t.id"
              round
              plain
            >{{t.tagname}}</el-button>
          </div>-->

          <!-- <div class="me-view-tag">
            文章分类：
          <span style="font-weight: 600">{{article.category.categoryname}}</span>-->
          <!-- <el-button
              @click="tagOrCategory('category', article.category.id)"
              size="mini"
              type="primary"
              round
              plain
            >{{article.category.categoryname}}</el-button>
          </div>-->

          <div class="me-view-comment">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{article.commentCounts}} 条评论</span>
                <el-button style="float: right; padding: 3px 0" type="text">按时间顺序</el-button>
              </div>
              <el-divider></el-divider>
              <div v-for="answer in answers" :key="answer.answerId">
                  <img
                    src="http://39.99.203.80:8080/images/zhihu.jpg "
                    class="image"
                    height="40"
                    width="40"
                  />
                <span style="padding-top:4px;14px Base">{{answer.answerer}}</span>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MarkdownEditor from "../markdown/markdown";
import CommmentItem from "@/components/comment/CommentItem.vue";
import { mapActions } from "vuex";
import VueMarkdown from "vue-markdown";
import HttpRequest from "@/libs/axios";
const axios = new HttpRequest("http://39.99.203.80:8080/");
export default {
  name: "ArticleView",
  created() {
    this.getArticle();
  },
  watch: {
    $route: "getArticle"
  },
  props: {},
  data() {
    return {
      comments: [],
      comment: {
        article: {},
        content: ""
      },
      answerShow: false,
      htmlMD: "",
      answers: [],
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
            subfield: true, // 单双栏模式
            preview: true // 预览
          }
        }
      },
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: {},
        category: {},
        createDate: "",
        savePath: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview"
        }
      }
    };
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatarImgPath;
      if (avatar.length > 0) {
        return avatar;
      }
      return "http://39.99.203.80:8080/images/1.jpg";
    },
    title() {
      return `${this.article.title} - 文章 - For Fun`;
    }
  },
  methods: {
    ...mapActions([
      "getAnswerByArticleId",
      "publishMyComment",
      "getNetAskById"
    ]),
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    },
    editArticle() {
      this.$router.push({ path: `/write/${this.article.id}` });
    },
    getArticle() {
      console.log(this.$route.params.id);
      this.getNetAskById({ id: this.$route.params.id })
        .then(res => {
          const data = res.data;
          this.article.id = data.essayId;
          this.article.title = data.essayTitle;
          this.article.summary = data.essayAbstract;
          this.article.name = data.essayAuthor;
          this.article.createDate = data.essayPublishTime;
          this.article.commentCounts = data.commentNum;
          this.article.savePath = data.savePath;
          const path = "images/" + this.article.savePath;
          axios
            .request({
              url: path
            })
            .then(res => {
              this.htmlMD = res.data;
            });
          // this.getCommentsByArticle();
        })
        .catch(error => {
          if (error !== "error") {
            console.log(error);
            this.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
      this.getAnswerByArticle();
    },
    publishComment() {
      if (!this.comment.content) {
        return;
      }
      this.comment.article.id = this.article.id;
      console.log(this.comment);
      this.publishMyComment({
        id: this.article.id,
        content: this.comment.content
      })
        .then(data => {
          this.$message({
            type: "success",
            message: "评论成功",
            showClose: true
          });
          this.comments.unshift(data.data);
          this.commentCountsIncrement();
          this.comment.content = "";
          this.getArticle();
        })
        .catch(error => {
          if (error !== "error") {
            this.$message({
              type: "error",
              message: "评论失败",
              showClose: true
            });
          }
        });
    },
    getAnswerByArticle() {
      this.getAnswerByArticleId({ id: this.$route.params.id })
        .then(res => {
          console.log(res);
          this.answers = res.data;
        })
        .catch(error => {
          if (error !== "error") {
            this.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true
            });
          }
        });
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    }
  },
  components: {
    "markdown-editor": MarkdownEditor,
    CommmentItem,
    VueMarkdown
    // CommmentItem
  },
  //组件内的守卫 调整body的背景色
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = "#fff";
    next();
  },
  beforeRouteLeave(to, from, next) {
    window.document.body.style.backgroundColor = "#f5f5f5";
    next();
  }
};
</script>

<style>
.me-view-body {
  margin: 20px 20px;
}

.me-view-container {
  width: 1000px;
}

.el-main {
  overflow: hidden;
}

.me-view-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
}

.me-view-author {
  /*margin: 30px 0;*/
  margin-top: 30px;
  vertical-align: middle;
}

.me-view-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}

.me-view-info {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}

.me-view-meta {
  font-size: 12px;
  color: #969696;
}

.me-view-end {
  margin-top: 20px;
}

.me-view-tag {
  margin-top: 20px;
  padding-left: 6px;
  border-left: 4px solid #c5cac3;
}

.me-view-tag-item {
  margin: 0 4px;
}

.me-view-comment {
  margin-top: 60px;
}

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  margin-top: 20px;
}

.me-view-comment-text {
  font-size: 16px;
}

.v-show-content {
  padding: 8px 25px 15px 0px !important;
  /* text-align: center; */
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}
</style>