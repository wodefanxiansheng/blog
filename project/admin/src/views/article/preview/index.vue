<template>
	<div class="">
		<h1 class="title">{{blogContent.title}}</h1>
		<div v-html="blogContent.html" class="markdown-body">
			
		</div>
	</div>
</template>
<script>
	import "mavon-editor/dist/css/index.css"
	import {blogDetail} from '@/api/blog'
	export default{
		data(){
			return{
				titleDocument:'',
				blogContent:''
			}
		},
		mounted(){
			this.getBlogDetail();
		},
		methods:{
			getBlogDetail(){
				let _id = this.$route.params.id;
				blogDetail({_id:_id}).then(res =>{
					this.blogContent = res.data.result;
				})
			}
		},
		watch: {
	        blogContent() {
	            document.title = this.blogContent.title;
	        }
	    }
	}
</script>
<style lang="less" scoped>
	.title{
		text-align: center;
		margin:30px 0;
	}
	.markdown-body img{
		display: block;
		text-align: center;
	}
</style>