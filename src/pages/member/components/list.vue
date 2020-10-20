<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    
  >
    <el-table-column prop="id" label="用户编号" sortable width="180">
    </el-table-column>

    <el-table-column prop="nickname" label="昵称" sortable width="180">
    </el-table-column>
   
    <el-table-column prop="phone" label="手机号"> </el-table-column>

    <el-table-column label="状态" prop="status">
       <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <del-btn v-else type='info' >禁用</del-btn>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),

    //编辑
    edit(uid){
      this.$emit("edit",uid)
      console.log('哈哈哈'+uid);
      
    },

  

    
  },
  mounted() {
    this.reqListAction();
    
  },
};
</script>
<style scped>
</style>