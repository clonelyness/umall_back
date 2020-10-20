<template>
  <div>
    <el-container class="index">
      <!-- /左侧导航 -->
      <el-aside class="left" width="250px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <!-- 首页 -->
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 系统设置 -->
            <el-submenu v-if="item.children" index="item.id+'">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>

              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item v-else :index="item.url">{{
              item.title
            }}</el-menu-item>
          </div>

          <!-- 商城管理 -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <div class="con">
            <h3>{{userInfo.username}}</h3>
            <el-button type='danger' @click="logOut">退出登录</el-button>
          </div>
        </el-header>


        <el-main class="main">
          <!-- 面包屑 -->
          <el-breadcrumb
            v-if="$route.name"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view class="top"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {successAlert} from '../../utils/alert'
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:'changeUserInfoAction'
    }),
  logOut(){
    this.changeUserInfoAction({})
    this.$router.push('/login')
    successAlert('退出成功')


  }
  },
  mounted() {},
};
</script>
<style scped>
.index {
  height: 100vh;
}
.header {
  background-color: #b3c0d1;
}
.left {
  background-color: #20222a;
}
.top {
  padding-top: 15px;
}
.header .con{
  float: right;
}
.header h3{
  float: left;
  line-height: 60px;
}
.header .el-button{
  float: left;
  margin: 10px 15px;


}

</style>