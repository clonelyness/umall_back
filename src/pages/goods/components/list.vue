<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="150">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="150">
      </el-table-column>
      <el-table-column  label="商品价格" sortable width="150">
        <template slot-scope="scope">
         <span>{{scope.row.price | filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="市场价格" sortable width="150">
        <template slot-scope="scope">
         <span>{{scope.row.market_price | filterPrice}}</span>
        </template>
      </el-table-column>
     
      <el-table-column  label="图片" sortable width="150">
         <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column  label="是否新品" sortable width="150">
         <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column  label="是否热卖" sortable width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary">是</el-button>
          <el-button v-else type="danger">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <del-btn v-else type="info">禁用</del-btn>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>

      <!-- 分页组件 -->
      <!-- 
    total：设置总数 
    page-size：每页数量 
    有多少页，不用自己计算 
    current-change：当前页码发生了改变，就会触发，参数就是当前的页码
    -->
    </el-table>
    <el-pagination background layout="prev, pager, next"
    :total="total"
    :page-size="size"
    @current-change='changePage'
    >
       </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size:'goods/size',
      total:'goods/total',
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      changePageAction: "goods/changePageAction",
    }),

    //编辑
    edit(id) {
      this.$emit("edit", id);
    },

    //修改当前页码
    changePage(e){ 
       this.changePageAction(e)
    },

    //删除2
    dele(id) {
      reqGoodsDel({id:id}).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新页面
          this.reqListAction();
          //重新获取总数
          this.reqTotalAction() 

        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 获取页面
    this.reqListAction();
    //获取总数
    this.reqTotalAction()
  },
};
</script>
<style scped>
img {
  width: 130px;
  height: 130px;
}
</style>