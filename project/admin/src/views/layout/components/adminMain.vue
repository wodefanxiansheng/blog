<template>
	<div class="main-wrap">
		<!-- 我是内容 -->
    <keep-alive>
    		<router-view :key="key" />
    	</keep-alive>
    </transition>
	</div>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
}
</script>
<style scoped lang="less">
	.main-wrap{
		min-height: calc(100vh - 101px);
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    padding: 30px;
	}
</style>