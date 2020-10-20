
//接口

import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from '../store'
import{warningAlert}from './alert'
import router from '../router/index'

//开发环境下
// Vue.prototype.$imgPre = 'http://localhost:3000'
// let baseUrl = '/api'

//打包上线
Vue.prototype.$imgPre=''
let baseUrl = ''

//响应拦截
axios.interceptors.response.use(res => {
    console.group('=====本次请求路径是:' + res.config.url)
    console.log(res);
    console.groupEnd()

    //检验下方掉线跳转到登录页的代码
    // if(res.config.url==baseUrl+'/api/menulist'){
    //     res.data.msg='登录已过期或访问权限受限'
    // }

    if(res.data.msg=='登录已过期或访问权限受限'){
        warningAlert(res.data.msg)
        router.push('/login')


    }
    return res;
})

//请求拦截 (在后台app.js吧登录拦截打开)
axios.interceptors.request.use(req => {
    // console.log('---请求拦截')
    // console.log(req)
    if (req.url !== baseUrl + '/api/userLogin') {
        req.headers.authorization = store.state.userInfo.token;
    }




    return req
})



// *****************菜单管理***************

// 参数params始终是一个json,要么在request搞好格式,或者调用时传递过来json格式{}
//  添加
export const reqMenuAdd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//列表
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}

//删除

export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


//编辑时查询当前要编辑的完整信息(1条)
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//  修改
export const reqMenuUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}



// *****************角色管理***************
//  添加
export const reqRoleAdd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}


//列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}

//删除

export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


//编辑时查询当前要编辑的完整信息(1条)
export const reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//  修改
export const reqRoleUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}




// *****************管理员管理***************
//  添加
export const reqManageAdd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
    })
}


//列表
export const reqManageList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}

//删除

export const reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}


//编辑时查询当前要编辑的完整信息(1条)
export const reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

//  修改
export const reqManageUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}



//登录
export const reqLogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}




// *****************商品分类管理***************
//  添加
export const reqCateAdd = (params) => {
    let data = new FormData()
    //  data.append('pid',1)
    //  data.append('catename','123')
    //  data.append('img',File)
    //  data.append('status',1)
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}


//列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params,
    })
}

//删除

export const reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


//编辑时查询当前要编辑的完整信息(1条)
export const reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//  修改
export const reqCateUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data,
    })
}



/*********商品规格管理***************/
//添加
export const reqSpecsAdd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

//管理员总数
export const reqSpecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
    })
}

//列表 params={page:1,size:10}
export const reqSpecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}
//删除
export const reqSpecsDel = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

//1条
export const reqSpecsDetail = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//修改
export const reqSpecsUpdate = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}




// *****************商品管理***************
//  添加
export const reqGoodsAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}

//管理员总数
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
    })
}


//列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//删除

export const reqGoodsDel = (params) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


//编辑时查询当前要编辑的完整信息(1条)  params格式{id:'1'}
export const reqGoodsDetail = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: params
    })
}


//  修改  params={id='1'}
export const reqGoodsUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}





// *****************会员管理***************

//列表
export const reqMemberList = (params) => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
        params: params
    })
}


//编辑时查询当前要编辑的完整信息(1条)  params格式{id:'1'}
export const reqMemberDetail = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: params
    })
}

//  修改  params={id='1'}
export const reqMemberUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: data
    })
}





// *****************轮播图管理***************
//  添加
export const reqBannerAdd = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}




//列表
export const reqBannerList = (params) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: params
    })
}

//删除
export const reqBannerDel = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}


//编辑时查询当前要编辑的完整信息(1条)  params格式{id:'1'}
export const reqBannerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: params
    })
}


//  修改  params={id='1'}
export const reqBannerUpdate = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}