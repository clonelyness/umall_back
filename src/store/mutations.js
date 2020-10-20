
//把登录信息存入状态层根目录
export const state = {
    //登陆成功用户信息
    //登录之后刷新时,状态层数据会清空,查看本地存储有无数据,有数据就把数据取出并转换成json数据,赋值给状态层
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}
export const mutations = {
    changeUserInfo(state, info) {
        //状态层存储
        state.userInfo = info;

        //本地存储(本地存储中对象形式的数据存入之后会变成字符串,取出来变成[object object]形式的字符串,数据消失,所以存储之前将数据转换成字符串)
        ///如果info是一个{} ，那么代表要退出，删；如果不是一个空{},代表是登录，存
        if (info.id) {
            sessionStorage.setItem("userInfo", JSON.stringify(info))
        } else {
            sessionStorage.removeItem("userInfo")
        }
    }
}

export const getters = {
    userInfo(state) {
        return state.userInfo;
    }
}