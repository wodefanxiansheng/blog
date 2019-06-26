<template>
	<div>
	<el-dialog
	  title="管理员编辑"
	  :visible.sync="dialogVisible"
	  width="50%"
	  @close="close_s"
	  class="edit-wrapper">
	  <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" labelPosition="left">
		  <el-form-item label="名字" prop="name">
		     <el-input type="text" v-model="userInfo.name" placeholder="请输入名字"></el-input>
		  </el-form-item>
		  <el-form-item label="用户名" prop="username">
		     <el-input type="text" v-model="userInfo.username" placeholder="请输入用户名"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="password">
		     <el-input type="password" v-model="userInfo.password" show-password placeholder="请输入密码"></el-input>
		  </el-form-item>
		  <el-form-item label="管理员权限" prop="resource">
		    <el-radio-group v-model="userInfo.roles[0]">
			      <el-radio label="admin">超级管理员</el-radio>
			      <el-radio label="general">普通管理员</el-radio>
			      <el-radio label="visitor">游客</el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确定</el-button>
		  </el-form-item>
	  </el-form>
	</el-dialog>
	
	</div>
</template>
<script>
   export default {
   		props:['userInfo'],
	    data() {
	      return {
	        dialogVisible: true,
	        loading:false,
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
	          // resource: [
	          //   { required: true, message: '请选择管理员权限', trigger: 'change' }
	          // ],
	        },
	      };
	    },
	    methods: {
	      close_s(){
	      	  //通过$emit引用父组件传过来的close()事件
	      	  this.$emit('close')
	      },
	      submitForm(formName) {
	      	this.loading = true;
	      	this.close_s();
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.$store.dispatch('EditUser',this.userInfo).then(res =>{
	            	this.loading = false;
	            })
	          } else {
	            this.loading = false;
	            return false;
	          }
	        });
	      }
	    }
    };
</script>


<style lang="less" scoped>
	.edit-wrapper{
		text-align: center;
	}
	/deep/.el-dialog{
		padding: 50px;
	}
	/deep/.el-form-item__content{
		margin-left: 0 !important;
	}
</style>