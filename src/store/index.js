//vuex管理文件(创建仓库)
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


import {state,getters,mutations} from './mutations'
import {actions}  from './actions'
import menu from './modules/menu'
import role from './modules/role'
import cate from './modules/cate'
import manage from './modules/manage'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu,
        role ,
        cate,
        manage,
        specs,
        goods,
        member,
        banner
        
    }
})