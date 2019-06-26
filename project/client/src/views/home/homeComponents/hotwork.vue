<template>
	<div class="hot-wrap">
		<h3 class="hot-title">热门文章</h3>
		<div>
			<ul>
				<li class="hot-article-list" v-for="(item,index) in articleLists">
					<img src="../../../img/images/fire.png">
					<span class="paiming">{{index+1}}</span>
					<div>
						<p class="hot-article-list-title pointer" @click="detailContent(item)">{{item.articleTitle}}</p>
						<div class="hot-article-list-right">
							<div class="hot-article-header-wrap">
								<img :src="item.articleSrc" class="hot-article-header pointer" @click="detailContent(item)">
							</div>
							<p class="hot-article-list-content">{{item.articleContent}}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
    </div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		     	page:1,
		    	pageSize:10,
		     	articleLists:[],
		     	count:0,
		     	// fenleiId:"0"
		    }
		  },
		  mounted(){
		  		this.newsAticlesList()
		  },
		  methods:{
		  		newsAticlesList:function () {
		  			let param = {
	                    page:this.page,
	                    pageSize:this.pageSize,
	                }
		  			this.$http.get('/articles/dianjinum',{params:param}).then( res =>{
		  				this.count = res.data.totalCount;  
	                    this.articleLists = res.data.result.list;  
		  			})
		  		},
		  		detailContent:function (item) {
	            	var detailId = item._id;
	            	let detail = this.$router.resolve({path:'/Home/details',query:{id:detailId}});//解决在新窗口打开页面
              		window.open(detail.href, '_blank');
	            },
		  		
		  }
	}
</script>
<style lang="less" scoped>
.hot-wrap{
	padding:0 20px 20px;
	box-sizing: border-box;
	.hot-title{
		text-align: center;
		padding: 20px 0;
		color:#555;
		font-size: 20px;
	}
	.hot-article-list{
		display: flex;
		align-items: center;
		border-top: 1px solid #eee;
		padding: 10px 0;
		.paiming{
			margin-right: 10px;
			margin-left: 10px;
			font-size: 16px;
			// font-weight: bold;
			color: #282828;
		}
		.hot-article-header-wrap{
			overflow: hidden;
			.hot-article-header{
				width: 88px;
			    height: 66px;
			    object-fit: cover;
			    // overflow: hidden;
			    transition: all 1s;
			    &:hover{
			    	transform: scale(1.2);
			    }
			}
		}
		.hot-article-list-title{
			font-size: 14px;
			margin-bottom: 10px;
			color:#555;
			font-weight: bold;
			overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 1;
		    -webkit-box-orient: vertical;
		    transition: all .1s;
				&:hover{
					color:#d36f16;
				}
		}
		.hot-article-list-right{
			display: flex;
			align-items: center;

			.hot-article-list-content{
				width: 168px;
				line-height: 1.5;
				overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			    -webkit-box-orient: vertical;
			    margin-left: 12px;
			    color:#888;
			    margin-right: 12px;
			}
		}
	}
}
</style>