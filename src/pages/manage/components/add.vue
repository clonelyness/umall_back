<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="所属角色">
          <el-select
            v-model="form.roleid"
            placeholder="请选择角色"
          >
            <el-option label="请选择"  disabled value=""></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      form: {
       roleid:"",
       username:"",
       password:"",
       status:1
      },
     
    };
  },

  computed: {
    ...mapGetters({
      rolelist: "role/list",
    }),
  },

  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      reqManageList: "manage/reqListAction",
      reqTotalAction: "manage/reqTotalAction",
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
       roleid:"",
       username:"",
       password:"",
       status:1
      }
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
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqManageList();
          //重新获取总数
          this.reqTotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取编辑某条数据时该数据完整的信息(1条)
    look(uid) {
      //请求
      reqManageDetail(uid).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
          this.form = res.data.list;
          this.form.password="****"
        
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击编辑中确认修改修改数据
    update() {
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
            this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {
    //如果角色管理没有请求过数据,则请求
    if(this.rolelist.length==0){
      this.reqRoleListAction()
    }
  },
};

</script>
<style scped>
</style>