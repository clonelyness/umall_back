<template>
  <el-button @click="del" type='danger'>删除</el-button>
</template>
<script>

export default {
  
  methods: {
   del(){
       this.$confirm("此操作将永久删除该文件, 是否继续?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         this.$emit('confirm')
        })
        .catch(() => {
          console.log(456);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
   }
  },
  mounted() {},
};
</script>
<style scped>
</style>