<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
		html,body,.ivu-layout{
			background-color: rgb(241,241,241);
		}
</style>
