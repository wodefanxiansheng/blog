<template>
	<div>
		<div class="content">
			<div class="new-article  technology-new-article" id="home-new-article">{{newTitle}}</div>
		    <div>
		    	<div class="article-list" v-for="item in articleList">
		    		<h3 class="article-list-title pointer" @click="detailContent(item)">{{item.articleTitle}}</h3>
		    		<div>
		    			<div class="article-list-content">
		    				<div class="article-list-image-wrap">
				    			<img src="https://img.zcool.cn/community/01a2fa5b8d48e4a8012126ce9a1eba.jpeg@260w_195h_1c_1e_1o_100sh.jpg" class="article-list-image pointer" @click="detailContent(item)">
				    		</div>
				    		<p class="content-word">{{item.articleContent}}</p>
			    		</div>
			    		<div class="article-list-s">
				    		<div class="article-list-num"> 
				    			<span class="article-list-num-s">{{item.ctime}}</span>
				    			<span class="article-list-num-s article-list-num-liulan">浏览量({{item.liulanNum}})</span>
				    			<span class="article-list-num-s article-list-num-like">喜欢({{item.likeNum}})</span>
				    		</div>
				    		<span class="more-btn" @click="detailContent(item)">阅读原文</span>
			    		</div>
		    		</div>
		    	</div>
		    </div>
		    <!-- <queshengpage v-show="articleList == ''? true:false "></queshengpage> -->
		    <pagination class="pagination"
	                :page-index="page"
	                :total="count"
	                :page-size="pageSize"
	                @change="pageChange">
	        </pagination>
	    </div>
    </div>
</template>
<script>
	import pagination from '../../../components/pagination'
	import {formatDate} from '../../../assets/js/common.js'
	import VueEvent from '../../../assets/js/VueEvent.js'
	// import queshengpage from '../../../components/queshengpage'
	export default {
		  name: '',
		  props:['newTitle'],
		  data () {
		    return {
		     	page:1,
		    	pageSize:10,
		     	articleList:[],
		     	count:0,
		     	fenleiArr:[],
		     	fenleiIds:"0",
		     	quepageBool:false
		    }
		  },
		  components:{
		  	 pagination,
		  	 // queshengpage
		  },
		  beforeMount(){

		  },
		  mounted(){
		  		let _this = this;
				VueEvent.$on('content',data => {

						_this.page = 1;
			  			_this.fenleiIds = data;
			  			_this.articlesList(_this.fenleiIds);
			  		
		  		})
				_this.articlesList(_this.fenleiIds)

		  },
		   filters: {
		        formatDate(time) {
		            var date = new Date(time*1000);
		            return formatDate(date, 'yyyy-MM-dd hh:mm');
		        }
		    },
		  methods:{
		  		articlesList:function (fenleiId) {
		  			this.fenleiId = fenleiId;
	                let param = {
	                    page:this.page,
	                    pageSize:this.pageSize,
	                    fenleiId:this.fenleiId
					}
					const prefix = '/api/'
	                this.$http.get(prefix+'/articles',{params:param}).then(res => {
	                	// console.log(res) 
	                	this.count = res.data.totalCount;  
	                    this.articleList = res.data.result.list;  
	                })
		  		},
		  		 // 分页
	            pageChange(index){
	                this.page = index;
	                this.articlesList(this.fenleiId);
	            },
	            detailContent:function (item) {
              		let liulanNum = item.liulanNum,
              			pageId = item.pageId;
						  liulanNum ++;
					const prefix = '/api/'
              		this.$http.post(prefix+'articles/liulanCount',{liulanNum:liulanNum,pageId:pageId}).then(res => {
	                	console.log(liulanNum,pageId,res)
	                })
	                this.$http.post(prefix+'articles/detailCount',{liulanNum:liulanNum,pageId:pageId}).then(res => {
	                	console.log(liulanNum,pageId,res)
	                })
	                let detail = this.$router.resolve({path:'/Home/details',query:{pageId:pageId}});//解决在新窗口打开页面
              			window.open(detail.href, '_blank');
	            },
		  }
	}
</script>
<style lang="less" scoped>
	.content{
		.new-article{
			font-size: 20px;
			font-weight: bold;
			margin:20px 0;
		}
		.article-list{
			background-color: #fff;
			border-radius: 4px;
			margin-bottom: 20px;
			padding: 20px;
			box-sizing: border-box;
			.article-list-title{
				margin-bottom: 20px;
				color:#333;
				font-size: 14px;
				transition: all .1s;
				&:hover{
					color:#d36f16;
				}
			}
			.article-list-content{
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 1.8;
				font-size: 14px;
				color:#666;
				.content-word{
					width: 900px;
					overflow: hidden;
				    text-overflow: ellipsis;
				    display: -webkit-box;
				    -webkit-line-clamp: 3;
				    -webkit-box-orient: vertical;
				}
				.article-list-image-wrap{
					width: 210px;
					height: 158px;
					overflow: hidden;
					.article-list-image{
						width:100%;
						height: 100%;
						object-fit: cover;
						border-radius: 4px;
						margin-right: 20px;
						transition: all 1s;
					    &:hover{
					    	transform: scale(1.1);
					    }
					}
				}
			}
			.article-list-s{
				display: flex;
				justify-content: space-between;
				margin:20px 0 0;
				.article-list-num{
					.article-list-num-s{
						margin-right: 30px;
						color:#bbb;
					}
					.article-list-num-liulan{
						padding:10px 25px;
						background:url('../../../img/images/yueduNum.png') no-repeat;
						background-position: left center;
						background-size: 20px;
					}
					.article-list-num-like{
						padding:10px 25px;
						background:url('../../../img/images/likeNum.png') no-repeat;
						background-position: left center;
						background-size: 20px;
					}
				}
				.more-btn{
					padding:0px 25px;
					background:url('../../../img/images/more.png') no-repeat;
					background-position: left center;
					background-size: 20px;
					color:rgb(39,173,154);
					cursor: pointer;
				}
			}
		}
	}

</style>