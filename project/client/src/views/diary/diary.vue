<template>
	<div>
        <Header></Header>
        <div class="diary-content-wrap">
       		<diary-content class="diary-content"></diary-content>
       	</div>
        <Footer></Footer>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import Footer from '@/components/Footer'
	import DiaryContent from '@/views/diary/diaryContent'
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
		  	DiaryContent
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  		
		  }
	}
</script>
<style lang="less" scoped>
.diary-content-wrap{
	width: 100%;
	height: 100%;
	background: url('../../img/images/diary.jpg') no-repeat;
	background-size: cover;
	background-position: center;
	.diary-content{
		width: 1200px;
		margin:0px auto;
		min-height: 1000px;
		// background-color: #fff;
		padding: 20px 50px;
		box-sizing: border-box;
		border-radius: 8px;
	}
}
</style>