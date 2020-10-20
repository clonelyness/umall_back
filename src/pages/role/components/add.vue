<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <!-- 树形控件 -->
          <!-- data是展示的数组 -->
          <!-- node-key是选中是拿到什么值 -->
          <!-- children是指树形控件有无 子菜单,label是指展示的是什么 -->
          <el-tree
            ref="tree"
            :data="menulist"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="isshow.isAdd"
          >立即添加</el-button
        >
        <el-button type="primary" @click="update" v-else>确认编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },

  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqListAction",
      reqRoleList: "role/reqListAction",
    }),

    //弹框消失
    cancel() {
      this.isshow.isshow = false;
    },

    // 弹窗在添加和编辑情况下关闭的情况是不同的,编辑情况下关闭不保留弹框数据,反之保留
    close() {
      if (!this.isshow.isAdd) {
        this.empty();
      }
    },

    // 数据清空
    empty() {
      this.form = {
       rolename: "",
        menus: "[]",
        status: 1,
      };

      //树形控件清空
      this.$refs.tree.setCheckedKeys([])
    },

    //修改了pid(若是顶级菜单,则默认选择目录,否则显示路径)
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

    // 添加
    add() {
      console.log(this.form);
      console.log(this.$refs.tree.getCheckedKeys());

      // this.$refs.tree.getCheckedKeys()是数组,menus需要字符串,所以JSON.stringify()将数组转化为字符串

      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取编辑某条数据时该数据完整的信息(1条)
    look(id) {
      //请求
      reqRoleDetail(id).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
          this.form = res.data.list;

        //   添加id
        this.form.id=id

          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
         
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击编辑中确认修改修改数据
    update() {
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {
    //如果菜单列表为请求过就请求下,否则就直接用
    if (this.menulist.length== 0) {
      this.reqMenuListAction();
    }
  },
};
</script>
<style scped>
</style>