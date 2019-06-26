const getters = {
	userName: state => state.user.name,
    userList: state => state.user.userList,//用户列表集合
    userTotal: state => state.user.userTotal,//用户总数
    token:state => state.user.token,
    roles:state => state.user.roles,
    articleTypes: state => state.article.articleTypes,
    // side
    isCollapse_g:state => state.side.isCollapse,//切换左侧导航栏
	tagViews_g:state => state.side.tagViews,//面包屑导航array
	is_add_router_g:state => state.side.is_add_router,
}


export default getters

























