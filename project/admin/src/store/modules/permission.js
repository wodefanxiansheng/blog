  import { constantRouterMap, asyncRouterMap } from 'src/router'
   function sortNumber(a,b){  
       return a.sortNumber - b.sortNumber 
  }
  const hasPermission = (roles, route) => {
      if (route.meta && route.meta.role) {
          return roles.some(role => route.meta.role.indexOf(role) >= 0)
      } else {
          return true
      }
  }

  const filterAsyncRouter = (asyncRouterMap, roles) => {
      const accessedRouters = asyncRouterMap.filter(route => {
          if (hasPermission(roles, route)) {
              if (route.children && route.children.length) {
                  route.children = filterAsyncRouter(route.children, roles)
              }
              return true
          }
          return false
      })
      return accessedRouters
  }

  const permission = {
      state: {
          routes: constantRouterMap.concat(asyncRouterMap),
          addRouters: []
      },
      mutations: {
          SETROUTES(state, routers) {
              state.addRouters = routers;
              state.routes = constantRouterMap.concat(routers);
              state.routes.sort(sortNumber);
              // console.log(state.routes)
          }
      },
      actions: {
          //通过调用 setRoutes方法 动态生成路由
          setRoutes({ commit }, info) {
              return new Promise( (resolve, reject) => {
                  let {roles} = info;//对象解构赋值
                  let accessedRouters = [];
                  if (roles.indexOf('admin') >= 0) {
                      accessedRouters = asyncRouterMap;
                  }else{
                      accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                  }
                  commit('SETROUTES', accessedRouters)
                  resolve()
              })
          }

      }
  }
  export default permission