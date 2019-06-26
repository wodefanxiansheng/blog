<template>
	<div class="introWrap">
		<h3 class="me-title">凡先生的世界</h3>
	    <div>
	    	<div class="me-intro">
	    		<img src="../../../img/images/me.jpg" class="me">
	    		<span class="youke-num">游客到访数 ： <i class="youke-num-s">{{count}}</i></span>
	    	</div>
	    	<div class="me-information">
	    		<ul>
	    			<li>
	    				<span>网名：</span><span>凡先生</span>
	    			</li>
	    			<li>
	    				<span>职业：</span><span>前端工程师</span>
	    			</li>
	    			<li>
	    				<span>籍贯：</span><span>河北邯郸</span>
	    			</li>
	    			<li>
	    				<span>邮箱：</span><span>912244323@qq.com</span>
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
		     	count:""
		    }
		  },
		  mounted(){
		  	this.ipCount();
		  },
		  methods:{
		  	 ipCount:function () {
					 const prefix = '/api/'
		  	 	this.$http.get(prefix+'articles/getIp').then( res =>{
		  				this.count = res.data.result;  
		  			})
		  	 }
		  }
	}
</script>
<style lang="less" scoped>
.introWrap{
	padding: 20px 50px;
	box-sizing: border-box;
	.me-title{
		text-align: center;
		font-size: 16px;
        color: #282828;
	}
	.me-intro{
		display: flex;
		align-items: center;
		margin:20px 0 30px;
		justify-content: space-between;
		.me{
			width: 60px;
			height: 60px;
			object-fit: cover;
			border-radius: 50%;
		}
		.youke-num{
			font-size: 16px;
			color:#999;
			font-size: 12px;
			.youke-num-s{
				color:#ec414d;
				font-weight: bold;
				font-size: 16px;
			}
		}
	}
	.me-information{
		color: #666666;
		font-size: 16px;
		line-height: 2;
	}
}
</style>