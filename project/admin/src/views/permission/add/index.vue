<template>
	<div>
		<title-m :text="text"></title-m>
		<div class="form-box-add">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" labelPosition="left">
				  <el-form-item label="名字" prop="name">
				     <el-input type="text" v-model="ruleForm.name" placeholder="请输入名字"></el-input>
				  </el-form-item>
				  <el-form-item label="用户名" prop="username">
				     <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				     <el-input type="password" v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
				  </el-form-item>
				  <el-form-item label="管理员权限" prop="resource">
				    <el-radio-group v-model="ruleForm.resource">
				      <el-radio label="admin">超级管理员</el-radio>
				      <el-radio label="general">普通管理员</el-radio>
				      <el-radio label="visitor">访客</el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item class="zhushi">
				  	 <p>注释：</p>
				  	 <ol>
				  	 	<li>超级管理员：拥有admin的所有权限</li>
				  	 	<li>普通管理员：拥有除了权限管理的所有权限</li>
				  	 	<li>访客：拥有首页和文章的权限</li>
				  	 </ol>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">立即创建</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				text:'添加管理员',
				loading:false,
				ruleForm:{
					name: '',//名字
					username:'',//用户登录名
					password:'',//密码
		          	resource: '',//权限
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入名字', trigger: 'blur' },
		            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
		          ],
		          username: [
		            { required: true, message: '请输入用户名', trigger: 'blur' },
		            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
		          ],
		          password: [
		            { required: true, message: '请输入密码', trigger: 'blur' },
		            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
		          ],
		          resource: [
		            { required: true, message: '请选择管理员权限', trigger: 'change' }
		          ],
		        },
			}
		},
		methods: {
	      submitForm(formName) {
	      	this.loading = true;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            console.log(this.ruleForm)
	            this.$store.dispatch('AddUserlist',this.ruleForm).then(res =>{
	            	this.loading = false;
	            	this.$router.push('/permission/list')
	            })
	          } else {
	            console.log('error submit!!');
	            this.loading = false;
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      }
	    }
	}
</script>
<style lang="less" scoped="">
	.form-box-add{
		text-align: left;
		width:800px;
		margin: 0 auto;
		.zhushi{
			color: #a8a8a8;
		}
	}
</style>