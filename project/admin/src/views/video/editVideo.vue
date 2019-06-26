<template>
	<div>
		<title-m :text="text"></title-m>
		<!-- <blog-content :isEdit = isEdit></blog-content> -->
		<video-content :isEdit = isEdit></video-content>
	</div>
</template>
<script>
	import videoContent from './components/videoContent'
	export default {
		components:{
			videoContent,
		},
		data(){
			return {
				text:'编辑视频',
				isEdit:true
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