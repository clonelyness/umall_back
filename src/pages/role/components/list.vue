<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="角色编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="rolename" label="角色名称" sortable width="180">
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

        <del-btn @confirm="dele(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "role/reqListAction",
    }),

    //编辑
    edit(id) {
      this.$emit("edit", id);
    },

    //全局组件删除按钮
    dele(id) {
      reqRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scped>
</style>