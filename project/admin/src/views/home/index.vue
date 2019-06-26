<template>
	<div class="home-wrap">
		<panel-group></panel-group>
		<el-row>
			<el-col class="echart-line" :xs="24"  :sm="24" :lg="18">
				<echart-line></echart-line>
			</el-col>
			<el-col :xs="24"  :sm="24" :lg="6" class="intro">
				<div class="today-list">
					<div class="today-list-top">
						<div class="logo-l"> 
							<svg-icon icon-class="peoples" class="passIcon"/>
						</div>
						<div class="title-l">
							<countTo :startVal='0' :endVal='152368' :duration='1000' class="bg-purple-number title-l-number"></countTo>
							<p class="title-l-text">今日Ip数</p>
						</div>
					</div>
					<div class="today-list-bot">
						<el-progress :percentage="2" ></el-progress>
					</div>
				</div>
				<div class="today-list">
					<div class="today-list-top">
						<div class="logo-l">
							<svg-icon icon-class="people" class="passIcon"/>
						</div>
						<div class="title-l">
							<countTo :startVal='0' :endVal='5241869' :duration='1000' class="bg-purple-number title-l-number"></countTo>
							<p class="title-l-text">今日访问量</p>
						</div>
					</div>
					<div class="today-list-bot">
						<el-progress :percentage="20"></el-progress>
					</div>
				</div>
				<div class="today-list">
					<div class="today-list-top">
						<div class="logo-l">
							<svg-icon icon-class="message" class="passIcon"/>
						</div>
						<div class="title-l">
							<countTo :startVal='0' :endVal='52' :duration='1000' class="bg-purple-number title-l-number"></countTo>
							<p class="title-l-text">今日评论数数</p>
						</div>
					</div>
					<div class="today-list-bot">
						<el-progress :percentage="50"></el-progress>
					</div>
				</div>
				<div class="today-list">
					<div class="today-list-top">
						<div class="logo-l">
							<svg-icon icon-class="article_g" class="passIcon"/>
						</div>
						<div class="title-l">
							<countTo :startVal='0' :endVal='2' :duration='1000' class="bg-purple-number title-l-number"></countTo>
							<p class="title-l-text">今日博客数</p>
						</div>
					</div>
					<div class="today-list-bot">
						<el-progress :percentage="66"></el-progress>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import panelGroup from './components/panelGroup' 
	import echartLine from './components/echartLine'
	import countTo from 'vue-count-to';
	export default {
		components:{
			panelGroup,
			echartLine,
			countTo
		},
		data(){
			return {
				
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
    
    @property:color;
	.home-wrap{
		.echart-line{
			// width: 100%;
			height: 500px;
			background-@{property}: #ffffff;
		}
		.intro{
			 @media (max-width: 1200px) {
			 	margin-top: 30px;
			      margin-left: 70px;
			 }
			.today-list{

				margin-bottom: 60px;
				margin-right: 40px;
				
				.today-list-top{
					display: flex;
					& .passIcon{
						fill:rgb(27,210,174);
						font-size: 50px;
					}
					.title-l{
						margin-left: 20px;
						font-size: 18px;
						line-height: 30px;
						.title-l-number{
							font-weight: bold;
						}
						.title-l-text{
							font-size: 12px;
							color: rgb(150,150,150);
						}
					}
				}
			}
		}
	}
	/deep/.el-progress-bar__inner{
		background-color: rgb(27,210,174) !important;
	}
</style>