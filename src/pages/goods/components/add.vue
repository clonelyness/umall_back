<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="isshow.isshow"
      @close="close"
      @opened='opened'
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择角色"
            @change="changeFirst"
          >
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择角色">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
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

        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择规格"
            @change="changeSpecs"
          >
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" placeholder="请选择属性" multiple>
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述">
        
          <!-- 富文本 -->
          <div v-if="isshow.isshow" id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类的list
      secondCateList: [],

      imgUrl: "",

      //商品属性list
      goodsAttrList: [],
    };
  },

  computed: {
    ...mapGetters({
      //商品分类页面
      cateList: "cate/list",

      //商品规格的列表
      specsList: "specs/list",
    }),
  },

  methods: {
    ...mapActions({
      // 请求商品分类list
      reqCateList: "cate/reqListAction",
      reqSpecsList: "specs/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      reqListAction: "goods/reqListAction",
    }),

    //弹窗打开完毕
    opened(){
       //富文本
      this.editor = new E("#editor");
      this.editor.create();
        //编辑器创建完成以后再赋值
      this.editor.txt.html(this.form.description);
    },

    //图片操作
    getFile2(e) {
      console.log(e);
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
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

    // 数据清空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //二级分类的list
      this.secondCateList = [];
      this.imgUrl = "";
      //商品属性list
      this.goodsAttrList = [];
    },

    //一级分类修改了获取二级分类列表
    changeFirst() {
      //一级分类改变时二级分类需要置空
      this.form.second_cateid = "";

      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        //得到第一个二级分类数组
        this.secondCateList = res.data.list;
      });
    },

    //商品规格发生了改变，计算商品属性的数组
    changeSpecs() {
      //商品规格变了,商品属性置空
      this.form.specsattr = [];
      this.getAttrsArr();
    },
    getAttrsArr() {
      // this.form.specsid 颜色 1
      // 在specsList中找到 找到某一条数据的id和当前this.form.specsid(商品规格的id)是一样的。
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      console.log(this.specsList);
      console.log(this.form.specsid);
      // 把这条数据的attrs赋 值给goodsAttrList;
      this.goodsAttrList = obj.attrs;
    },

    // 添加
    add() {
      // console.log(this.form);

         //将富文本编辑器的内容取出来给form.description
      this.form.description = this.editor.txt.html();
      //把form里的specsattr加上字符串
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          this.reqListAction();
          //重新获取总数
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取编辑某条数据时该数据完整的信息(1条)
    look(id) {
      
      //请求
      reqGoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
      
          this.form = res.data.list;

           //补id
           this.form.id = id;
          reqCateList({ pid: this.form.first_cateid }).then((res) => {
            //得到第一个二级分类数组
            this.secondCateList = res.data.list;
          });

          //图片
          this.imgUrl = this.$imgPre + this.form.img;

          //商品属性从字符串转为 []
          this.form.specsattr = JSON.parse(this.form.specsattr);
          
          //获取商品属性的数组
          this.getAttrsArr();


         
         
         

        } else {
          warningAlert(res.data.msg);
        }
        console.log(this.form)
      });
    },
    //点击编辑中确认修改修改数据
    update() {
      //富文本值
        // this.form.description = this.editor.txt.html();

      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsUpdate(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
      console.log(data)
    },
  },

  mounted() {
    //如果商品一级分类没有请求过数据,则请求
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
  

    //由于商品规格模块使用了分页，但是商品管理模块需要所有的商品规格，不要分页，所以多传递一个参数，用来判断是否需要分页
    this.reqSpecsList(true);
  },
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


