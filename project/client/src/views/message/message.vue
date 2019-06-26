<template>
	<div  class="message-wall">
		<div class="messageTitlewrap">
			<h1 class="messageTitle">留言墙 </h1>
			<span class="round"></span>
			<p class="city">
				<div id="bdMapBox" style="display:none;"></div>
				<p><span id="atCity">{{city}}</span></p>
			</p>
			<div class="tianqi">
				<iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=82" width="250" height="440" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</div>
		</div>
		<div class="wall">
			<div class="write-message">
				<img src="../../img/images/message-3.png">
				<p class="write-title pointer" @click="closeMessageBool = true">发表留言</p>
				<div class="return_home pointer" @click="retunHome">
					<span>首页</span>
					<img src="../../img/images/return.png" >
				</div>
			</div>
			<div class="video-wrap">
				 <div class="item">
			          <div class="player">
			            <video-player  class="vjs-custom-skin"
			                           ref="videoPlayer"
			                           :options="playerOptions"
			                           :playsinline="true">         
			            </video-player>
			          </div>
		      	</div>
			</div>
			<div class="write-message-wall" v-show="closeMessageBool">
				<div class="write-message-wall-content">
					<img src="../../img/images/message-2.png">
					<div class="wall-wrap">
						<div class="input-textarea">
							<span class="name">昵称 : </span>
							<input type="text" name="" maxlength="10" v-model="inputValue">
						</div>
						<div class="input-textarea" >
							<span class="name">留言 : </span>
							<textarea maxlength="200" v-model="textareaValue"></textarea>
						</div>
						<button class="submit-message" @click="sumitMessage">提交</button>
						<img src="../../img/images/close2.png" class="close-message pointer" @click="closeMessage">
					</div>
				</div>
			</div>
		</div>
		<div class="liuyanwall">
			<div>
				<ul class="message-box-wrap">
					<li class="message-box" v-for="item in messageLists">
						<img src="../../img/images/pin.png" class="pin">
						<div>
							<p class="message-box-title message-box-list">
								<span class="message-box-name">{{item.name}}</span>
								<!-- <span class="message-box-all pointer">[全部]</span> -->
								<img :src="item.src" class="message-box-all">
							</p>
							<p class="message-box-content message-box-list">
								{{item.content}}
							</p>
							<p class="message-box-bottom message-box-list">
								<span>大神:{{item.city}}</span>
								<span>{{item.time}}</span>
							</p>
						</div>
					</li>
				</ul>
			</div>
			<pagination class="pagination"
	                :page-index="page"
	                :total="count"
	                :page-size="pageSize"
	                @change="pageChange">
	    	</pagination>	
		</div>
		<errortip></errortip>
		<vue-progress-bar></vue-progress-bar>
		
	</div>
