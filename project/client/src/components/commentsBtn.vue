<template>
	<div class="comments-btn" @click="returnTop" v-if="topShow">
		返回顶部
	</div>
</template>
<script>
	export default {
		  name: '',
		  data () {
		    return {
		    	topShow:false,
		    }
		  },
		   mounted(){
            let _this = this;
            window.addEventListener('scroll',_this.handleScroll,true);
	        },
	        methods:{
	            handleScroll(){
	                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	                // console.log(scrollTop)
	                if(scrollTop >= 1000){
	                    this.topShow = true;
	                }else{
	                    this.topShow = false;
	                }
	            },
	            returnTop:function () {
	                 document.documentElement.scrollTop = document.body.scrollTop = 0;
	                 console.log("88888")
	            }
	        }
	}
</script>
<style lang="less" scoped>
	.comments-btn{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #27ad9a;
		font-weight: bold;
		position: fixed;
		right: 5%;
		bottom: 15%;
		cursor: pointer;
	}

</style>













































































