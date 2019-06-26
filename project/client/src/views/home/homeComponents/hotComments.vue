<template>
	<div class="hotComments">
		<h3 class="newsComments">最新评论</h3>
	    <ul>
	    	<li class="hotComments-list" v-for="item in messageLists">
	    		<img :src="item.src" class="messageLogo">
	    		<div class="messageContent">
		    		<div class="messageContent-infor">
		    			<span class="infor-name">{{item.name}}</span>
		    			<span class="infor-time">{{item.time}}</span>
		    		</div>
		    		<p class="messageContent-s">
		    			{{item.content}}
		    		</p>
		    		<div class="local">
		    			大神：{{item.city}}
		    		</div>
	    		</div>
	    	</li>
	    </ul>
	    <p class="more-comments pointer" @click="moremessage">查看更多</p>
    </div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		     	page:1,
		     	pageSize:6,
		     	messageLists:[],
		     	
		    }
		  },
		  components:{
		  	
		  },
		  mounted(){
		  		this.messageList();
		  },
		  methods:{
		  	    messageList:function () {
		  			let param = {
		  				page:this.page,
		  				pageSize:this.pageSize,
						}
						const prefix = '/api/'
		  			this.$http.get(prefix+'articles/messages',{params:param}).then(res => {  
	                    this.messageLists = res.data.result.list;  
	                })
		  		},
		  		moremessage:function () {
		  			let message = this.$router.resolve({path:"/message"});
		  			window.open(message.href, '_blank');
		  		},

		  }
	}
</script>
<style lang="less" scoped>
	.newsComments{
		color: #555;
		font-size:20px;
		text-align:center;
		padding-bottom:20px;
	}
	.hotComments-list{
		display: flex;
		// align-items: center;
		border-top:1px solid #eee;
		padding: 12px 0;
		.messageLogo{
			width: 38px;
			height: 38px;
			border-radius:50%;
			object-fit: cover;
		}
		.messageContent{
			margin-left:20px;
			.messageContent-infor{
				// margin-top:10px;
				color: #444444;
				display: flex;
				font-size:14px;
				justify-content: space-between;
				.infor-time{
					color:#bbb;
					font-size:12px;
				}
				.infor-name{
					width: 100px;
					 white-space:nowrap;
					 overflow:hidden;
					 text-overflow:ellipsis;
				}
			}
			.messageContent-s{
				    width: 250px;
				    margin-top:10px;
				    line-height:1.5;
				    color: #666666;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 2;
				    -webkit-box-orient: vertical;
				    word-break: break-all;
			}
			.local{
				text-align:right;
				color:#bbb;
				margin-top: 12px;
			}
		}
	}
	.more-comments{
		text-align:center;
		margin: 12px 0;
		padding: 12px 0;
		background-color: #ffd100;
		border-radius:4px;
		font-size: 14px;
	}

</style>