<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- elemet-ui上传  start -->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- elemet-ui上传  end -->

        <el-form-item label="图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
       dialogImageUrl: '',
        dialogVisible: false
      
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


    // 图片操作
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

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

     //图片操作
    getFile2(e) {
      console.log(e);
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
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
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  position: relative;
}
.my-upload h3 {
  line-height: 150px;
  text-align: center;
  font-size: 40px;
  font-weight: 400;
}
.my-upload input {
  width: 100%;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.my-upload img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>