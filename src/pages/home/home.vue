<template>
  <div>
    <h1>首页</h1>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

   //绘制柱形图
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["种类数量"],
            },
            xAxis: {
              data:this.list.map(item=>item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                data:this.list.map(item=>item.children.length),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
    }),
  },
  mounted() {
    this.reqList();

   
  },
};
</script>
<style scped>
.box {
  width: 80%;
  height: 500px;
  margin: 20px auto;
  border: 1px solid black;
}
</style>