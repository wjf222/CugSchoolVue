<template>
  <div class="me-view-body">
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
            <el-alert title="文章End..." type="success" center :closable="false"></el-alert>
          </div>

          <div class="me-view-tag">
            标签：
            <el-tag
              v-for="t in article.tags"
              :key="t.id"
              class="me-view-tag-item"
              size="mini"
              type="success"
            >{{t.tagname}}</el-tag>
            <el-button
              @click="tagOrCategory('tag', t.id)"
              size="mini"
              type="primary"
              v-for="t in article.tags"
              :key="t.id"
              round
              plain
            >{{t.tagname}}</el-button>
          </div>

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
            <div class="me-view-comment-write">
              <el-row :gutter="20">
                <el-col :span="2">
                  <a class>
                    <img class="me-view-picture" src="http://39.99.203.80:8080/images/1.jpg" />
                  </a>
                </el-col>
                <el-col :span="22">
                  <el-input
                    type="textarea"
                    :current=1
                    :autosize="{ minRows: 2}"
                    placeholder="你的评论..."
                    class="me-view-comment-text"
                    v-model="comment.content"
                    resize="none"
                  ></el-input>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="2" :offset="22">
                  <el-button type="text" @click="publishComment()">评论</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="me-view-comment-title">
              <span>{{article.commentCounts}} 条评论</span>
            </div>

            <commment-item
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="article.id"
              :index="index"
              :rootCommentCounts="article.commentCounts"
              @commentCountsIncrement="commentCountsIncrement"
              :key="c.commentId"
            ></commment-item>
            <Page
              :total="article.commentCounts"
              @on-change="handleCurrentChange"
              class="page-jump"
              :page-size="5"
              show-total
              show-elevator
            ></Page>
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
const axios = new HttpRequest("http://39.99.203.80:8080");
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
      commentNum: Number,
      comment: {
        article: {},
        content: ""
      },
      htmlMD: "",
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
    ...mapActions(["viewArticle", "getCommentsArticle", "publishMyComment"]),
    tagOrCategory(type, id) {
      this.$router.push({ path: `/${type}/${id}` });
    },
    handleCurrentChange(val) {
      this.getCommentsByArticle(val - 1);
    },
    editArticle() {
      this.$router.push({ path: `/write/${this.article.id}` });
    },
    getArticle() {
      this.viewArticle({ id: this.$route.params.id })
        .then(res => {
          const data = res.data;
          this.article.id = data.essayId;
          this.article.title = data.essayTitle;
          this.article.summary = data.essayAbstract;
          this.article.name = data.essayAuthor;
          this.article.createDate = data.essayPublishTime;
          this.article.commentCounts = data.commentNum;
          this.article.savePath = data.savePath;
          const path = this.article.savePath;
          axios
            .request({
              url: path
            })
            .then(res => {
              this.htmlMD = res.data;
            });
          this.getCommentsByArticle(0);
          // that.getCommentsByArticle();
        })
        .catch(error => {
          if (error !== "error") {
            this.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    },
    publishComment() {
      let that = this;
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = that.article.id;
      this.publishMyComment({
        id: that.article.id,
        content: that.comment.content
      })
        .then(res => {
          that.$message({
            type: "success",
            message: "评论成功",
            showClose: true
          });
          that.commentCountsIncrement();
          that.comment.content = "";
          // this.getArticle();
          location.reload();
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论失败",
              showClose: true
            });
          }
        });
    },
    getCommentsByArticle(pageIndex) {
      let that = this;
      this.getCommentsArticle({ essayId: that.article.id, pageIndex })
        .then(res => {
          that.comments = res.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
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
.page-jump {
  text-align: center;
}
.me-view-body {
  margin: 200px auto 280px;
}

.me-view-container {
  margin: 0;
  width: 1200px;
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