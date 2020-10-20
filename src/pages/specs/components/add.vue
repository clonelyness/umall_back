<template>
  <div>
    <!--  框 -->
    <el-dialog
      :title="isshow.isAdd ? '添加规格' : '编辑规格'"
      :visible.sync="isshow.isshow"
      @close="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="box">
            <el-input v-model="item.value"></el-input>
            <div class="box1" v-if="index == 0">
              <el-button type="primary" @click="addAttr"
                >新增规格属性</el-button
              >
            </div>
            <div class="box1" v-else>
              <el-button type="danger" @click="del(index)"
                >删除规格属性</el-button
              >
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="规格属性">
          <div class="box">
            <el-input v-model="form.attrs"></el-input>
            <div class="box1">
              <el-button type="danger" @click="update">删除规格属性</el-button>
            </div>
          </div>
        </el-form-item> -->
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
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";

export default {
  props: ["isshow"],

  components: {},

  data() {
    return {
      //规格属性的数组
      attrArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },

  computed: {
    ...mapGetters({}),
  },

  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction: "specs/reqTotalAction",
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
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }, { value: "" }];
    },

    //验证修改和添加的数据是否合格
    textData() {

      //验证规格名称不能为空
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空");
        return false;
      }

      //验证规格属性不能为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("属性必须全部填写");
        return false;
      }
      //全部为真才能返回真,否则为假
      return true
    },

    //增加属性(增加数组)
    addAttr() {
      this.attrArr.push({ value: "" });
    },

    //删除属性(删除数组)
    del(index) {
      this.attrArr.splice(index, 1);
    },

    // 添加
    add() {
      // console.log(this. form);
      // console.log(this.attrArr);

      //验证修改和添加的数据是否合格
        if(!this.textData()){
          return
        }
      //form中添加attrs(attrArr中的value的值)
      // [{value:'s'},{value:'l'},{value:'xl'}]  ---map-->['s','l','xl']----JSON.stringify--->'['s','l','xl']'
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          // 列表事件刷新
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取编辑某条数据时该数据完整的信息(1条)
    look(id) {
      //请求
      reqSpecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          //把获取的数据赋值给form(此时form无id)
          this.form = res.data.list[0];

          //转换格式'['s','l','m']'---JSON.parse---->['s','l','m']---map-->[{value:'s'},{value:'l'},{value:'m'}]
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));

          //给form补id
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //点击编辑中确认修改修改数据
    update() {

      //验证修改和添加的数据是否合格
        if(!this.textData()){
          return
        }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSpecsUpdate(this.form).then((res) => {
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
.box {
  display: flex;
}
.box1 {
  flex: 1;
}
</style>