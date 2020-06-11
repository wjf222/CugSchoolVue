<template>
  <div>
    <answer-item v-for="(a,index) in Answers" :key="a.id" v-bind="a.answer" ref="AnswerItem">
      <el-dropdown slot="MoreAction" @command="handleCommand">
        <span class="el-dropdown-link">
          更多操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="index">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </answer-item>
    <Page
      :total="answerNum"
      @on-change="handleCurrentChange"
      class="page-jump"
      :page-size="5"
      show-total
      show-elevator
    ></Page>
  </div>
</template>

<script>
import AnswerItem from "@/components/answer/AnswerItem";
import { mapActions } from "vuex";
export default {
  name: "AnswerScrollPage",
  props: {
    offset: {
      type: Number,
      default: 100
    },
    page: {
      type: Object,
      default() {
        return {};
      }
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.Answers = [];
        this.innerPage.pageNumber = 0;
        this.getAnswers();
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.Answers = [];
        this.innerPage = this.page;
        this.getAnswers();
      },
      deep: true
    }
  },
  created() {
    this.getAnswers({ pageIndex: this.innerPage.pageNumber });
  },
  data() {
    return {
      loading: false,
      noData: false,
      innerPage: {
        pageSize: 5,
        pageNumber: 0,
        name: "a.createDate",
        sort: "desc"
      },
      Answers: [],
      answerNum: 0
    };
  },
  methods: {
    ...mapActions(["getAnswerBySomeone", "CountofSbAnswer"]),
    load() {},
    handleCommand(command) {
      this.$refs.AnswerItem[command].delete();
      this.$message({
        type: "success",
        message: "删除成功!",
        showClose: true
      });
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    handleCurrentChange(val) {
      this.getAnswers({ pageIndex: val - 1 });
    },
    getAnswers({ pageIndex }) {
      let that = this;
      that.loading = true;
      this.CountofSbAnswer().then(res => {
        this.answerNum = res.data;
      });
      this.getAnswerBySomeone({ pageIndex })
        .then(res => {
          let newAnswers = res.data;
          if (newAnswers && newAnswers.length > 0) {
            that.innerPage.pageNumber += 1;
            that.Answers = newAnswers;
          } else {
            that.noData = true;
          }
        })
        .catch(err => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          that.loading = false;
        });
    }
  },
  components: {
    AnswerItem
  }
};
</script>

<style scoped>
.page-jump {
  text-align: center;
}
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
}
</style>
