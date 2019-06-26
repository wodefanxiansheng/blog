<template>
	<div class="home-wrap">
		<el-row :gutter="40">
		  <el-col :xs="24" :sm="12" :lg="6">
		  	<div class="bg-purple">
			  	<div class="grid-content bg-purple-1">
			  		<svg-icon icon-class="peoples" class="passIcon"/>
			  	</div>
			  	<div class="grid-right">
			  		<countTo :startVal='0' :endVal='15264556' :duration='1000' class="bg-purple-number"></countTo>
			  		<p class="bg-purple-title">总访问量</p>
			  	</div>
		  	</div>
		  </el-col>
		  <el-col :xs="24" :sm="12" :lg="6">
		  	<div class="bg-purple">
			  	<div class="grid-content bg-purple-2">
			  		<svg-icon icon-class="users" class="passIcon"/>
			  	</div>
			  	<div class="grid-right">
			  		<countTo :startVal='0' :endVal='24532' :duration='1000' class="bg-purple-number"></countTo>
			  		<p class="bg-purple-title">用户数</p>
			  	</div>
		  	</div>
		  </el-col>
		  <el-col :xs="24" :sm="12" :lg="6">
		  	<div class="bg-purple">
			  	<div class="grid-content bg-purple-3">
			  		<svg-icon icon-class="articles" class="passIcon"/>
			  	</div>
			  	<div class="grid-right">
			  		<countTo :startVal='0' :endVal='251' :duration='1000' class="bg-purple-number"></countTo>
			  		<p class="bg-purple-title">博客数量</p>
			  	</div>
		  	</div>
		  </el-col>
		  <el-col :xs="24" :sm="12" :lg="6">
		  	<div class="bg-purple">
			  	<div class="grid-content bg-purple-4">
			  		<svg-icon icon-class="message" class="passIcon"/>
			  	</div>
			  	<div class="grid-right">
			  		<countTo :startVal='0' :endVal='235' :duration='1000' class="bg-purple-number"></countTo>
			  		<p class="bg-purple-title">评论数</p>
			  	</div>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import countTo from 'vue-count-to';
	export default {
		components: { countTo },
		data(){
			return {
				num:'10041025'
			}
		},
		filter:{
		   
		},
		mounted(){
			
		},
		methods: {
	      	
	    },
	    computed:{
	    	
	    }
	}
</script>
<style lang="less" scoped="">
    @property:color;//背景色，颜色
    @padding:padding;//padding
    @radius:border-radius;//圆角
    @radius4:4px;//数值4px
	.home-wrap{
		margin:30px;
		// background-@{property}: #f0f2f5;
		.bg-purple{
			background-@{property}:#f0f2f5;
			display:flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;
			@{radius}:@radius4;
			@{padding}:10px 60px 10px 10px;
			.grid-right{
				line-height: 28px;
				& .bg-purple-number{
					font-size: 24px;
					font-weight: bold;
				}
				& .bg-purple-title{
					// font-size: 14px;
					@{property}: #666666;
				}
			}
			.passIcon{
				fill:#ffffff;
				font-size: 50px;
			}
			.grid-content{
				padding: 10px;
				@{radius}: @radius4;
			}
			.bg-purple-1{
				background-@{property}:#F05050;
			}
			.bg-purple-2{
				background-@{property}:#7266ba;
			}
			.bg-purple-3{
				background-@{property}:rgb(52,191,163);
			}
			.bg-purple-4{
				background-@{property}:rgb(54,163,247);
			}
		}
	}
</style>