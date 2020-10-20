<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
import { indexRouters } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      indexRouters,
    };
  },

  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },

  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),

    //弹框消失
    cancel() {
      this.isshow.isshow = false;
    },


    // 弹窗在添加和编辑情况下关闭的情况是不同的,编辑情况下关闭不保留弹框数据,反之保留
    close(){
      if(!this.isshow.isAdd){
        this.empty()
      }

    },

    // 数据清空
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
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
      // console.log(this. form);
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取编辑某条数据时该数据完整的信息(1条)
    look(id) {
      //请求
      reqMenuDetail(id).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
          this.form = res.data.list;

          //给form补id
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击编辑中确认修改修改数据
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {},
};
</script>
<style scped>
</style>