<template>
	<div class="error-tip" v-show="errortip">{{errortipContent}}</div> 
</template>
<script type="text/javascript">
	export default {
		data(){
			return{

			}
		},
		 computed: {
		    errortip() {
		      return this.$store.state.errortip;
		    },
		    errortipContent() {
		      return this.$store.state.errortipContent;
		    },
		  },
		mounted(){
			// console.log(this.errortip,this.errortipContent)
			
		},
		methods:{
			
		}
	}
</script>
<style lang="less" scoped>
	.error-tip{
		padding: 20px 50px;
		background-color: yellow;
		position: fixed;
		top: 7%;
		right: 5%;
	    border-radius: 4px;
	    background: rgb(220,220,220);
	    line-height: 1;
	    animation:fadeRight 1s 1;
	    color: #f50;
	    font-size:20px;
	    z-index: 9999999999999999;
	}
@keyframes fadeRight{
	0%{
		right:0%;
		transform: rotate(5deg);
	}
	50%{
		right:15%;
		transform: rotate(10deg);
	}
	100%{
		right:5%;
		transform: rotate(35deg);

	}
}
</style>