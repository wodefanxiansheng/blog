<template>
	<div>
        <Header></Header>
        <div class="layer content-boke">
        	<classification class="classification"></classification>
            <Content class="homeContent"></Content>
		</div>
		<h5 style="text-align: center;font-size: 20px;">vuex测试</h5>
		<div class="vuex-test">
			<!-- state:{{$store.state.todos,$store.getters.getToDo}} -->
			<ul v-for="item in todos">
				<li>{{item.id}}.{{item.text}}{{errortip}}</li>
			</ul>
			{{getToDo}}
			<button @click="numGet">计算</button>
		</div>
        <Footer></Footer>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import Footer from '@/components/Footer'
	import Classification from '@/components/classification'
	import Content from '../home/homeComponents/content'
	import Swiper from '@/components/Swiper'
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		  name: '',
		  data () {
		    return {
		    	
		    }
		  },
		  computed:{
		  	...mapState(['todos','errortip']),
		  	...mapGetters(['getToDo'])
		  },
		  components:{
		  	Header,
		  	Footer,
		  	Content,
		  	Swiper,
		  	Classification
		  },
		  methods:{
		  	...mapMutations(['numGet'])
		  }
	}
</script>
<style lang="less" scoped>
	.content-boke{
		width: 1200px;
		margin:0 auto;
		min-height: 857px;
		background-color: #f1f1f1 !important;
			.homeContent{
				width: 100%;
				.pagination{
					display: block;
				}
			}
			.classification{
				background-color: #fff;
				margin-top: 20px;
				border-radius: 4px;
			}
	}
	.vuex-test{
		margin:40px 200px;
		min-height: 600px;
	}		
</style>