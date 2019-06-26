<template>
	<div class="navigation">
	    <aside class="navigation-aside">
	    	<header>
	    		<img src="../../img/images/LOGO.png" class="author-logo pointer" @click="home">
	    		<p class="author-text">
	    			<span class="fanxiansheng pointer" @click="home">凡先生的导航</span>
	    			<span>为前端爱好者提供</span>
	    		</p>
	    		<div class="nav-tags">
		    		<ul>
		    			<li v-for="(item,index) in listName" @click="goAnchor('#anchor-'+index,index)" :class="{'active':activeBtn == index}">{{item}}</li>
		    		</ul>
	    		</div>
	    	</header>
	    </aside>
	    <section class="navigation-setion">
	    	<div class="navigation-setion-wrap">
		    	<header class="navigation-setion-top">
		    		这里是前端工程师的天堂
		    	</header>
		    	<article class="navigation-setion-content" v-for="(item,index) in list" :id="'anchor-'+index">
		    		<p class="navigation-title">{{item.title}}</p>
		    		<ul>
		    			<li class="col-li" v-for="items in item.list">
		    				<p>
		    					<img :src="items.src" class="tubiao pointer" @click="urlLink(items)">
		    					<span class="navigation-name pointer" @click="urlLink(items)">{{items.name}}</span>
		    				</p>
		    				<p class="navigation-intro">{{items.content}}</p>
		    			</li>
		    		</ul>
		    	</article>
	    	</div>
	    </section>
    </div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		    	activeBtn:0,
		     	list:[],
		     	listName:['热门推荐','前端框架','论坛社区','个人框架','在线编程','代码托管','构建工具','检查测试']
		    }
		  },
		  mounted(){
		  		this.navList();
		  },
		  methods:{
		  		navList:function () {
		  			this.$http.get('articles/navs').then(res => { 
		  				// console.log(res)
		  				if(res.status == 200){
		  					this.list = res.data.result; 
		  				}
	                     
	                })
		  		},
		  		urlLink:function (item) {
		  			// window.location.href = item.link;//在本页跳转
		  			window.open(item.link,'_blank')//跳转到新的窗口
		  		},
		  		// 描点
		  		goAnchor:function (selector, index) {
		  			this.activeBtn = index;
      				var anchor = this.$el.querySelector(selector);
			        document.body.scrollTop = anchor.offsetTop; // chrome
			        document.documentElement.scrollTop = anchor.offsetTop; // firefox
		  		},
		  		home:function () {
		  			let home = this.$router.resolve({path:'/Home'});//解决在新窗口打开页面
              		window.open(home.href, '_blank');
		  		}
		  }
	}
</script>
<style lang="less" scoped>
	.active{
		background: #222 !important;
		color:#27ad9a !important;
	}
	.navigation{
		width: 100%;
		overflow-x: hidden;
		.navigation-aside{
		    width: 230px;
		    position: fixed;
		    z-index: 200;
		    top: 0;
		    left: 0;
		    bottom: -100px;
		    background-color: #171717;
		    padding: 31px 0;
		    color: #ccc;
		    header{
		    	.author-logo{
		    		width: 80px;
		    		margin:0 auto;
		    		display: block;
		    	}
		    	.author-text{
		    		display: flex;
		    		flex-direction: column;
		    		justify-content: center;
		    		text-align:center;
		    		line-height:2.2;
		    		border-bottom:1px solid #1f1f1f;
		    		padding: 20px 0;
		    		.fanxiansheng{
		    			font-size:20px;
		    			font-weight:bold;
		    			color:#fff;
		    		}
		    	}
		    	.nav-tags{
		    		text-align:center;
		    		margin-top: 20px;
		    		li{
		    			padding: 20px 0;
		    			color:#686868;
		    			cursor: pointer;
		    			&:hover{
		    				background: #222;
		    				color:#27ad9a;
		    			}
		    		}
		    	}
		    }
		    
		}

		.navigation-setion(@width,@widthLi){
		    padding-top: 30px;
		    .navigation-setion-wrap{
				width: @width;
				margin:0 auto;
			    .navigation-setion-top{
			    	width: 100%;
			    	padding: 22px 20px;
				    border-radius: 6px;
				    margin-bottom: 17px;
				    box-sizing: border-box;
				    overflow: hidden;
				    background: #fff;
				    box-shadow: 4px 4px 6px #e3e3e3;
				    text-align:center;
				    font-size:16px;
				    font-weight:bold;
				    color:#666;
			    }
			    .navigation-setion-content{
			    	width: 100%;
			    	border-radius:6px;
			    	background-color:#f9f9f9;
			    	padding: 20px 0px;
			    	box-sizing: border-box;
			    	margin-bottom:30px;
			    	.navigation-title{
			    		display: inline-block;
			    		color:#fff;
			    		padding: 8px 12px;
			    		background: #27ad9a;
			    		border-radius:6px;
			    		margin-left:40px;
			    	}
			    	ul{
			    		display: flex;
			    		margin-top:20px;
			    		flex-wrap: wrap;
						margin-left:40px;
				    	.col-li{
				    		width: @widthLi;
				    		padding: 20px;
				    		box-sizing: border-box;
				    		background: #fff;
				    		border-radius:8px;
				    		box-shadow: 4px 4px 4px #ddd;
				    		margin-right:20px;
			    			margin-bottom:20px;
				    		p{
				    			display: flex;
				    			align-items: center;
				    			justify-content: space-between;
				    			.tubiao{
				    				width: 32px;
				    				height: 32px;
				    				border-radius: 50%;
				    			}
				    			.navigation-name{
				    				font-size:15px;
				    				color:normal;
				    				font-weight:bold;
				    				transition: all 1s ease-in-out;
				    				&:hover{
						    			color:#27ad9a;
						    		}
				    			}
				    		}
				    		.navigation-intro{
				    			margin-top:10px;
				    			color:#666;
				    		}
				    	}
			    	}
			    }
			}
		}
		
		/* 大屏幕（大桌面显示器，大于等于 1200px） */
		@media screen and (min-width:1200px){
		    .navigation-setion(1400px,18%);
		    .navigation-setion{
		    	margin-left:230px;
		    }
		}
		/* 中等屏幕（桌面显示器，大于等于 992px） */
		@media screen and (min-width: 960px) and (max-width: 1199px) { 
			.navigation-setion(800px,30%);
			.navigation-setion{
		    	margin-left:230px;
		    }
		}
		/* 小屏幕（平板，大于等于 768px） */
		@media screen and (min-width: 768px) and (max-width: 959px) {
			.navigation-setion(98%,47%);
			.navigation-aside{
				display: none;
			}
		}
		// /* 超小屏幕（手机，小于 768px） */
		@media only screen and (max-width: 767px){ 
			.navigation-setion(95%,100%);
			.navigation-aside{
				display: none;
			}
			.navigation-setion{
				margin-left:0;
			}
		} 

	}
</style>