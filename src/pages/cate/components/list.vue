<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="分类编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" sortable width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <!-- <img :src="$imgPre+scope.row.img" alt=""> -->
        <img :src="$imgPre+scope.row.img"  v-if="scope.row.img!=='null'" alt="">
      </template>
    </el-table-column>

    <el-table-column label="状态">
       <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>

        <del-btn v-else type='info' >禁用</del-btn>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
 
        <del-btn @confirm='dele(scope.row.id)'></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
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
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),

    //编辑
    edit(id){
      this.$emit("edit",id)
      
    },


    //删除2
    dele(id){
      reqCateDel(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqListAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
    }
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scped>
img{
    width: 100px;
    height: 100px;
}
</style>