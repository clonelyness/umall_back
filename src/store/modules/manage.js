import { reqManageCount, reqManageList } from "../../utils/request"
const state = {
    // 菜单的list 
    list: [],

    //分页每页的数量
    size: 2,

    // 分页每页的总数
    total:0, 

    //页码(点击后切换不同页码)
    page:1,

}
const mutations = {
    // 修改list
    changeList(state, arr) {
        state.list = arr;
    },

    // 修改分页数据的总数
    changeTotal(state,num){
        state.total=num;
    },

    //修改页码
    changePage(state,page){
        state.page=page;
    }
}
const actions = {
    //页面请求
    reqListAction(context) {
        //发请求
        reqManageList({ page:context.state.page, size: context.state.size }).
        then(res => {
            //如果请求list时取到null,那么有可能是最后一页没有数据,需要页码减一页再次请求数据
            let list = res.data.list ? res.data.list : []

            //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
            if(context.state.page>1&&list.length==0){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqListAction")
                return;
            }
            context.commit('changeList', list)
        })
    },

    // 获取总数据的请求
    reqTotalAction(context){
        reqManageCount().then(res=>{
            context.commit('changeTotal', res.data.list[0].total)
        })
    },

    // 修改了页码
    changePageAction(context,page){  
            context.commit('changePage',page)
            context.dispatch('reqListAction')
    },

}
const getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    total(state) {
        return state.total
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}

