<template>
	<div>
		<title-m :text="text"></title-m>
		<div class="my-bar-chart">
			<bar-chart></bar-chart>
		</div>
	</div>
</template>
<script>
	// 按需引入 引入 ECharts 主模块
	import barChart from './components/barChart'
	export default {
		components:{
			barChart
		},
		data(){
			return {
				text:'图表库',
			}
		},
		mounted(){
			
		},
		methods: {
	      	
	    },
	    computed:{
	    	
	    }
	}
</script>
<style lang="less" scoped="">
	.my-bar-chart{
		width:600px;
		height: 600px;
	}
</style>