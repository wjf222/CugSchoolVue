<template>
  <!-- <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load"> -->
  <div>
    <article-item v-for="(a,index) in articles" :key="a.essayId" v-bind="a" ref="ArticleItem">
      <el-dropdown slot="MoreAction" @command="handleCommand">
        <span class="el-dropdown-link">
          更多操作
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="index">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </article-item>
    <Page
      :total="articleNum"
      @on-change="handleCurrentChange"
      class="page-jump"
      :page-size="5"
      show-total
      show-elevator
    ></Page>
  </div>
  <!-- </scroll-page> -->
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
// import ScrollPage from "./ScrollPage.vue";
import { mapActions } from "vuex";
export default {
  name: "ArticleScrollPage",
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
        this.articles = [];
        this.innerPage.pageNumber = 0;
        this.getArticles();
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage = this.page;
        this.getArticles();
      },
      deep: true
    }
  },
  created() {
    this.getArticles();
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
      articles: [],
      articleNum: Number
    };
  },
  created() {
    this.getArticles({ pageIndex: this.innerPage.pageNumber });
  },
  methods: {
    ...mapActions(["getEssaies", "essaynumOfAuthor"]),
    load() {},

    handleCommand(command) {
      this.$refs.ArticleItem[command].delete();
      this.$message({
        type: "success",
        message: "删除成功!",
        showClose: true
      });
      this.getArticles({ pageIndex: this.innerPage.pageNumber });
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.innerPage.pageNumber = val - 1;
      this.getArticles({ pageIndex: val - 1 });
    },
    getArticles({ pageIndex }) {
      this.loading = true;
      this.essaynumOfAuthor().then(res => {
        this.articleNum = res.data;
      });
      this.getEssaies({ page: pageIndex })
        .then(res => {
          let newArticles = res.data;
          if (newArticles && newArticles.length > 0) {
            this.articles = newArticles;
          } else {
            this.noData = true;
          }
        })
        .catch(err => {
          if (error !== "error") {
            this.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  components: {
    "article-item": ArticleItem
    // "scroll-page": ScrollPage
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
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
