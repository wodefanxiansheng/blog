<template>
	<div :class="className" :style="{width: width,height: height}">
		
	</div>
</template>
<script>
	import echarts from '@/echarts/echarts'
	export default {
		props:{
			className:{
				type:String,
				default:'chart'
			},
			width:{
				type:String,
				default:'100%'
			},
			height: {
		      type: String,
		      default:'100%'
		    }
		},
		data(){
			return {
				chart:null,
			}
		},
		mounted(){
			this.initCharts();
		},
		methods: {
			initCharts(){
				this.chart = echarts.init(this.$el);
				this.setOptions();
			},
	      	setOptions() {
			    // 绘制图表
			    this.chart.setOption({
			        title: { text: '个人前端技术学习程度',x:'center'},
			        tooltip: {
			          trigger: 'axis',
			          axisPointer: { // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			          }
			        },
			        grid: {
			          top: 100,
			          left: '2%',
			          right: '2%',
			          bottom: '3%',
			          containLabel: true
			        },
			        legend: {
				        data:['pageA','pageB','pageC'],
				        right:'right'
				    },
			        xAxis: {
			          data: ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年"]
			        },
			        yAxis: {},
			        series: [{
				          name: 'pageA',
				          type: 'bar',
				          stack: 'vistors',
				          barWidth: '80%',
				          data: [1300, 600, 200, 334, 390, 330],
				          animationDuration:2000
				        }, {
				          name: 'pageB',
				          type: 'bar',
				          stack: 'vistors',
				          barWidth: '80%',
				          data: [80, 560, 200, 334, 390, 330],
				          animationDuration:2000
				        }, {
				          name: 'pageC',
				          type: 'bar',
				          stack: 'vistors',
				          barWidth: '80%',
				          data: [30, 300, 200, 334, 390, 330],
				          animationDuration:2000
				    }]
			      });
			    }
	    },
	    computed:{
	    	
	    }
	}
</script>
<style lang="less" scoped="">

</style>