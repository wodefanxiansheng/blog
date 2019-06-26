<template>
	<div class="layout">
	    <div class="header-nav">
	        <div class="layout-logo pointer" @click="home">凡先生的博客</div>
	        <div class="layout-nav">
	        	<ul>
	        		<li>
	        			<router-link to="/home" active-class="active">首页</router-link>
	        		</li>
	        		<li>
	        			<router-link to="/technology" active-class="active">前端分享</router-link>
	        		</li>
	        		<li>
	        			<router-link to="/diary" active-class="active">畅聊空间</router-link>
	        		</li>
	        		<!-- <li>
	        			<router-link to="/music" active-class="active">我的音乐</router-link>
	        		</li> -->
	        		<li>
	        			<router-link to="/me" active-class="active"  target="_blank">关于凡先生</router-link>
	        		</li>
	        		<li>
	        			<router-link to="/message" active-class="active" target="_blank">留言</router-link>
	        		</li>
	        		<li>
	        			<router-link to="/navigation" active-class="active" target="_blank">导航</router-link>
	        		</li>
	        	</ul>
	        </div>
	    </div>
    </div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		     	
		    }
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  	 home:function () {
		  	 	this.$router.push({path:'/home'})
		  	 }
		  }
	}
</script>
<style lang="less" scoped>
	.layout{
		width: 100%;
		
		font-size: 14px;
		background-color:#ffd100;
		.header-nav{
			width: 1200px;
			margin:0 auto;
			
			display: flex;
			justify-content: space-around;
			align-items: center;
			.layout-logo{
				font-size: 20px;
				font-weight: bold;

			}
			ul{
				display: flex;
				li{
					margin-right: 30px;
					a{
						display: inline-block;
						color: #282828;
						padding: 20px;
						&:hover{
							background: #282828;
    						color: #ffd100;
    						transition: all 1s;
						}
					}
				}
			}
		}
	}
	.active{
		font-weight: 600;
	}
</style>