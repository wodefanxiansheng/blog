<template>
	<div>
		<el-dialog 
		    title="添加分类" 
		    :visible.sync="dialogFormVisible" 
		    @close="close_box"
		    center>
			  <el-form :model="form"  ref="form" label-position="left":rules="rules" >
			    <el-form-item label="分类名称" prop="name" label-width="100px">
			      <el-input v-model="form.name" autocomplete="off" placeholder="请输入分类名称"></el-input>
			    </el-form-item>
				<el-form-item label="状态" prop="type" label-width="100px">
				    <el-switch
					  v-model="form.type"
					  active-text="开启"
					  inactive-text="禁用">
					</el-switch>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancelShow()">取 消</el-button>
			    <el-button type="primary" @click="submitForm('form')" :loading="loading">确 定</el-button>
			  </div>
		</el-dialog>
	</div>
</template>
<script>
	import {addFenlei} from '@/api/blog'
	export default{
		data(){
			return {
				loading:false,
				form: {
		          name: '',
		          type:true
		        },
		        dialogFormVisible:true,
		        rules: {
						name:[
							{ required: true, message: '请输入分类名称', trigger: 'blur' },
						],
						type: [
							{ required: true, message: '请点击是否开启', trigger: 'blur' },
						],
				},
			}
		},
		 methods: {
	      close_box(){
	      	  //通过$emit引用父组件传过来的close()事件
	      	  this.$emit('close')
	      },
	      submitForm(formName) {
	      	this.loading = true;
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            addFenlei(this.form).then(res =>{
	            	this.loading = false;
	            	this.close_box();
	            })
	          } else {
	            this.loading = false;
	            return false;
	          }
	        });
	      },
	      cancelShow(){
	      	this.close_box();
	      }
	    }
	}
</script>