<template>
	<div class="hot-design">
		<ul class="flex-h flex-hw">
			<li v-for="item in designlist" class="flex-h flex-vc ">
				<img :src="item.avatar2x" alt="">
				<div class="content">
					<p>{{item.username}}</p>
					<p>
						<span>{{item.cityName}}</span>
						<span>{{item.professionName}}</span>
					</p>
				</div>
				<button class="guanzhu">关注</button>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
  	name: 'hot',
  	data(){
  		return{
  			designlist:[]
  		}
  	},
  	mounted(){
  		this.list();
  	},
  	methods:{
  		list:function () {
  	    	this.$http.get('https://www.zcool.com.cn/one/city/hotDesigners',{params:{cityId:3154}}).then(res => {
            	console.log(res.data)
            	this.designlist = res.data;
            })
  		}
	}
  	
}
</script>
<style lang = "less" scoped>
.hot-design{
	li{
		margin:10px 20px;
		border:1px solid #d8dce5;
		padding:20px;
		box-sizing: border-box;
		border-radius: 4px;
		.guanzhu{
			color: #444;
		    background: #ffe300;
		    border: 1px solid #ffe300;
		    border-radius: 4px;
		    cursor: pointer;
		    text-align: center;
		    width: 80px;
		    padding:10px 0;
		}
		.content{
			margin: 0 20px;
			width:200px;
		}
		img{
			width:60px;
			height: 60px;
			border-radius: 50%;
		}
	}
}
</style>