</template>
<script>
	import pagination from '@/components/pagination'
	import { videoPlayer } from 'vue-video-player'
	import { formatDateTime } from '@/assets/js/common.js'
	import { removeAllSpace } from '@/assets/js/common.js'
	import errortip from '@/components/errortip'
	export default {
		  name: '',
		  data () {
		    return {
		    	messageLists:[],
		    	closeMessageBool:false,
		    	page:1,
		    	pageSize:20,
		    	count:0,
		    	city:'',
		    	inputValue:"",
		    	textareaValue:"",
		    	 playerOptions: {
		          height: '491',
		          width:'875',
		          autoplay: false,
		          muted: false,
		          language: 'en',
		          playbackRates: [0.7, 1.0, 1.5, 2.0,3.0],
		          sources: [{
		            type: "video/mp4",
		            // mp4
		            src: require("../../img/video/me.mp4"),
		          }],
		          poster: require("../../img/images/girl.jpg"),
		        },
		        logoArr:[require('../../img/messageLogo/1.jpg'),require('../../img/messageLogo/2.jpg'),require('../../img/messageLogo/3.jpg'),require('../../img/messageLogo/4.jpg'),require('../../img/messageLogo/5.jpg'),require('../../img/messageLogo/6.jpg'),require('../../img/messageLogo/7.jpg'),require('../../img/messageLogo/8.jpg'),require('../../img/messageLogo/9.jpg'),require('../../img/messageLogo/10.jpg'),require('../../img/messageLogo/11.jpg'),require('../../img/messageLogo/12.jpg'),require('../../img/messageLogo/13.jpg'),require('../../img/messageLogo/14.jpg'),require('../../img/messageLogo/15.jpg'),require('../../img/messageLogo/16.jpg'),require('../../img/messageLogo/17.jpg'),require('../../img/messageLogo/18.jpg'),require('../../img/messageLogo/19.jpg'),require('../../img/messageLogo/20.jpg')],
		     	imgUrl:""
		    }
		  },
		  components:{
		  	 pagination,
		  	 errortip
		  },
		  mounted(){
		  		this.messageList();
		  		// 百度地图API功能
		  		let _this = this;
				var map = new BMap.Map("bdMapBox");
				var nowCity = new BMap.LocalCity();
				nowCity.get(bdGetPosition);
				function bdGetPosition(result){
					var cityName = result.name; //当前的城市名
					_this.city = cityName
				}
		  },
		  methods:{
		  		messageList:function () {
		  			let param = {
		  				page:this.page,
		  				pageSize:this.pageSize,
		  			}
		  			this.$http.get('articles/messages',{params:param}).then(res => { 
		  			 	
		  			 	this.count = res.data.totalCount;  
	                    this.messageLists = res.data.result.list;  
	                    // console.log(this.messageLists)
	                })
		  		},
		  		closeMessage:function () {
		  			this.closeMessageBool = false;
		  		},
		  		 // 分页
	            pageChange(index){
	                this.page = index;
	                this.messageList();
	            },
	            sumitMessage:function () {
	            	// this.imgUrl = this.logoArr[Math.floor(Math.random()*this.logoArr.length)];
	            	// console.log(this.imgUrl)
	            	if(!this.textareaValue && !this.textareaValue){
	            		// alert("请输入您的昵称和留言")
	            		this.$store.commit('getErrortip',true);
						this.$store.commit('getErrortipContent','请输入昵称和留言');
						this.hides();
	            		return;
	            	}
	            	// 随机获取图片
	            	this.imgUrl = this.logoArr[Math.floor(Math.random()*this.logoArr.length)];
	            	// 获取当前时间
	            	 let timestamp = new Date().getTime();
	            	 let param = {
	            	 	content:removeAllSpace(this.textareaValue),
	            	 	name:removeAllSpace(this.inputValue),
	            	 	city:this.city,
	            	 	time:formatDateTime(timestamp),
	            	 	src:this.imgUrl
	            	 }
	            	 // console.log(formatDateTime(timestamp))
	            	 this.$Progress.start();//显示进度条
	            	 this.$http.post('articles/messagesubmit',param).then(res => {
	            	 	if(res.data.status == "0"){
		                    this.messageLists.unshift(param);
		                    this.closeMessageBool = false;
		                    this.$Progress.finish()
		                }
	                }).catch(function (error) {
					    this.$Progress.fail();
					});
	            },
	            hides:function () {
					let that = this;
					setTimeout(function () {
						that.$store.commit('getErrortip',false);
					},5000)
				},
				retunHome:function () {
					let home = this.$router.resolve({path:"/home"});
		  			window.open(home.href, '_blank');
				}
		  }
	}
