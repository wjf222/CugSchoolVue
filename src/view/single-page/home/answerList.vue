<template>
  <div>
    <el-container>
      <el-main class="me-articles">
        <answer-scroll-page></answer-scroll-page>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AnswerScrollPage from "./common/AnswerScrollPage.vue";

export default {
  name: "AnswerList",
  created() {
  },
  data() {
    return {
    };
  },
  methods: {
  },
  components: {
    AnswerScrollPage,
  }
};
</script>

<style scoped>
.el-container {
  width: 960px;
}

.el-aside {
  margin-left: 20px;
  width: 260px;
}

.el-main {
  padding: 0px;
  line-height: 16px;
}

.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 20px;
}
</style>
