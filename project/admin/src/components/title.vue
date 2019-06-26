<template>
	<div>
		<h2>{{text}}</h2>
	</div>
</template>
<script>
    export default {
    	props:['text']
    }
</script>
<style lang="less" scoped>
	h2{
		text-align: center;
		font-size: 20px;
		margin:20px 0 35px;
	}
</style>