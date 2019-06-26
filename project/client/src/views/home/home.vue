<template>
	<div>
        <Header></Header>
        <Swiper ></Swiper>
        <div class="layer content-boke">
            <Content class="homeContent" :newTitle="newTitle"></Content>
            <Sider class="homeSider"></Sider> 
		</div>
        <Footer></Footer>
        <return-top></return-top>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import Footer from '@/components/Footer'
	import Content from './homeComponents/content'
	import Sider from './homeComponents/Sider'
	import Swiper from '@/components/Swiper'
	
	export default {
		  name: '',
		  data () {
		    return {
		    	newTitle:"最新文章"
		    }
		  },
		  components:{
		  	Header,
		  	Footer,
		  	Content,
		  	Sider,
		  	Swiper,
		  	
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  		
		  }
	}
</script>
<style lang="less" scoped>
	.content-boke{
		width: 1200px;
		margin:0 auto;
		background-color: #f1f1f1 !important;
		display: flex;
		justify-content: space-between;
			.homeContent{
				width: 810px;
				 & /deep/ .pagination{ //第一种写法
				    display: none;
				  }
				  & /deep/ .content-word{
				  	width: 520px !important;
				  }
			}
			.homeSider{
				width:360px;
				margin-top: 60px;
			}

	}
</style>