<template>
	<div class="comments-top-wrap">
		<img src="../img/images/close.png" class="close-comment-wrap pointer" @click="closewrap">
		<div class="comments-top">
			<h2 class="public-comments" ref="commentsTop">发表评论</h2>
			<div class="write-infor">
				<p class="write-infor-title">昵称 : </p>
				<input type="text" name="" placeholder="填写一下你的网名..." maxlength="15" v-model="inputValue">
			</div>
			<div class="write-infor">
				<p class="write-infor-title">说点什么吧 : </p>
				<textarea class="textarea" maxlength="150" placeholder="说点什么吧,宝贝......" v-model="textareaValue"></textarea>
			</div>
			<button :class="['comments-submit',{'comments-submit-bg':textareaValue&&inputValue}]" @click="commentSubmit" @keydown.enter="commentSubmit">提交</button>
			<errortip></errortip>
		</div>
	</div>
</template>
<script type="text/javascript">
	import errortip from '@/components/errortip'
	import { formatDateTime } from '@/assets/js/common.js'
	import {StorageFn} from '@/assets/js/storage.js'//本地存储
	export default {
		props:["commentswrapBool"],
		data(){
			return{
				commentswrap:this.commentswrapBool,
				inputValue:"",
				textareaValue:"",
				logoArr:[require('../img/messageLogo/1.jpg'),require('../img/messageLogo/2.jpg'),require('../img/messageLogo/3.jpg'),require('../img/messageLogo/4.jpg'),require('../img/messageLogo/5.jpg'),require('../img/messageLogo/6.jpg'),require('../img/messageLogo/7.jpg'),require('../img/messageLogo/8.jpg'),require('../img/messageLogo/9.jpg'),require('../img/messageLogo/10.jpg'),require('../img/messageLogo/11.jpg'),require('../img/messageLogo/12.jpg'),require('../img/messageLogo/13.jpg'),require('../img/messageLogo/14.jpg'),require('../img/messageLogo/15.jpg'),require('../img/messageLogo/16.jpg'),require('../img/messageLogo/17.jpg'),require('../img/messageLogo/18.jpg'),require('../img/messageLogo/19.jpg'),require('../img/messageLogo/20.jpg')],
				imgUrl:""
			}
		},
		components:{
			errortip
		},
		created(){
            this.locals = new StorageFn();//获取存储
            // this.localLogo = this.locals.getLocal('localLogo');
            if(this.locals.getLocal('localName')){
            	this.inputValue = this.locals.getLocal('localName');
            }
        },
		mounted(){
			
			
		},
		methods:{
			commentSubmit:function () {
				if(!this.inputValue || !this.textareaValue){
					// vuex
					this.$store.commit('getErrortip',true);
					this.$store.commit('getErrortipContent','请输入昵称和评论的内容');
					this.hides();
					return;
				}else{
					this.commentswrap = false;
					this.$emit('closeError',this.commentswrap);
					let senderName = this.inputValue,//发送者
						recipientName = this.$store.state.recipientName,//接收者
						content = this.textareaValue,//内容
						articleId = this.$store.state.articleId,//文章id
	            		time = formatDateTime(new Date().getTime()),//时间
	            		src = this.logoArr[Math.floor(Math.random()*this.logoArr.length)],//头像
	            		nowId = this.$store.state.nowId,//
	            		_id = this.$store.state._id,//评论的id
	            		localLogo,localName;

	            	// 头像储存到localstorage
        			if(!this.locals.getLocal('localLogo') && !this.locals.getLocal('localName')){
        				this.locals.setLocal('localLogo',src)//存储头像
        				this.locals.setLocal('localName',senderName)//存储名字

        			}else{
        				localLogo  = this.locals.getLocal('localLogo');
        				localName  = this.locals.getLocal('localName');
        				
        			}	

	            	let param = {
	            		nowId:nowId,
	            		senderName:senderName,
				        recipientName:recipientName,
				        articleId:articleId,
				        time:time,
				        content:content,
				        src:localLogo||src,
				        _id:_id
	            	}

	            	// console.log(param)
	            	this.$http.post('articles/reply',param).then(res => { 
	            		// console.log(res)
	            		if(res.status == 200){
	            			// 评论发送成功，调用评论接口
	            			this.$emit('refreshList')

	            			
	            		}
	                })	
				}
			},
			closewrap:function () {
				this.commentswrap = false;
				this.$emit('closeError',this.commentswrap);
			},
			hides:function () {
				let that = this;
				setTimeout(function () {
					that.$store.commit('getErrortip',false);
				},5000)
			}
		}
	}
</script>
<style lang="less" scoped>
	.comments-top-wrap{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
		.close-comment-wrap{
			width:30px;
			height: 30px;
			object-fit: cover;
			background-color: rgb(220,220,220);
			border-radius: 50%;
			padding: 7px;
			box-sizing: border-box;
			position: absolute;
			right: 50px;
			top: 30px;
			transition: all .5s;
			&:hover{
				background-color: rgb(250,250,250);
			}
		}
		.comments-top{
			width: 600px;
			margin-top: 5%;
			.comments-submit{
				width: 100px;
				display: block;
				background-color: #eee;
				margin:0 auto;
				border-radius: 6px;
				height: 36px;
			    line-height: 36px;
			    font-size: 14px;
			    color: #bbb;
			    outline: none;
			}
			.comments-submit-bg{
				background-color: #ffd100 !important;
				color: #181818;
			}
			.public-comments{
				color:#27ad9a;
				font-size: 20px;
				text-align: center;
				margin:0 20px 20px;
			}
			.write-infor{
				margin-bottom:20px;
				
				input{
					width: 100%;
					height: 40px;
					border:none;
					outline: none;
					border:1px solid #ddd;
					// color:#999999;
				    max-height: 134px;
				    padding: 10px 20px;
				    display: block;
				    box-sizing: border-box;
				    border-radius: 4px;
				    -webkit-border-radius: 4px;
				    -moz-border-radius: 4px;
				    overflow: hidden;
				    resize: none;
				}
				.write-infor-title{
					margin-bottom: 10px;
					color:#27ad9a;
					font-weight: bold;
				}
				.textarea{
				    width: 100%;
				    height: 42px;
				    max-height: 134px;
				    padding: 10px 10px 10px 20px;
				    display: block;
				    -webkit-box-sizing: border-box;
				    box-sizing: border-box;
				    border-radius: 4px;
				    -webkit-border-radius: 4px;
				    -moz-border-radius: 4px;
				    overflow: hidden;
				    resize: none;
				    border:1px solid #ddd;
				    outline: none;
				    line-height: 22px;
				}
			}
		}
}






















</style>