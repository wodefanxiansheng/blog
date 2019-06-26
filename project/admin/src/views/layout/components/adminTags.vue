<template>
	<!-- 面包屑导航 -->
	<div class="tags-wrap" ref="tagContent" id="tagContent">
		<router-link class="tab-view" to="/home">
	       <el-tag size="small" :type="$route.path === '/home'?'success':'info'">首页</el-tag>
	    </router-link>
		<router-link class="tab-view" :to="tag.path" v-for="tag in $store.getters.tagViews_g" :key="tag.name">
	        <el-tag size="small" closable :type="tag.path === $route.path?'success':'info'" @close="closeTagView(tag, $event)">
	            {{tag.name}}
	        </el-tag>
	    </router-link>
	    <div class="el-tag-down" @click="tagmoreShow" v-if="$store.getters.tagViews_g.length >= 8">
	    	<i class="el-icon-more-outline"></i>
	    </div> 
	</div>
</template>
<script>
	export default {
		data(){
			return {
				 width:'',
				 autoBool:true,
			}
		},
		mounted(){
			
		},
		methods:{
            closeTagView (tag, e) {
            	this.$store.dispatch('side/delTagView', tag);
            	e.preventDefault();
            },
            // generateRoute () {
            // 	console.log(this.$route)
            //     if (this.$route.matched[this.$route.matched.length - 1].name) {
            //         return this.$route.matched[this.$route.matched.length - 1];
            //     }
            //     return this.$route.matched[0]
            // },
            addTagView () {
            	if(this.$route.path === '/home')return;
                this.$store.dispatch('side/addTagView', this.$route);
            },
            tagmoreShow(){
            	// 更改两个属性，一个是overflow:hidden,一个是height改为min-height
            	if(this.$store.getters.tagViews_g.length >= 8){
            		if(this.autoBool){
	            		this.$refs.tagContent.style.height = 'auto';
	            		this.autoBool = false;
	            	}else{
	            		this.$refs.tagContent.style.height = 50 + 'px';
	            		this.autoBool = true;
	            	}

            	}
            	

            }
		},
		watch:{
			$route () {
                this.addTagView();
            }
		}
	}
</script>
<style scoped lang="less">
	.tags-wrap {
	    height: 50px;
	    width: @wd100;
	    background: @light-bg;
	    border-bottom: 1px solid @borderBottom;
	    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	    line-height: 50px;
	    padding-left: 20px;
	    padding-right: 32px;
	    overflow: hidden;
	    position: relative;
	    .tab-view{
			margin-right: 20px;
	    }
	}
	.el-tag--success{
		background-color: rgba(55,198,192,.8);
    	border-color: rgba(55,198,192,.1);
    	color: #ffffff;
    	/deep/& .el-tag__close{
    		color: #ffffff;
    	}
	}
	.el-tag-down{
		position: absolute;
		right: 0px;
		top: 0px;
		padding: 0 20px;
		background-color: #dddddd;
		cursor: pointer;
	}
</style>