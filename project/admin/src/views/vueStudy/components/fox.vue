<template>
	<div>
		<ul class="">
			<li v-for="item in hotworkslist" class="flex-h fox-list flex-be flex-vc">
				<img :src="item.url" alt="">
				<div>
					<h4>{{item.title}}</h4>
					<p>姓名：{{item.name}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
  	name: 'hot',
  	data(){
  		return{
  			hotworkslist:[
  				{url:'https://img.zcool.cn/community/010cce5c9b5b79a801208f8b8a8e65.jpg@260w_195h_1c_1e_1o_100sh.jpg',title:'大力 X 毒App',name:'大力工厂'},
  				{url:'https://img.zcool.cn/community/0132f85ca42bb8a801208f8bcb6b65.jpg@260w_195h_1c_1e_1o_100sh.jpg',title:'设计师十问十答 | 那些你最想知道的答案',name:'Jady13_剑杰'},
  				{url:'https://img.zcool.cn/community/01762a5c9dcf80a8012141689c4048.jpg@260w_195h_1c_1e_1o_100sh.jpg',title:'平面海报',name:'许鲜生'}
  			]
  		}
  	},
  	methods:{
  		
	}
  	
}
</script>
<style lang = "less" scoped>
	.fox-list{
		border:1px solid #d8dce5;
		margin-bottom: 30px;
		padding: 20px;
		box-sizing: border-box;
		img{
			border-radius: 4px;
		}
		h4{
			font-size: 16px;
			padding-bottom: 4px;
		}
	}
</style>
