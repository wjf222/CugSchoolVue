<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a  class="me-article-title"></a>
      <el-button v-if="false > 0" class="me-article-icon" type="text">置顶</el-button>
      <span class="me-pull-right me-article-count">
        <i class="me-icon-comment"></i>
        &nbsp;{{commentNum}}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="el-icon-view"></i>
        &nbsp;{{commentNum}}
      </span>
    </div>

    <div class="me-artile-description">
      <a  class="me-article-title" v-html="answerContent"></a>
    </div>
    <div class="me-article-footer">
      <span class="me-article-author">
        <i class="me-icon-author"></i>
        &nbsp;{{answerer}}
      </span>

      <!-- <el-tag v-for="t in tags" :key="t.tagname" size="mini" type="success">{{t.tagname}}</el-tag> -->

      <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>
        &nbsp;{{answerTime}}
      </span>
    </div>
  </el-card>
</template>

<script>
import HttpRequest from "@/libs/axios";
const axios = new HttpRequest("http://39.99.203.80:8080");
export default {
  name: "AnswerItem",
  props: {
    answerId: Number,
    // weight: Number,
    commentNum: Number,
    questionId: Number,
    // viewCounts: Number,
    essayAbstract: String,
    answerer: String,
    // tags: Array,
    answerTime: String,
    savePath: String
  },
  data() {
    return {
      answerContent: String
    };
  },
  created() {
    console.log(this.savePath);
    axios
      .request({
        url: this.savePath
      })
      .then(res => {
        console.log(res.data);
        this.answerContent = res.data;
      });
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    }
  },
};
</script>

<style scoped>
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
</style>
