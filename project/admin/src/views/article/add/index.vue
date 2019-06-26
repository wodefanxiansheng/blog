<template>
	<div>
		<title-m :text="text"></title-m>
		<blog-content :isEdit = isEdit></blog-content>
	</div>
</template>
<script>
	import blogContent from '../components/blogContent'
	export default {
		components:{
			blogContent,
		},
		data(){
			return {
				text:'添加博客文章',
				isEdit:false
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

</style>