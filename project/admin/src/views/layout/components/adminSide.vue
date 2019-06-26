<template>
	<el-aside class="side-wrap">
		<!-- <a  href="https://github.com/PanJiaChen/vue-element-admin" _target="target" >456456456</a> -->
		<!-- 左侧边栏 -->
	    <el-menu
	    	class="el-menu-vertical"
	    	mode="vertical"
	    	background-color="#304156" 
	    	text-color="#BFCBD9" 
	    	active-text-color="#409EFF" 
	    	router
	    	:default-active="$route.path"
	    	:collapse="$store.state.side.isCollapse"
	    	>
	    	<template v-for="item in $store.state.permission.routes">
	    		<!-- 一级导航，没有子菜单 -->
	            <el-menu-item v-if="!item.hidden && !item.dropdown" :index="item.path + item.children[0].path">
	                <svg-icon :icon-class="item.icon" class="passIcon"/>
	                <span slot="title">{{item.name}}</span>
	            </el-menu-item>
				<!-- 二级以上导航，存在子菜单 -->
	            <el-submenu v-if="!item.hidden && item.dropdown" :index="item.path">
	                <template slot="title">
	                    <svg-icon :icon-class="item.icon" class="passIcon"/>
	                    <span>{{item.name}}</span>
	                </template>
	                <template v-for="child in item.children">
	                    <el-menu-item v-if="!child.hidden" :index="item.path + '/' +child.path">{{child.name}}</el-menu-item>
	                </template>
	            </el-submenu>
        	</template>
        	<template>
        		<div class="wailianUrl">
	        		<svg-icon icon-class="link" class="passIcon"/>
	        		<a href="https://github.com/wodefanxiansheng" target="_blank">外链Github</a>
        		</div>
        	</template>
	    </el-menu>

	</el-aside>
</template>
<script>
	export default{
		components: { },
		data(){
			return{
				
			}
		},
		computed:{
		},
		created(){
			
		},
		methods:{
			
		}
	}
</script>
<style scoped lang="less">
	.side-wrap{
		.el-menu-vertical:not(.el-menu--collapse){
			width:210px !important;
			height: 100%;
		}
		.el-menu-vertical{
			height: 100%;
			border:none;
		}
	    .passIcon{
	    	padding-right: 15px;
	    	font-size: 14px;
	    }
		.wailianUrl{
			color: rgb(191, 203, 217);
			font-size: 14px;
		    padding: 20px;
		    cursor: pointer;
		    position: relative;
		    box-sizing: border-box;
		    white-space: nowrap;
		    &:hover{
		    	color: #409EFF;
		    	background-color: rgb(38,52,69);
		    }
		    &:hover a{
		    	color: #409EFF;
		    }
			& a{
				color: rgb(191, 203, 217);
				text-decoration: none;
			}
			
		}
	}
	/deep/.is-active{
		background-color: #263445 !important;
	}
</style>
