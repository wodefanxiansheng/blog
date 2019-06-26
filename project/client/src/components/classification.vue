<template>
	<div>
        <ul class="fenlei-list">
        	<li :class="['pointer',{'fenlei_active':item.fenleiId == fenleiId}]" v-for="item in fenleiArr" @click="fenleiClick(item.fenleiId)">{{item.fenleiName}}</li>
        </ul>
    </div>
</template>
<script>
	import VueEvent from '../assets/js/VueEvent.js'
	import {StorageFn} from '../assets/js/storage.js'
	export default {
		  name: '',
		  data () {
		    return {
		    	fenleiArr:[],
		    	fenleiId:"0",
		    	nowId:""
		    }
		  },
		  components:{
		  	
		  },
		  mounted(){
		  		this.locals = new StorageFn();//获取存储
		  		this.fenleiList();
		  },
		  methods:{
		  		fenleiList:function () {
		  			this.$http.get('articles/fenleis').then( res => {
		  				// console.log(res)
		  				this.fenleiArr = res.data.result.list;
		  			})
		  		},
		  		fenleiClick:function (fenleiId) {

			  			this.fenleiId = fenleiId;
			  			VueEvent.$emit('content',fenleiId)
			  		
		  		}
		  }
	}
</script>
<style lang="less" scoped>
	.fenlei-list{
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		li{
			padding: 10px 20px;
			background-color: #eee;
			margin-right: 20px !important;
			border-radius: 4px;
			margin:5px 0;
			transition: all .5s;
			&:hover{
				background-color: #ffd100;
			}
		}
		.fenlei_active{
			background-color: #ffd100;
		}
	}
			
</style>