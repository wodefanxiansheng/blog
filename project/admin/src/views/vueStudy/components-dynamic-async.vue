<template>
 	<div class="dynamic-wrap">
 		<h3 class = "title-vue">动态组件和keep-alive的使用</h3>
 		<div class="tip">在动态组件上使用 keep-alive,我们更希望那些标签的组件实例能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个keep-alive元素将其动态组件包裹起来。例如：你在切换到评论时，是表单，可以输入一些内容，多切换几次，你会发现输入的内容依然存在，如果不加这个keep-alive标签，则不存在</div>
 		<div class="vue-test-content">
		    <div class="tabs flex-h">
		        <div class="tab" v-for="item in tabArr" :class="['pointer',{'active': currentName === item.vueName}]" @click="toggleTab(item.vueName)">{{item.name}}</div>
		    </div>
		    <!-- is 特性动态绑定子组件 -->
		    <transition name="fade" mode="out-in" appear>
			    <keep-alive>
			         <component :is="currentName" class="current-content"></component>
			    </keep-alive>
		    </transition>
 		</div>
 	</div>
</template>

<script>
import prince from './components/prince'
import rose from './components/rose'
import fox from './components/fox'
export default {
  	name: '',
  	data(){
  		return{
  			tabArr:[
  				{name:'热门作品',id:'100',vueName:'fox'},
  				{name:'人气设计师',id:'101',vueName:'prince'},
  				{name:'评论',id:'102',vueName:'rose'},
  			],
  			currentName: 'fox'
  		}
  	},
  	components: {
	    prince,
	    rose,
	    fox
	},
  	methods:{
  		toggleTab (name) {
	    	this.currentName = name
	    }
	}
  	
}



</script>

<style lang="less" scoped>
 	.dynamic-wrap{
		.title-vue{
			font-size: 16px;
			text-align: center;
			margin:20px 0 30px;
		}
		.tip{
			padding:20px 40px;
			line-height: 30px;
			color: #000000;
			font-size: 16px;
			background-color: rgb(255,251,229);
		}
		.vue-test-content{
			min-height: 800px;
			overflow:auto;
			background-color: #f8f8f8;
			.tab{
				font-size: 15px;
				margin:4px 30px;
				font-weight: bold;
				color: #999;
				padding-top: 12px;
				padding-bottom: 12px;
			}
			.current-content{
				min-height: 400px;
				background-color: #ffffff;
				padding: 20px;
				box-sizing: border-box;
			}
			.active{
				border-bottom:3px solid #000000;
				color: #000000;
			}
		}
 	}
 	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}

</style>