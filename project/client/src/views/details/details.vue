<template>
	<div class="">
        <Header></Header>
        <div class="bg-de"></div>
      	<details-content></details-content>
      	<comments class="comments"></comments>
        <Footer></Footer>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import Footer from '@/components/Footer'
	import comments from '@/components/comments'
	import DetailsContent from '@/views/details/detailsContent'
	export default {
		  name: '',
		  data () {
		    return {
		    	
		    }
		  },
		  components:{
		  	Header,
		  	Footer,
		  	DetailsContent,
		  	comments
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  		
		  }
	}
</script>
<style lang="less" scoped>
	.bg-de{
		width: 100%;
		min-width: 1200px;
		height: 360px;
		background:url('../../img/images/pexels.jpeg') no-repeat;
		background-position: center;
		background-size: cover;
		z-index: 0;
		background-attachment: fixed;
	}
	.comments{
		width: 1200px;
		background-color: #fff;
		margin:0 auto;
		border-radius: 4px;
		margin-bottom: 50px;
		min-height: 200px;
		padding: 30px 100px;
		box-sizing: border-box;
	}
			
</style>