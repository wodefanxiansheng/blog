<template>
	<div>
		<commentsShow v-show="commentswrapBool" :commentswrapBool="commentswrapBool" @closeError="closeError" @refreshList="refreshList"></commentsShow>

		<div class="comments-middle">
			<span class="write-comments pointer" @click="leavingmessageOne($event)" nowId = "1">点击留言</span>
			<p class="all-comments">全部评论 <i class="commentsNum">{{totalCount}}</i></p>
			<div>
				<ul>
					<li class="comments-list" v-for="(item,index) in commentsArr">
						<div class="own-group-wrap">
							<img :src="item.src" class="commens-logo">
							<div class="commentsContent">
								<div>
									<span class="comments-list-name" ref="senderName">{{item.senderName}}</span>
									<span class="comments-list-time">{{item.time}}</span>
								</div>
								<div class="comments-list-content">
									{{item.content}}
								</div>
								<div class="huifu-zhu">
									<span class="comments-list-huifu pointer huifu-s" @click="leavingmessageOne($event,item,index)" nowId = "2">回复</span>
								</div>
							</div>
						</div>
						<div class="reply-group-wrap" v-if="item.r_reply_list == ''?false : true">
							<ol class="reply-group">
								<li class="reply-group-li" v-for="(items,indexs) in item.r_reply_list">
									<img :src="items.src" class="commens-logo r-commens-logo">
									<div class="commentsContent">
										<div>
											<span class="comments-list-name r-comments-list-name">
												<i class="senderName" ref="senderNames">{{items.senderName}}</i>  <span class="r-huifu">回复</span>  <i>{{items.recipient}}</i>
											</span>
											<span class="comments-list-time">{{item.time}}</span>
										</div>
										<div class="comments-list-content">
											{{items.content}}
										</div>
										<span class="r-comments-list-huifu pointer huifu-s" @click="leavingmessageTwo($event,indexs,item)" nowId = "3">回复</span>
									</div>
								</li>
							</ol>
						</div>
					</li>

				</ul>
				<button class="morecomments" @click="loadMore">{{moreText}}</button>
			</div>
		</div>
		<return-top></return-top>
	</div>
</template>
<script>
	import commentsShow from '@/components/comments-show'
	export default {
		  name: '',
		  data () {
		    return {
		    	page:1,
		    	pageSize:20,
		    	commentsArr:[],
		    	commentswrapBool:false,
		    	moreText:"查看更多评论",
		    	moreBool:true,//点击加载更多，默认为true,还有更多数据
		    	totalCount:"",
		    	articleId:""
		    }
		  },
		  components:{
			commentsShow
		  },
		  mounted(){
		  	  this.commentsList();
		  },
		  methods:{
		  	backTop:function () {
              this.$refs.commentsTop.scrollIntoView()
            },
            refreshList:function (){
            	this.commentsArr = [];
            	this.commentsList();
            },
            commentsList:function () {
            	this.articleId = this.$route.query.pageId;
            	console.log(this.articleId)
            	let param = {
            		page:this.page,
            		pageSize:this.pageSize,
            		articleId:this.articleId
            	}
                this.$http.get('/articles/comments',{params:param}).then(res => {
	                this.commentsArr = this.commentsArr.concat(res.data.result);
	                let nowCount = parseInt(this.pageSize*(this.page-1)) + parseInt(res.data.result.length);
	                this.totalCount = res.data.totalCount;
	                if(nowCount < res.data.totalCount){
	                	// 证明还有数据
	                	this.moreBool = true;
	                	this.moreText = "查看更多评论";
	                	return;
	                }else{
	                	// 证明最后一页，没数据了
	                	this.moreBool = false;
	                	this.moreText = "没有更多评论了";

	                }
	            })
            },
            loadMore:function () {
            	if(this.moreBool){
	            	this.page++;
	            	this.moreText = "加载中"
	                this.commentsList();//点击加载更多
                }
            },
            leavingmessageOne:function (e,item,index) {
            	// console.log(e,item._id)
            	this.commentswrapBool = true;
            	// 判断点击的是回复还是发表评论
             	let nowId = e.target.getAttribute('nowId');
             	let recipientName;

         		
         		if(nowId == 2){
	         		let _id = item._id;
	             	this.$store.commit('get_id',_id);//获取评论id
	             	// 第一种情况的回复
	         		recipientName = this.$refs.senderName[index].innerHTML;//点击回复获取发送者
	         		
             	}
             	// console.log(recipientName)
             	this.$store.commit('getrecipientName',recipientName);
             	this.$store.commit('getnowId',nowId);//判断点击的是留言还是回复
             	this.$store.commit('getarticleId',this.articleId);//文章id
            },
            leavingmessageTwo:function (e,index,item) {
            	// console.log(e,index,item._id)
            	this.commentswrapBool = true;
            	let nowId = e.target.getAttribute('nowId');
             	// 第二种情况的回复
             	let recipientName;
             	item.r_reply_list.forEach((item,i) => {
             		recipientName = item.senderName;
             	})
             	// console.log()
             	let _id = item._id;
             	this.$store.commit('get_id',_id);
             	this.$store.commit('getrecipientName',recipientName);
             	this.$store.commit('getnowId',nowId);//判断点击的是留言还是回复
             	this.$store.commit('getarticleId',this.articleId);//文章id
            },
            closeError:function (bool) {
            	this.commentswrapBool = bool;
            },

		  }
	}
