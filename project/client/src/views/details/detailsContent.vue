<template>
	<div class="detail-wrap">
        <h3 class="articleTitle">网易博客关闭，何不从此开始潇洒行走江湖！</h3>
        <div class="article-header">
        	<span class="article-list-num-s">{{ctime | formatDate}}</span>
			<span class="article-list-num-s article-list-num-liulan">浏览量({{liulanNum}})</span>
			<span class="article-list-num-s article-list-num-like">喜欢({{likeNum}})</span>
        </div>
        <div v-html="detailContent">
        	{{detailContent}}
        </div>
        <div :class="['dianzan',{'zans':type == 1}]" @click="dianzan">
        	<i class="dianzanNum">{{likeNum}}</i>
        </div>
    </div>
</template>
<script>
	import {formatDate} from '../../assets/js/common.js';
	export default {
		  name: '',
		  data () {
		    return {
		    	detailContent:"",
		    	liulanNum:"",
		    	likeNum:"",
		    	ctime:"",
		    	pageId:"",
		    	type:"1"
		    }
		  },
		  filters: {
		        formatDate(time) {
		            var date = new Date(time*1000);
		            return formatDate(date, 'yyyy-MM-dd hh:mm');
		        }
		    },
		  components:{

		  },
		  mounted(){
		  		this.articledetail();
		  },
		  methods:{
		  	    articledetail:function () {
		  	    	var pageId = this.$route.query.pageId;
		  	    	 this.$http.get('/articles/webdetails',{params:{pageId:pageId}}).then(res => {
	                	this.detailContent = res.data.result.articleC;
	                	this.liulanNum = res.data.result.liulanNum;
	                	this.likeNum = res.data.result.likeNum;
	                	this.ctime = res.data.result.ctime;
	                	this.pageId = res.data.result.pageId;
	                	this.type = res.data.result.type;
	                })
		  	    },
		  	    // 文章访问量
		  	    dianzan:function () {
				  	// 1.文章id,2.type == 1，已经赞过了；type==2，需要点赞
				  	if(this.type == '2'){
				  		this.type = '1';
				  		this.likeNum ++;
					  	this.$http.post('/articles/detailDianzan',{pageId:this.pageId,type:'1',likeNum:this.likeNum}).then(res => {
					  		console.log(res)
		                })
					  }else{
					  	alert("已经赞过了")
					  }

		  	    }
		  }
	}
</script>
<style lang="less">
	.detail-wrap{
		border-radius: 4px;
		min-height:1200px;
		width: 1200px;
		margin:20px auto;
		font-size: 16px;
		line-height: 32px;
		background-color: #fff;
		padding:30px;
		box-sizing: border-box;
		.article-header{
			font-size: 14px;
			color:#999;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			span{
				margin-right: 20px;
			}
		}
		.articleTitle{
			text-align: center;
			font-size: 20px;
		}
		& img{
			width: 100%;
		}
		& p{
			margin:20px 0;
			color:#666666;
			word-wrap: break-word;
		}
		.article-list-num-liulan{
			padding:10px 25px;
			background:url('../../img/images/yueduNum.png') no-repeat;
			background-position: left center;
			background-size: 20px;
		}
		.article-list-num-like{
			padding:10px 25px;
			background:url('../../img/images/likeNum.png') no-repeat;
			background-position: left center;
			background-size: 20px;
		}
		.dianzan{
			width: 118px;
			margin: 30px auto;
			height: 70px;
			// padding: 30px 0;
		    border-radius: 50px 50px 50px 50px;
		    color: #282828;
		    -webkit-box-sizing: border-box;
		    -moz-box-sizing: border-box;
		    box-sizing: border-box;
		    cursor: pointer;
		    text-align: center;
		    background-color: #ffd100;
		    background-repeat:no-repeat;
		    background-size:30px;
		    background-position:center 20%;
		    position: relative;
		    border-top:1px;
		    position: relative;
		    display: flex;
		    justify-content: center;
		    background-image:url('../../img/images/zan.png');
		    .dianzanNum{
		    	position: absolute;
		    	bottom: 0px;
		    }
		}
		.zans{
			background-image:url('../../img/images/zans.png');
			color:#888888;
			background-color:#ddd;
		}
		
	}
			
</style>