<template>
	<div>
		<transition>
			  <button :key="docState">
			    {{ buttonMessage }}
			  </button>
		</transition>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				docState:'saved'
			}
		},
		computed: {
		  buttonMessage: function () {
		    switch (this.docState) {
		      case 'saved': return '编辑'
		      case 'edited': return '保存'
		      case 'editing': return '取消'
		    }
		  }
		},
		methods:{

		}
	}
</script>
<style type="text/css">
	button{
		display: block;
		width:80px;
		height: 40px;
		text-align: center;
		border-radius: 4px;
		margin:20px auto;
	}
</style>