</script>
<style lang="less" scoped> 
	.message-wall{
		height: 100%;
		.messageTitlewrap{
			width: 100%;
			padding: 20px 0;
			background-color:#393d49;
			border-bottom:1px solid #404553;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			position: relative;
			&:hover .tianqi{
				display: block;
			}
			.round{
				width: 5px;
				height: 5px;
				background-color: #fff;
				border-radius:50%;
				margin:0 12px;
			}
			.city{
				font-size: 18px;
			}
			.messageTitle{				
				font-size: 25px;
				text-align:center;
			
			}
			.tianqi{
				pointer-events:none;
				position: absolute;
				top: 60px;
				background-color: #fff;
				display: none;
				z-index: 9999999999999;
			}
		}
		.wall{
			width: 100%;
			height: 1032px;
			background:url('../../img/images/message-1.png') no-repeat center top;
			background-size: cover;
			display: flex;
			justify-content: center;
			position: relative;
			.video-wrap{
				margin-left: -20px;
    			margin-top: 448px;
			}
			.write-message{
				position: fixed;
				right: 0;
				top: 183px;
				z-index: 10;
				.return_home{
					position: absolute;
					bottom:55px;
					right: 78px;
					display: flex;
					align-items: center;
					img{
						width: 50px;
					}
					span{
						margin-top: 15px;
						color: #fff;
						transition: all 1s;
						font-weight: bold;
						font-size:12px;
						background: #d87304;
						border-radius:50%;
						display: inline-block;
						padding: 10px;
						// &:hover{
						// 	transform: scale(1.3);
						// }
					}
				}
				.write-title{
					position: absolute;
					top: 120px;
					left: 62px;
					font-size:26px;
					font-weight:bold;
					color:rgb(216,115,4);
					transition: all 1s;
					padding: 8px;
					&:hover{
						box-shadow: 2px 2px 4px #e2b780;
					}
				}
			}
			.write-message-wall{
					width: 100%;
					height: 100%;
					background-color: rgba(0,0,0,.5);
					position: fixed;
					top: 0;
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 9999;
					.write-message-wall-content{
						color:rgb(216,115,4);
						position: relative;
						.wall-wrap{
							position: absolute;
							top: 30%;
							left: 20%;
							display: flex;
							flex-direction: column;
							font-size:18px;
							.close-message{
								width: 46px;
								height: 46px;
								position: absolute;
								top: -140px;
								right: -240px;
							}
							.submit-message{
								width: 100px;
								margin:0 auto;
								background-color: rgb(246,215,162);
								padding: 12px 10px;
								border-radius:4px;
								color: rgb(168,93,12);
								font-size:20px;
								font-weight:bolder;
								box-shadow: 4px 4px 4px rgba(0,0,0,.5);
								outline: none;
							}
							.input-textarea{
								margin-bottom:50px;
								display: flex;
								color:#000;
								.name{
									margin-top: 10px;
									margin-right:10px;
									color:#323232;
									font-size:14px;
									font-weight:bold;
								}
								input{
									width: 250px;
									height: 40px;
								    background: #d1ad78;
								    outline: none;
								    border: 1px solid #FFF;
								    border-radius: 5px;
								    margin-bottom: 12px;
								    padding-left: 10px;

								}
								textarea{
									    width: 300px;
									    height: 98px;
									    text-align: left;
									    padding: 10px;
									    background: #d1ad78;
									    outline: none;
									    border: 1px solid #FFF;
									    border-radius: 5px;
									    margin-bottom: 12px;
									    padding-left: 10px;
									    resize: none;
									    line-height:1.3;
								}
							}
						}
					}
				
				
			}

		}
		.liuyanwall{
			width: 100%;
			height: 1200px;
			background-color: #ddd;
			background-image:url('../../img/images/wall.jpeg');
			background-size: cover;
			background-position: center top;
			padding-top: 1px;
			.message-box-wrap{
				display: flex;
				flex-wrap: wrap;
				max-width: 1400px;
				.message-box{
					width: 200px;
					padding: 10px;
					background-color: rgb(237,241,255);
					box-shadow: 8px 8px 15px rgba(0,0,0,.6);
					position: relative;
					line-height:1.5;
					transform: rotate(8deg);
					margin:30px;
					transition: all .5s;
					-webkit-border-bottom-left-radius: 40px 500px;
    				-webkit-border-bottom-right-radius: 500px 30px;
					&:hover{
		                 	transform: scale(1.1);
		                 }
					.pin{
						position: absolute;
						top: -20px;
						left: 45%;
						width: 30px;

					}
					.message-box-list{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.message-box-name{
							color:#27ad9a;
							font-size:14px;
							font-weight: bold;
						}
						.message-box-all{
							width: 35px;
							height: 35px;
							border-radius:50%;
						}
					}
					.message-box-bottom,.message-box-title{
						// background-color: rgb(225,232,255);
						padding: 4px 6px;
					}
					.message-box-content{
						margin:15px 0;
						height: 90px;
						color:#000;
						word-break: break-all;
		                 display: -webkit-box;
		                 -webkit-line-clamp: 5;  /*限制在一个块元素显示的文本的行数*/
		                 -webkit-box-orient: vertical;
		                 overflow: hidden;

		                 
					}
				}
			}
		}
	}
/deep/ .vjs-big-play-button{
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
</style>