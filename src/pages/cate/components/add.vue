<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <!-- 原生上传文件  start-->
        <!-- <el-form-item label="图片" v-if="form.pid!=0">
          <div class="my-upload">
            <h3>+</h3>
            <img  v-if="imgUrl" :src="imgUrl" alt="">
            <input v-if="isshow.isshow" type="file" @change="getFile" />
          </div>
        </el-form-item> -->
        <!-- 原生上传文件  end-->

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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
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

    //弹框消失
    cancel() {
      this.isshow.isshow = false;
    },



    //原生上传图片
    getFile(e) {
      //file是文件的详细信息,但不是图片本身
      let file = e.target.files[0];

      // 验证图片大小(不超过2M)
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }

      // 验证是否为图片
      //后缀名(extname)
      //从file.name的后面的(.)开始裁剪,取出后缀名
      let imgArr = [".jpg", ".png", ".ipeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf("."));

      //方法1
      // imgArr.some(item=>{
      //     return item==extname;
      // })
      if (!imgArr.some((item) => item == extname)) {
        warningAlert("请上传图片");
        return;
      }
      //方法2
      // if(!imgArr.includes(extname)){
      //      warningAlert('请上传图片')
      //     return
      // }

      console.log(extname);

      //H5自身带有把上传的文件转化成地址
      this.imgUrl = URL.createObjectURL(file);

      this.form.img = file;
    },




    //element-ui上传图片
    getFile2(e) {
      let file = e.raw;
      console.log(e)
        this.imgUrl = URL.createObjectURL(file);

      this.form.img = file;

      
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
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },

    // 添加
    add() {
      //验证输入框 是否为空

      //   console.log(this. form);
      reqCateAdd(this.form).then((res) => {
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
      reqCateDetail(id).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击编辑中确认修改修改数据
    update() {
      reqCateUpdate(this.form).then((res) => {
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