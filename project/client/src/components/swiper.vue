<template>
    <div class="swiper-container">
    	<div class="swiper-wrapper">
	         <div class="swiper-slide"></div>
         </div>
         <Search class="search-input"></Search>
	</div>
</template>
<script>
	import Swiper from 'swiper'
	import Search from './search'
	export default {
		  name: '',
		  data () {
		    return {
		    	
		    }
		  },
		  components:{
		  	Search
		  },
		  mounted(){
		  		this.swiperPlay();
		  },
		  methods:{
		  		swiperPlay:function () {
		  			var mySwiper = new Swiper ('.swiper-container', {
				        autoplay:1,//自动滚动
				        observer:true,
				        observeParents:true,
				        loop:true,//循环
				        speed:5000,//滚动速度
				        autoplay:true,
				        slidesPerView : 1,//slide可见数量
				        spaceBetween : 0//slide之间的距离（单位px）
				    })
		  		}
		  }
	}
</script>
<style lang="less" scoped>
	@import url("../assets/css/swiper.min.css"); 
	.swiper-container{
		width: 100%;
        height: 300px;
        position: relative;
        .swiper-wrapper{
        	transition-timing-function: linear;
        	.swiper-slide{
				width: 100%;
				height: 344px;
				background:url('../img/images/bg.jpg') no-repeat;
				background-position: center;
				background-size: cover;
			}
        }
        .search-input{
        	width: 520px;
	    	height: 40px;
        	position: absolute;
        	z-index: 99999999999;
      		top:0;left:0;bottom: 0;right:0;margin:auto;
      		display: flex;
      		justify-content: space-around;
        }
	}
</style>