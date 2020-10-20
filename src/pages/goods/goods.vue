<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <v-list @edit='edit'></v-list>
    <!-- 添加东西 -->
    <v-add :isshow='info' ref="add"></v-add>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vAdd from "./components/add";

export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //弹框状态
      info:{
        isshow:false,
        isAdd:true 
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),

    //点击添加按钮
  willAdd(){
    this.info.isshow=true;

    //添加还是编辑的状态,true代表是点击添加使add弹框出现
    this.info.isAdd=true
  },

  //点击编辑按钮
  edit(uid){
    this.info.isshow=true;

    //添加还是编辑的状态
     this.info.isAdd=false;

     //让add页面发起获取编辑某条数据时该数据的信息(用ref)
     this.$refs.add.look(uid)

  }
  },
  mounted() {},
};
</script>
<style scped>
</style>