</script>
<style lang="less" scoped>

.comments-middle{
	// margin-top: 0px;
	.write-comments{
		text-align: center;
		font-size:20px;
		color: #27ad9a;
		font-weight: bolder;
		background-color: #eee;
		display: block;
		width:100px;
		padding: 10px;
		margin:0 auto;
		transition: all .5s;
		&:hover{
			width: 120px;
			color: #d36f16;
		}
	}
	.morecomments{
		width: 600px;
		height: 35px;
		background-color: #f7f7f7;
		border-radius: 6px;
		margin: 0 auto;
		display: block;
		color:#d36f16;
		outline: none;
		&:hover{
			background-color: #eee;
		}
	}
	.all-comments{
		font-size: 16px;
		color:#444;
		.commentsNum{
			color:#bbbbbb;
		}
	}
	.comments-list{
		margin-top: 20px;
		margin-bottom: 20px;
		border-bottom:1px solid #f1f1f1;
		padding: 20px 0;
		.own-group-wrap{
			display: flex;
		}
		.reply-group-wrap{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			.reply-group{
				width: 90%;
				background-color: #f7f7f7;
			    padding: 20px 16px 24px;
			    margin-top: 10px;
			    .reply-group-li{
			    	display: flex;
			    	margin-bottom: 20px;
			    	.r-commens-logo{
			    		width: 30px;
			    		height: 30px;
			    	}
			    	.r-comments-list-huifu{
			    		color: #adadad;
			    		&:hover{
			    			color: #27ad9a;
			    		}
			    	}
			    	.r-comments-list-name{
			    		color: #444444;
			    	}
			    }
			}
		}
		.commens-logo{
			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: 50%;
			margin-right: 20px;
		}
		.commentsContent{
			width: 100%;
			display: flex;
			flex-direction: column;
			.huifu-zhu{
			    display: flex;
			    justify-content: flex-end;		
			}
			.comments-list-content{
				margin:10px 0;
			    color: #666666;
			    font-size: 14px;
			    float: left;
			    word-break: break-word;
			    word-break: break-all;
			    overflow: hidden;
			    line-height: 24px;
			}
			.comments-list-huifu{
				display: flex;
				justify-content: flex-end;
				color:#27ad9a;
				font-weight: bold;
				font-size: 14px;
			}
			.comments-list-time{
				margin-left: 12px;
				color: #bbb;
			}
			.comments-list-name{
				color: #27ad9a;
			    font-size: 14px;
			    font-weight: 600;
			    transition: all .5s;
			    .r-huifu{
			    	color: #adadad;
			    	margin:0 12px;
			    }
			    &:hover{
			    	color: #d36f16;
			    }
			}
			.huifu-s{
				width: 50px;
			}
		}
	}
}

</style>