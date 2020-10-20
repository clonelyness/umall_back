import { reqSpecsCount, reqSpecsList } from "../../utils/request"
const state = {
    // 菜单的list 
    list: [],

    //分页每页的数量
    size: 2,

    // 分页每页的总数
    total: 0,

    //页码(点击后切换不同页码)
    page: 1,

}
const mutations = {
    // 修改list
    changeList(state, arr) {
        state.list = arr;
    },

    // 修改分页数据的总数
    changeTotal(state, num) {
        state.total = num;
    },

    //修改页码
    changePage(state, page) {
        state.page = page;
    }
}
const actions = {
    //页面请求
    reqListAction(context, bool) {

        //由于商品规格模块使用了分页，但是商品管理模块需要所有的商品规格，不要分页，所以多传递一个参数，用来判断是否需要分页
        //add页面的第二个二级联动菜单需要的是所有的specs列表(请求时不带参数),add调用时传个值,在此做个判断,(所以在此let变量params)
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        
        //发请求获取列表数据
        reqSpecsList(params).
            then(res => {
                //如果请求list时取到null,那么有可能是最后一页没有数据,需要页码减一页再次请求数据
                let list = res.data.list ? res.data.list : []

                //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
                if (context.state.page > 1 && list.length == 0) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("reqListAction")
                    return;
                }

                //数据转换格式
                //'['s','l','xl']'----JSON.parse--->['s','l','xl']
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                })
                context.commit('changeList', list)
            })
    },

    // 获取总数据的请求
    reqTotalAction(context) {
        reqSpecsCount().then(res => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },

    // 修改了页码
    changePageAction(context, page) {
        context.commit('changePage', page)
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

