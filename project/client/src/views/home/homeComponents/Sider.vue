<template>
	<div class="slide">
	    <introduction class="introduction-me"></introduction>
	    <hotwork class="hot-wrap"></hotwork>
	    <hotComments class="hotComments"></hotComments>
    </div>
</template>
<script>
	import Introduction from './introduction'
	import hotwork from './hotwork'
	import hotComments from './hotComments'
	export default {
		  name: '',
		  data () {
		    return {
		     	
		    }
		  },
		  components:{
		  	Introduction,
		  	hotwork,
		  	hotComments
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  		
		  }
	}
</script>
<style lang="less" scoped>
	.introduction-me,.hot-wrap{
		border-radius: 4px;
		width: 100%;
		min-height: 195px;
		background-color: #fff;
	}
	.hot-wrap{
		margin-top: 20px;
	}
	.hotComments{
		margin-top: 20px;
		background-color: #fff;
		border-radius: 4px;
		padding: 20px;
		box-sizing: border-box;
	}
</style>