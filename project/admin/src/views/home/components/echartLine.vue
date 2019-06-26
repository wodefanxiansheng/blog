<template>
	<div :class="className" :style="{width: width,height: height}">
		
	</div>
</template>
<script>
	import echarts from '@/echarts/echarts'
	import {dashboardData} from '@/api/dashboard'
	let getNowTime = (function (){
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
            now = new Date(now - 2000);
        }
        return res;
    })()
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
			let _this = this;
			return {
				chart:null,
				orderdata:{
					column:getNowTime,
					ipdata:(function (){//ip随机数据
				                var res = [];
				                var len = 10;
				                while (len--) {
				                    res.push(Math.round(Math.random() * 1000));
				                }
				                return res;
				            })(),
				    commentdata:(function () {//评论随机数据
				    			var res = [];
				                var len = 10;
				                while (len--) {
				                    res.push((Math.random()*10 + Math.random()*1000).toFixed(1) - 0);
				                }
				                return res;
				   			})(),
				   	
				},
			}
		},
		beforeMount(){
			// this.getechartData();
		},
		mounted(){
			this.initCharts();
		},
		methods: {
			initCharts(){
				this.chart = echarts.init(this.$el);
				// this.chart.showLoading({
			 //        text: '正在努力的读取数据中...',    //loading话术
			 //    });
				this.setOptions();
			},
	      	setOptions() {
				// 绘制图表
				this.chart.setOption({
				    title: {
	                    text: '',
	                    subtext: ''
	                },
	                textStyle: {
				        color: 'rgb(100,100,100)'
				    },
	                tooltip: {
	                    trigger: 'axis'
	                },
	                legend: {
	                    data: ['Ip数', '评论数']//图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
	                },
	                toolbox: {//提示框组件。
	                    show: true,
	                    feature: {
	                        mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
	                    }
	                },
	                dataZoom : {
				        show : false,
				        start : 0,
				        end : 100
				    },
	                xAxis: [
	                     {
				            type : 'category',
				            boundaryGap : true,

				            data : getNowTime
				        },
	                ],
	                yAxis: [
				        {
				            type : 'value',
				            scale: true,
				            name : 'Ip数',
				            boundaryGap: [0.2, 0.2]
				        },
				        {
				            type : 'value',
				            scale: true,
				            name : '评论数',
				            boundaryGap: [0.2, 0.2]
				        }
				    ],
	                grid: [{
	                    left: '100',
	                    top: '60',
	                    right: '100',
	                    bottom: 30
	                }],
	                series: [//系列列表。每个系列通过 type 决定自己的图表类型
		                {
		                    name: 'Ip数',
		                    type: 'bar',
		                    smooth: true,
		                    itemStyle: {
					            normal: {
					                color: 'rgb(210,160,220)'
					            }
					        },
		                    data: this.orderdata.ipdata//Ip数据
		                },
		                {
		                    name: '评论数',
		                    type: 'line',
		                    smooth: true,
		                    // areaStyle: {
		                    //     normal: {}
		                    // },
		                    lineStyle: {
		                        normal: {
		                            width: 3,
		                            color:'rgb(80,215,217)',
		                        }
		                    },
		                    data: this.orderdata.commentdata//评论数据
		                }
	                ]
			    });
			    
			  	//动态添加数据，可以通过Ajax获取数据然后填充
	            this.getTime();
		    },
		    // 图表接口数据
		    getechartData(){
		    	dashboardData().then(res =>{
		    		console.log(res);
		    		this.orderdata = res.data;//

		    	})
		    },
		    getTime(){
		    	setInterval( ()=>{
		    		// 时间表
		    		let nowDate = new Date().toLocaleTimeString().replace(/^\D*/, '')
	                this.orderdata.column.push(nowDate);
	                // ip和评论增加的随机数据
	                var amount = Math.floor(Math.random() * 200) + 20;
	                this.orderdata.ipdata.push(Math.floor(amount) + Math.random() * 1000)
	                this.orderdata.commentdata.push(Math.floor(amount) + Math.random() * 1000);

	                // //按自己需求可以取消这个限制
	                if (this.orderdata.column.length >= 10) {
	                    //移除最开始的一条数据
	                    this.orderdata.column.shift();
	                    this.orderdata.ipdata.shift();
	                    this.orderdata.commentdata.shift();
	                }
	                this.chart.setOption({
	                    xAxis: {
	                        data: this.orderdata.column
	                    },
	                    series: [//系列列表。每个系列通过 type 决定自己的图表类型
			                {
			                    name: 'Ip数',
			                    data: this.orderdata.ipdata,//Ip数据
			                },
			                {
			                    name: '评论数',
			                    data: this.orderdata.commentdata//评论数据
			                }
		                ]
	                });
	                window.onresize = this.chart.resize;
	            }, 2000);
		    }
	    },

	}
</script>
<style lang="less" scoped="">

</style>


