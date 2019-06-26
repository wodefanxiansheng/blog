<template>
	<div>
		<el-dropdown>
		  <span class="el-dropdown-link">
		  	   <svg-icon icon-class="greeting" class="normal"/>
		       <i class="el-icon-arrow-down el-icon--right"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown" class="dropdown">
		  		<el-dropdown-item><a href="https://github.com/wodefanxiansheng" target="_blank" class="client">客户端</a></el-dropdown-item>
			    <el-dropdown-item>{{userName}}</el-dropdown-item>
			    <el-dropdown-item  divided @click.native = "logout">退出登录</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'; //先要引入
export default {
  name: '',
  data(){
  	return {
  		redirect:null,
  	}
  },
  methods:{
  	 logout(){
  	 	this.$store.dispatch('Logout').then(()=>{
  	 		this.$router.push('/login?redirect='+this.redirect)
  	 	});
  	 }
  },
  computed:{
  	...mapGetters(['userName']),
  	
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route.path)
        this.redirect = route.path
      },
      immediate: true
    }
  },
}
</script>
<style lang="less" scoped>
	.normal{
		font-size: 40px;
	}
	.el-icon--right{
		font-size: 20px;
		font-weight: bold;
	}
	.client{
		color: #181818;
		text-decoration: none;
	}
</style>