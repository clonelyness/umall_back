//vuex处理逻辑
export const actions={
    //组件触发修改userinfo
    changeUserInfoAction(context,info){
        context.commit('changeUserInfo', info)
    }
}