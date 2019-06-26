<template>
	<div>
		<div class="add-articles">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" labelPosition="left">
				  <el-form-item class="submit-button">
				    <el-button type="success" @click="submitForm('ruleForm')">发布</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				  <el-form-item label="博客类型" prop="type">
				      <el-select v-model="ruleForm.type" multiple clearable  placeholder="请选择博客类型" class="blogs">
					      <el-option  v-for="item in articleTypes" :key="item.name" :label="item.name" :value="item.name"></el-option>
					   </el-select>
				  </el-form-item>
				  <el-form-item label="文章标题" prop="title" class="blogs">
				     <el-input type="text" v-model="ruleForm.title" placeholder="请输入用户名"></el-input>
				  </el-form-item>
				  <el-form-item label="重要性" prop="impNuber" class="blogs">
					  <el-rate v-model="ruleForm.impNuber"></el-rate>
				  </el-form-item>
				  <el-form-item label="发布时间" prop="time" class="blogs">
					 <el-date-picker
				      v-model="ruleForm.time"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				  </el-form-item>
				<el-form-item prop="src" label="上传封面" class="uploadCoverW">
					<el-upload
						ref="upload"
						drag
						action="https://jsonplaceholder.typicode.com/posts/"
						accept="image/jpeg,image/png"
						:on-change="onUploadChange"
						:auto-upload="false"
						:show-file-list="false"
						v-model="ruleForm.src"
						class="showImg"
						>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过2M</div>
					</el-upload>
					<div class="show-cover showImg">
						<img :src="ruleForm.src" alt="">
					</div>
				</el-form-item>
				<div class="switch-box" @change="changeRadio">
				    <el-radio v-model="textRadio" label="1" border >Markdown编辑器</el-radio>
				    <el-radio v-model="textRadio" label="2" border >富文本编辑器</el-radio>
				</div>
			    <!-- 富文本和markdown切换 -->
			    <el-form-item  prop="contentEditor" class="editor-markdown" v-if="textRadio == 2">
              			<Tinymce  ref="editor" v-model="ruleForm.contentEditor" :height="400" />
        	 	</el-form-item>
				<el-form-item  prop="contentMark" class="editor-markdown" v-else="textRadio == 1">
						<mavon-editor  
						v-model="ruleForm.contentMark" 
						:ishljs="true" 
						class="editor-markdown"
						ref=md @imgAdd="$imgAdd"
						@change="changeData"
						/>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import Tinymce from '@/components/Tinymce'
	import { addBlog , uploadImages , blogDetail ,updateBlog} from '@/api/blog'
	import { mapGetters } from 'vuex'
	export default {
		components:{
			Tinymce,
		},
		props:{
			isEdit:{
				default:false,
				type:Boolean
			}
		},
		data(){
			return {
				img_file: {},
				text:'添加博客文章',
				loading:false,
				textRadio:'1',//切换富文本和markdown
				ruleForm:{
					type: [],//名字
					title:'',//标题
					impNuber: 5,
					time:null,
					html:'',//后台转义过来的内容
					contentEditor:'',//富文本内容
					contentMark:'',//markdown内容
					src:'',
			    },
			    _id:null,
			    htmlArticle:'',
				rules: {
						type:[
							{ required: true, message: '请选择至少选择一个文章类型', trigger: 'blur',type:'array' },
						],
						title: [
							{ required: true, message: '请输入文章标题', trigger: 'blur' },
							{ min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
						],
						impNuber:[
							{ required: true, message: '请选择重要性', trigger: 'blur' },
						],
						time:[
							{ required: true, message: '请选择发布的时间', trigger: 'blur',type:'date' },
						],
						src:[
							{ required: true, message: '请上传封面图', trigger: 'blur',},
						]
				},
			}
		},
		beforeMount(){
			this._id = this.$route.params.id;
		},
		mounted(){
			if(this.isEdit){
				this.getBlogContent();
			}
		},
		methods: {
			getBlogContent(){
				blogDetail({_id:this._id}).then(res =>{
					this.ruleForm = res.data.result;
					this.ruleForm.time = new Date();
				})
			},
	      	submitForm(formName) {
		      	this.loading = true;
		      	this.ruleForm.time = new Date();
		        this.$refs[formName].validate((valid) => {
		        	if(!this.ruleForm.contentEditor && !this.ruleForm.contentMark){
		          		this.$message.error('请输入文章内容');
		          	}
			        if (valid) {
			        	// 判断是编辑还是添加
			        	if(this.isEdit){
			        		updateBlog({
			        			_id:this._id,
			        			type:this.ruleForm.type,
			        			title:this.ruleForm.title,
			        			time:this.ruleForm.time,
			        			impNuber:this.ruleForm.impNuber,
			        			html:this.ruleForm.html,
						        contentEditor:this.ruleForm.contentEditor,
						        contentMark:this.ruleForm.contentMark,
						        src:this.ruleForm.src,
			        		}).then(res =>{
			        			this.$message.success('文章更新成功！！！');
				          	    this.$router.push({
									path:`/article/preview/${this._id}`,
								})
			        		})
			        	}else{
			        		addBlog(this.ruleForm).then(res =>{
				          		this.htmlArticle = res.data.result.html;
				          		console.log(res)
				          		if(res.data.status === 10001){
				          			this.$message.error('此文章标题已经存在，请重新输入');
				          		}
				          		this.loading = false;
				          		if(res.data.status === '0'){
				          			this.$message.success('文章发布成功！！！');
				          			this.$router.push('/article/list')
				          		}
				          		
				          	})
			        	}
			          	
			        } else {
			            console.log('error submit!!');
			            this.loading = false;
			            return false;
			        }
		        });
	      	},
	      	resetForm(formName) {
	        	this.$refs[formName].resetFields();
	      	},
	      	// 上传图片
	      	submitUpload(){
			    this.$refs.upload.submit();
			},
			onUploadChange(file){
				let _this = this;
			    const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
			    const isLt1M = file.size / 1024 / 1024 < 1;

			    if (!isIMAGE) {
			      this.$message.error('只能上传jpg/png图片!');
			      return false;
			    }
			    if (!isLt1M) {
			      this.$message.error('上传文件大小不能超过 1MB!');
			      return false;
			    }
			    var reader = new FileReader();
			    reader.readAsDataURL(file.raw);
			    reader.onload = function(e){
			        _this.ruleForm.src = e.currentTarget.result;//图片的base64数据
			    }
			},
		    changeRadio(){
		      	this.ruleForm.contentEditor = '';
		      	this.ruleForm.contentMark = '';
		    },
		    // 图片上传
	      	$imgAdd(pos, $file){
	      		console.log($file)
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('images', $file);
                this.img_file[pos] = $file;
                uploadImages(formdata).then(res =>{
                	this.$refs.md.$img2Url(pos,res.data.data)
                })
            },
	        $imgDel(pos){
	            delete this.img_file[pos];
	        }, 
	        changeData(value, render) {
	            this.ruleForm.html = render;
	        } 
	    },
	    computed:{
	    	...mapGetters(['articleTypes'])
	    }
	}
</script>
<style lang="less" scoped="">
.add-articles{
	text-align: left;
	min-height: 1000px;
    /deep/.blogs{
    	width: 100%;
    }
    .el-rate{
		line-height: 50px;
    }
    .submit-button{
    	width: 100%;
    	padding: 10px;
    	background-color: rgba(184,144,133,.5);
    	text-align: right;
    }
    .editor-markdown{
    	margin-top: 20px;
    	margin-bottom: 100px;
    	height: 500px;
		.markdown{
	    	height: 500px;
	    }
    }
    
    .switch-box{
    	margin-top: 20px;
    }
    /deep/.editor-markdown .el-form-item__content{
    	margin-left: 0 !important;
    }
    .uploadCoverW{
    	margin:80px 0 40px;
		.show-cover{
			width: 210px;
			height: 158px;
			border-radius: 4px;
			border: 1px dashed #d9d9d9;
			margin-left: 30px;
			margin-top: 10px;
			img{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.showImg{
			display: inline-block;
			vertical-align: top;
		}
	}
}
</style>