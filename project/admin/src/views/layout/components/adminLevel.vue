<template>
	<!-- 面包屑导航 -->
	<div class="admin-level breadcrumb">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{path: item.path}" v-for="item in levelArr">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				levelArr:[]
			}
		},
		mounted(){
			this.getBreadcrumb();
		},
		methods:{
			getBreadcrumb() {
                let matched = this.$route.matched;
                let first = matched[0],
                    second = matched[1];
                // 首页
                if (first && first.name !== '首页' && first.name !== '') {
                    if(first && first.name === 'github'){
                    	matched = [{name: '首页', path: '/'}].concat(second);
                    }else{
                    	matched = [{name: '首页', path: '/'}].concat(matched);
                    }
                }
                // 判断是不是首页
                if (second && second.name === '首页') {
                    this.levelArr = [second];
                }else{
                	this.levelArr = matched;
                	                    
                }

                
            }
		},
		watch:{
			$route(){
				this.getBreadcrumb();
			}
		}
	}
</script>
<style scoped lang="less">
	.breadcrumb{
		line-height: 20px;
		margin-left: 20px;
		color: #97a8be;
		font-size: 14px;
		.el-breadcrumb {
		    line-height: 20px;
		}
	}
</style>