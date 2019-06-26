<template>
	<div>
		<div>
			<div class="diary-list" v-for="item in shuoshuoList">
				<div class="diary-header">
					<span class="logo"></span>
					<div class="diary-header-wrap">
						<p class="diary-header-wrap-name">{{item.kongjianName}}</p>
						<p class="kongjianTime">{{item.kongjianTime}}</p>
					</div>
				</div>
				<div class="diary-content">
					{{item.shuoshuo}}
				</div>
				<div class="js-sea">
					<span class="liulanNum">浏览 {{item.liulanNum}} 次</span>
					<span :class="['dianzan','pointer',{'active':item.checked}]" @click="dianzan(item.zanNum,item.checked,item.id)">{{item.zanNum}}</span>
				</div>
			</div>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
            <div class="load-more" v-show="loading">
                 正在加载中...
            </div>
        </div>
        <div class="morelists" v-show="morebool">没有更多说说了</div>
	</div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		    	shuoshuoList:[],
		    	page:1,
		    	pageSize:10,
		    	sortFlag:true,//如果该属性的值为true，则将禁用无限滚动。false,则可以滚动
                busy: true,
                loading:false,//正在加载中
                morebool:false,//没有更多数据
                // checkedBool:true
		    }
		  },
		  components:{
		  	
		  },
		  mounted(){
		  		this.shuoshuolist()
		  },
		  methods:{
		  		shuoshuolist:function (flag) {
		  			let param = {
	                    page:this.page,
	                    pageSize:this.pageSize,
	                }
	                this.loading = true;//加载中...
	                this.$http.get('/articles/shuoshuos',{params:param}).then(res => {
	                	if(res.status == 200){ 
	                		if(flag){
	                			
	                			this.shuoshuoList = this.shuoshuoList.concat(res.data.result.list);
	                			if(res.data.result.count < this.pageSize){
	                				this.loading = false;
                                    console.log("已经没数据了")
                                    this.busy = true;//禁止无限加载
                                    this.morebool = true;
                                }else{
                                	this.loading = true;
                                    console.log("还有数据")
                                    this.busy = false;//可以加载
                                }
	                		}else{
	                			this.shuoshuoList = res.data.result.list;  
	                			// 当第一次加载数据完之后，可以加载数据了为false，如果为true，禁止无限加载
                                this.busy = false;
	                		}
	                    	
	                    }else{
	                    	this.goodsList = []
	                    }
	                })
		  		},
		  		loadMore:function () {
	               this.busy = true;//禁止无限加载
	               setTimeout(() => {
	                   this.page++;
	                   this.shuoshuolist(true);
	                }, 1000)

	            },
	            dianzan:function (num,zanbool,id) {
	            	
	            	
	            	if(zanbool == false){
	            		this.shuoshuoList.map(v =>{
		            		if(v.id === id){
		            			v.checked = true;
		            			v.zanNum++;
		            			return v;
		            		}
		            	})
	            		zanbool = true;
	            		num ++;
	            		 this.$http.post('/articles/dianzan',{checked:zanbool,number:num,shuoshuoId:id}).then(res => {
	            		 	console.log(res)
	            		 })
	            	}
	            	
	            	
	            }
		  }
	}
</script>
<style lang="less" scoped>
.load-more{
	text-align: center;
	color:#999;
}
.diary-list{
	background-color: rgba(250,250,250,.5);
	padding: 20px;
	box-sizing: border-box;
	border-radius: 8px;
	margin-bottom: 30px;
	.diary-header{
		display: flex;
		align-items: center;
		.diary-header-wrap{
			margin-left: 16px;
			line-height: 2;
			
			.diary-header-wrap-name{
				color:#282828;
			}
			.kongjianTime{
				color:#27ad9a;
			}
		}
		.logo{
			width: 60px;
			height: 60px;
			background: url("../../img/images/pexels.jpg") no-repeat;
			background-size: cover;
			background-position: center;
			border-radius: 50%;
		}
	}
	.diary-content{
		padding-bottom: 20px;
		padding-top: 20px;
		line-height: 20px;
		font-size: 14px;
		color:#282828;
	}
	.js-sea{
		display: flex;
		justify-content: space-between;
		color:#282828;
		align-items: center;
		.liulanNum{
			color:#a1a1a1;
		}

		.dianzan{
			width: 60px;
			height: 30px;
			display: inline-block;
			background: url("../../img/images/zans.png") no-repeat;
			background-size: 25px;
			margin-right: 50px;
			text-indent: 30px;
			line-height: 30px;
			font-size: 16px;
			color:#282828;
			
		}
		.active{
			width: 60px;
			height: 30px;
			display: inline-block;
			background: url("../../img/images/kongjianzan.png") no-repeat;
			background-size: 25px;
			margin-right: 50px;
			text-indent: 30px;
			line-height: 30px;
			font-size: 16px;
			color:#282828;
		}
		
	}
}
.morelists{
	text-align: center;
	color:#999;
}
</style>