<template>
    <div class="login-container">
		<div class="login-form">

			<div class="form-title">
				<h3 class="title">博客后台管理平台</h3>
				<svg-icon icon-class="normal" class="normal-d"/>
			</div>
			<el-form  class="demo-ruleForm" :model="loginForm" :rules="rules" ref="loginForm" auto-complete="on" label-position="left" label-width="60px">
				<el-form-item  prop="username" >
					<span class="svg-logo">账号</span>
					<el-input type="text"  autocomplete="on" v-model="loginForm.username" name="username"></el-input>
				</el-form-item>
				<el-form-item  prop="password" >
					<span class="svg-logo">密码</span>
					<el-input :type="passwordType"  autocomplete="on" v-model="loginForm.password" name="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
					<i class="el-icon-view" @click="showPass"></i>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" @click.native.prevent="submitForm('loginForm')">立即登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data(){
	  const checkUser = (rule, value, callback) =>{
		if (!value) {
            return callback(new Error('用户名不能为空'));
        }else{
			callback();
		}
	  };
	  const checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6) {
             return callback(new Error('密码不能小于六位数'));
          }
          callback();
        }
      };
	  return{
	  		redirect:null,//重定向
		   loginForm: {
				username: 'admin',
				password: '123456'
			},
			rules: {
				username:[{validator: checkUser,required: true,trigger: 'blur'}],
				password:[{ validator: checkPass,required: true,trigger: 'blur'}]
			},
			passwordType:'password'
	  }
  },
  methods: {
	/*登录*/
	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
			if (valid) {
				// 执行vuex，user.js里面的action（login事件）
				this.$store.dispatch('LoginByUsername',this.loginForm).then(res =>{
					// this.$router.push('/home')
					this.$router.push({ path: this.redirect || '/home' })
				})
				
			} else {
				console.log('error submit!!');
				return false;
			}
        });
	},
	/*密码显示与隐藏*/
	showPass:function(){
		if (this.passwordType === 'password') {
			this.passwordType = ''
		} else {
			this.passwordType = 'password'
		}
	}
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
        console.log(route,this.redirect)
      },
      immediate: true
    }
  },

}
</script>

<style lang="less" scoped>
 	.login-container{
 		width:100%;
		height:100%;
		position: fixed;
		background-color:@dark-bg;
		background-image: url('../../assets/img/bg.png');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		.login-form{
			position: absolute;
			left: 0;
			right: 0;
			width: 520px;
			max-width: 100%;
			padding: 35px 35px 15px 35px;
			margin: 120px auto;
			.form-title{
				font-size: 26px;
				color: #eee;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
				position: relative;
				z-index: 9999999;
				.normal-d{
					position: absolute;
					top: -90px;
					left:180px;;
					font-size: 100px;
				}
			}
			/deep/.el-form-item__content{
				margin-left:0 !important;
				border-radius: 5px;
				background: @dark-bg;
				display:flex;
				.el-icon-view{
					line-height: 45px;
					padding-right: 9px;
					cursor: pointer;
				}
			}
			.el-button--primary{
				width:100%;
				border:none;
				outline: none;
				&:hover{
					background-color: #66b1ff;
				}
			}
			/deep/.el-input__inner{
				width:100%;
				height: 45px !important;
				border:none;
				background: @dark-bg;
				color:@word;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px @dark-bg inset !important;
					-webkit-text-fill-color: @word !important;
				}
			}
			.svg-logo{
				width:15%;
				text-align: center;
				line-height: 45px;
				color: #a1a0a0;
			}
			
		}
	 }

</style>