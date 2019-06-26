<template>
	<div class="nav-wrap flex-h flex-be flex-vc">
    <div class="flex-h">
  		<svg-icon icon-class="open" class="open-close" :class="{'is-active':isCollapse}" @click="toggleClick"/>
  		<adminLevel></adminLevel>
    </div>
    <admin-user class="admin-user"></admin-user>
	</div>
</template>
<script>
import adminUser from './adminUser'
import adminLevel from './adminLevel'
import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'; //先要引入
export default {
  name: '',
  data(){
  	return {

  	}
  },
  components:{
    adminUser,
    adminLevel
  },
  methods:{
  	// ...mapMutations('side',['SET_TEXT','SET_TEXT_T']),
  	...mapActions('side',['toggleSideBar']),
  	toggleClick(){
  		// this.$store.dispatch('side/toggleSideBar')//执行异步操作
  		this.toggleSideBar();
  	},
  },
  computed:{
  	 ...mapState('side',{
  	 		isCollapse:state => state.isCollapse
  	 	}),
    path() {
      // console.log(this.$route)
      return this.$route.name;
    }
  },
}
</script>
<style scoped lang="less">
	.nav-wrap{
		padding: 15px 0;
		background-color: @light-bg;
    position: relative;
    border-bottom: 1px solid #eeeeee;
		.open-close{
			font-size: 20px;
			margin-left: 20px;
		}
		.is-active {
		  transform: rotate(180deg);
		}
    .admin-user{
      position: absolute;
      right: 30px;
      top: 10px;
    }
	}
</style>