<template>
	<div class="swiper-container swiper-container-vertical">
        <div class="swiper-wrapper">
            <div class="swiper-slide" >
            	<div class="swiper-wrap-one">
            		<div class="swiper-wrap-one-content">
						<p class="welcomeFan">欢迎来到凡先生的博客</p>
						<p>hello,I`m Mr.fan</p>
						<p>前端开发工程师</p>
						<p>邮箱：912244323@qq.com</p>
					</div>
					<div>
						<div class="landscape"></div>
						<div class="filter"></div>
						<canvas id="canvasone"></canvas>
					</div>
				</div>
            </div>
            <div class="swiper-slide swiper-wrap-two" >
            	<div class="swiper-slide-contents">
	            	<div class="swiper-slide-content" style="margin-top: 100px;">
	            		<div class="headsgroup">
	            			<img src="../../img/images/boy.jpg" class="head_portrait">
	            			<img src="../../img/images/girl.jpg" class="head_portrait">
	            		</div>
	            		<div class="my-intro">
	            			凡先生,男,来自河北邯郸,目前在杭州工作,本科,一名普通的前端工程狮,工作三年了,这个博客主要用来分享自己的技术和生活。喜欢前端的各种技术,一边工作一边学习,积累经验,相信自己会越来越好。
	            		</div>
	            	</div>
	            	<div class="swiper-slide-logo one-bg">
						<img src="../../img/images/sc5.png">
					</div>
				</div>
            </div>
            <div class="swiper-slide swiper-wrap-three">
            	<div class="swiper-slide-contents swiper-slide-contents-three">
            		<div class="swiper-slide-content swiper-slide-content-three">
            			<classification></classification>
            			<h3><img src="../../img/images/me-title.png"></h3>
            		</div>
	            	<div class="swiper-slide-logo" style="z-index: 9999999999;">
						<img src="../../img/images/sc3.png">
					</div>
				</div>
            </div>
            <div class="swiper-slide swiper-wrap-four">
            	<div class="swiper-slide-contents">
	            	<div class="swiper-slide-logo">
						<img src="../../img/images/sc2.png">
					</div>
				</div>
            </div>
        </div>
        <div class="btn-home">
        	<btn></btn>
        </div>
        <div  class="swiper-pagination">
        	
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
    </div>
</template>
<script>
	import Swiper from 'swiper'
	import {meone} from '@/assets/js/meOne.js'
	import classification from '@/components/classification'
	import btn from './btn'
	export default {
		  name: '',
		  data () {
		    return {
		    	
		    }
		  },
		  components:{
  			classification,
  			btn
		  },
		  mounted(){
		  	 meone();
		  	 let swiper = new Swiper('.swiper-container', {
				        direction: 'vertical',
				        slidesPerView: 1,
				        spaceBetween: 30,
				        mousewheel: true,
				        pagination: {
				          el: '.swiper-pagination',
				          clickable: true,
				        },
				    });
		  },
		  methods:{
		  	   
		  }
	}
</script>
<style lang="less" scoped>
/deep/.swiper-pagination-bullet-active{
	background-color: #ffd100 !important;
	opacity: 1 !important;
}
.swiper-container {
    width: 100%;
    height: 100%;
    .btn-home{
    	position: absolute;
    	top: 2%;
        left: 1%;
    	z-index: 999999999999999;
    }
	.swiper-wrap-one{
		width:100%;
		height:100%;
		background:black;
		background:linear-gradient(to bottom,#000000 0%,#5788fe 100%);
		.filter {
			width:100%;
			height:100%;
			position:absolute;
			top:0;
			left:0;
			background:#fe5757;
			animation:colorChange 30s ease-in-out infinite;
			animation-fill-mode:both;
			mix-blend-mode:overlay;
		}
		.landscape {
			position:absolute;
			bottom:0px;
			left:0;
			width:100%;
			height:100%;
			background-image:url('../../img/images/me-one.png');
			background-size:1000px 250px;
			background-repeat:repeat-x;
			background-position:center bottom;
		}
		.swiper-wrap-one-content{
			position: absolute;
			top: 0;bottom: 0;
			right: 0;left: 0;
			margin:auto;
			width:700px;
			height: 300px;
			border-radius:20px;
			color: #fff;
			line-height:3;
			box-shadow: 0px 0px 8px 6px rgba(100,100,100,0.5);
			.welcomeFan{
				font-size:30px;
			}
		}
	}
    .swiper-slide {
        text-align: center;
        font-size: 15px;
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        width: 100%;
	    height: 100%;
	    background-position:center;
	    background-size: cover;
	    background:url("../../img/images/s3.jpg");
	    position: relative;
	    .swiper-slide-contents-three{
	    	width: 100%;
		    .swiper-slide-content-three{
		    	width: 800px;
		    	display: flex;
		    	align-items: center;
		    	/deep/ul{
		    		width: 600px;
		    		display: flex;
		    		flex-direction: column;
		    	}

		    }
	    }
	    .swiper-slide-contents{
	    	.swiper-slide-logo{
	    		position: absolute;
	    		bottom: 5%;
	    		right: 5%;
	    	}
	    	.one-bg{
		    	animation: moves 10s ease-in-out infinite;
		    }
			    .swiper-slide-content{
			    	z-index: 999999;
				    .my-intro{
				    	margin-top: 20px;
				    	width: 600px;
				    	line-height:1.5;
				    	text-align: left;
				    	font-size:18px;
				    	text-indent:32px;
				    	background-color: #ffd100;
				    	padding: 20px 40px;
				    	border-radius:8px;
				    	box-sizing: border-box;
				    }
				    .headsgroup{
				    	width: 600px;
				    	display: flex;
				    	justify-content: space-between;
					    .head_portrait{
					    	width: 200px;
					    	height: 200px;
					    	border-radius:50%;
					    	object-fit: cover;
					    	transition: all 1s;
					    	&:hover{
					    		transform: rotate(360deg);
					    	}
					    }
					}
			    }
			    
		}
    }

    @keyframes moves{
    	0%{
    		right:5%;
    		transform: rotate(0);
    	}
    	30%{
    		right:30%;
    		transform: rotate(45deg);
    	}
    	60%{
    		right:60%;
    		transform: rotate(-45deg);
    	}
    	100%{
    		right:5%;
    		transform: rotate(0);
    	}
    }
    @keyframes colorChange {
		0%,100% {
			opacity:0;
		}
		50% {
			opacity:.9;
		}
	}
}
</style>