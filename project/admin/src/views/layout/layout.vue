<template>
	<!-- 左侧导航栏收缩 -->
	<div class="admin-commen-wrapper" :class="{hideSidebar:$store.getters.isCollapse_g}">
        <admin-side class="slidebar-container"></admin-side>
        <div class="main-container">
            <admin-nav></admin-nav>
            <admin-tags></admin-tags>
            <admin-main></admin-main>
        </div>
	</div>
</template>
<script>
import { adminSide, adminNav, adminTags, adminMain } from './components/index'
export default{
	name:'layout',
	components:{
		adminSide,
		adminNav,
		adminTags,
		adminMain
	}
}
</script>
<style scoped lang="less">
	.admin-commen-wrapper{
		position: relative;
		width: 100%;
		height: 100%;
		&.hideSidebar{
			.slidebar-container{
				width:50px !important;
			}
			.main-container{
				margin-left:50px !important;
			}
		}
		.slidebar-container{
			width:210px !important;
			height: 100%;
			background-color: #304156;
			position: fixed;
			top: 0;
			left: 0;
			bottom:0;
			z-index: 1001;
			overflow: hidden;
			transition: width .28s;
		}
		.main-container{
			min-height: 100%;
		    margin-left: 210px;
		    position: relative;
		    -webkit-transition: margin-left .28s;
		    transition: margin-left .28s;
		}
	}
</style>