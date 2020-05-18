<template>
  <Row :gutter="20" style="margin-top: 10px;">
    <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
      <Card shadow v-if="pieShow">
        <chart-pie style="height: 300px;" :value="pieData" text="车祸比例"></chart-pie>
      </Card>
    </i-col>
    <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
      <Card shadow v-if="barShow">
        <chart-bar style="height: 300px;" :value="barData" text="各州车祸量统计" />
      </Card>
    </i-col>
    <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
      <Card shadow>
        <USA style="height: 500px;"/>
      </Card>
    </i-col>
  </Row>
</template>
<script>
import HttpRequest from "@/libs/axios";
import { ChartPie, ChartBar, USA } from "@/components/charts";
export default {
  name: "gis",
  data() {
    return {
      start_Lng: [],
      start_Lat: [],
      state: [],
      pieData: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ],
      barData: Object,
      tempKeys: [],
      tempValues: [],
      barShow: false,
      pieShow: false
    };
  },
  components: {
    ChartPie,
    ChartBar,
    USA
  },
  beforeCreate() {},
  mounted() {
    this.$nextTick(() => {
      const httpRequest = new HttpRequest(
        "http://39.101.192.126:8080/tabledata"
      );
      httpRequest
        .request({})
        .then(res => {
          let jsondata = res.data.data.items;
          this.start_Lng = jsondata.map(a => a.start_Lng);
          this.start_Lat = jsondata.map(a => a.start_Lng);
          this.state = jsondata.map(a => a.state);
          const temp = this.state.reduce(function(prev, next) {
            prev[next] = prev[next] + 1 || 1;
            return prev;
          }, {});
          this.barData = temp;
          this.barShow = true;
          this.pieData = Object.keys(temp).map(item => ({
            value: temp[item],
            name: item
          }));
          this.pieShow = true;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>
<style lang="scss" scoped>
</style>