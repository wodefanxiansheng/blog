<template>
	<div>
       <input type="" name="" placeholder="搜索你喜欢的...">
       <button class="searchBtn">搜索</button> 
    </div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		    	newTitle:""
		    }
		  },
		  components:{
		 
		  },
		  mounted(){
		  		
		  },
		  methods:{
		  		
		  }
	}
</script>
<style lang="less" scoped>
	input{
		width: 90%;
		height: 100%;
	    border: 0;
	    background: none;
	    font-size: 15px;
	    color: #fff;
	    border:1px solid #ffd100;
	    // border-radius: 6px;
	    border-top-left-radius: 6px;
	    border-bottom-left-radius: 6px;
	    padding: 10px;
	    box-sizing: border-box;
	    outline: none;
	}
	.searchBtn{
		width: 100px;
		height: 100%;
		background-color: #ffd100;
		color: #000;
		border-top-right-radius: 6px;
	    border-bottom-right-radius: 6px;
	    // font-weight: bold;
	    font-size: 16px;
	    border:none;
	    outline: none;
	}
</style>