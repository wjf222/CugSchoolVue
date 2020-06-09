<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a @click="view(essayId)" class="me-article-title" v-html="essayTitle">
      </a>
      <el-button v-if="false > 0" class="me-article-icon" type="text">置顶</el-button>
      <span class="me-pull-left me-article-count">
        <!-- <i class="me-icon-comment"></i>&nbsp;{{commentCounts}} -->
        <i class="me-icon-comment"></i>&nbsp;10
      </span>
      <span class="me-pull-left me-article-count">
        <!-- <i class="el-icon-view"></i>&nbsp;{{viewCounts}} -->
        <i class="el-icon-view"></i>&nbsp;10
      </span>
      <slot class="me-pull-right me-article-count" name="MoreAction">
      </slot>
    </div>

    <div class="me-artile-description">
      <a @click="view(essayId)" class="me-article-title" v-html="essayAbstract">
      </a>
    </div>
    <div class="me-article-footer">
      <span class="me-article-author">
        <i class="me-icon-author" v-html="essayAuthor"></i>
        &nbsp;
      </span>

      <el-tag v-for="t in tagList" :key="t.tagName" size="mini" type="success">{{t.tagName}}</el-tag>

      <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>
        &nbsp;{{essayPublishTime}}
      </span>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    essayId: Number,
    // weight: Number,
    essayTitle: String,
    // commentCounts: Number,
    // viewCounts: Number,
    essayAbstract: String,
    essayAuthor: String,
    tagList: Array,
    essayPublishTime: String
  },
  data() {
    return {};
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/center/view/${id}` });
    }
  },
  created(){
  }
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
