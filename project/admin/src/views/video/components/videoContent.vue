<template>
	<div class="video-box">
		<el-upload
		  class="upload-video"
		  drag
		  :action="videoServer"
		  :data="videoData"
		  :before-upload="beforeAvatarUpload"
		  :on-progress="uploadVideoProcess"
		  :on-success="handleVideoSuccess"
		  :on-error="handleVideoError"
		  v-show="videoUploadBool"
		  
		  >
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过1G</div>
		</el-upload>
		<div v-if="videoProgress" class="video-intromation">
			<div class="uploadProgress" v-show="progressBar">
				<p class="video-name">
					<span>当前上传：</span>
					<span>{{videoName}}</span>
				</p>
				<div class="video-gress">
					<el-progress :stroke-width="12" :text-inside="true" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
					<el-popover
					  class="popover-cancle"
					  placement="top"
					  width="220"
					  v-model="visible">
					  <p>确定要取消上传吗？</p>
					  <div class="cancle-buttons" style="margin-top: 14px;text-align: center;">
					    <el-button size="mini" type="text" @click="cancleVideoUpload">取消上传</el-button>
					    <el-button type="primary" size="mini" @click="visible = false">继续上传</el-button>
					  </div>
					  <span slot="reference" class="cancle-upload-video">取消上传</span>
					</el-popover>
				</div>
			</div>
			<el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="100px" class="video-ruleForm">
				<el-form-item prop="src" label="上传封面" class="uploadCoverW">
					<el-upload
						ref="upload"
						drag
						:action="coverImageServer"
						accept="image/jpeg,image/png"
						:before-upload="beforeOnUpload"
						:on-success="coverImageSuccess"
						:on-error="handleVideoError"
						:data= "coverData"
						class="showImg"
						>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过2M</div>
					</el-upload>
					<div class="show-cover showImg">
						<img :src="ruleForm.cover" alt="">
					</div>
				</el-form-item>
				  <el-form-item label="标题" prop="name">
				    <el-input v-model="ruleForm.name" placeholder="请输入标题"></el-input>
				  </el-form-item>
				  <el-form-item label="分类" prop="classify">
				    <el-select v-model="ruleForm.classify" placeholder="请选择分类">
				      <el-option label="娱乐" value="娱乐"></el-option>
				      <el-option label="音乐" value="音乐"></el-option>
				      <el-option label="舞蹈" value="舞蹈"></el-option>
				      <el-option label="生活" value="生活"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="类型" prop="type">
				    <el-radio-group v-model="ruleForm.type" placeholder="请选择类型">
				      <el-radio label="拍客"></el-radio>
				      <el-radio label="原创"></el-radio>
				      <el-radio label="转载"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="标签" prop="tags">
				    <el-select
					    v-model="ruleForm.tags"
					    multiple
					    filterable
					    allow-create
					    default-first-option
					    placeholder="请输入文章标签">
					    <el-option
					      v-for="item in ruleForm.tags"
					      :key="item"
					      :value="item">
					    </el-option>
					 </el-select>
				  </el-form-item>
				  <el-form-item label="描述" prop="desc">
				    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
				  </el-form-item>
				  <el-form-item class="submitButton">
				     <el-button type="primary" @click="submitFormVideo('ruleForm')">保存</el-button>
				  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { uploadVideo,videoInfo,videoUpdate,videoDetail } from '@/api/video'
	export default {
		props:{
			isEdit:{
				default:false,
				type:Boolean
			}
		},
		data(){
			return {
				_id:'',
				videoServer:'http://localhost:8090/api/blog/uploadVideo',
				coverImageServer:'http://localhost:8090/api/blog/uploadCover',
				videoUploadPercent:0,
				videoProgress:false,
				videoUploadBool:true,
				progressBar:false,
				videoName:'',
				visible: false,
				videoData:{},
				coverData:{},
				ruleForm: {
				  url:'',
		          name:'',
		          classify:'',
		          type:'',
		          tags:[],
		          desc:'',
		          cover:''
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入视频名称', trigger: 'blur' },
		            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
		          ],
		          classify: [
		            { required: true, message: '请选择视频分类', trigger: 'change' }
		          ],
		          type: [
		            {  required: true, message: '请选择视频类型', trigger: 'change' }
		          ],
		          tags: [
		            { required: true, message: '请填写视频标签', trigger: 'change' }
		          ],
		          desc: [
		            { required: true, message: '请填写视频的描述', trigger: 'blur' }
		          ]
		        }
			}
		},
		beforeMount(){
			this._id = this.$route.params.id;
		},
		mounted(){
			// window.onbeforeunload = function (e) {
			//   e = e || window.event;
			//   // 兼容IE8和Firefox 4之前的版本
			//   if (e) {
			//     e.returnValue = '关闭提示';
			//   }
			//   // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
			//   return '关闭提示';
			// };
			if(this.isEdit){
				this.videoUploadBool = false;
				this.videoProgress = true;
				this.progressBar = false;
				// 编辑页面信息
				videoDetail({_id:this._id}).then(res =>{
					this.ruleForm = res.data.result;
				})
			}
		},
		methods: {
			// 封面图上传
			beforeOnUpload(file){
				// 添加封面图信息给后台
				let formdata = new FormData();
				formdata.append("file",file)
				this.coverData = formdata;

				// 判断类型
			    const isIMAGE = (file.type === 'image/jpeg' || file.type === 'image/png');
			    const isLt1M = file.size / 1024 / 1024 < 2;
			    if (!isIMAGE) {
			      this.$message.error('只能上传jpg/png图片!');
			    }
			    if (!isLt1M) {
			      this.$message.error('上传文件大小不能超过 2MB!');
			    }
			    return isIMAGE && isLt1M;
			},
			// 视频封面上传成功事件
		    coverImageSuccess(file,res){
		    	this.ruleForm.cover = res.response.data;
		    	this.$message.success('上传封面成功');
		    },

			// 限制上传视频的格式和大小
			beforeAvatarUpload(file) {
				// 把视频的信息添加到formdata里面去，传给后台
				let formdata = new FormData();
				formdata.append("file",file)
				this.videoData = formdata;

				// *****************************************************
				
		        const isVideo = file.type === 'video/mp4';
		        const isLt1G = file.size / 1024 / 1024 < 1024;

		        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
			        this.$message.error('请上传正确的视频格式');
			    }
		        if (!isLt1G) {
		          this.$message.error('上传视频大小不能超过 1G!');
		        }
		        return isVideo && isLt1G;
		    },
		    // 监控进度条
		    uploadVideoProcess(event, file, fileList){
		    	this.videoUploadBool = false;//当点击视频上传时，则视频上传按钮隐藏
				this.videoName = file.name;
			    this.videoProgress = true;
			    this.progressBar = true;
			    this.videoUploadPercent = parseFloat(event.percent.toFixed(2));
			    
			},
			// 取消视频上传
			cancleVideoUpload(){

				this.visible = false;//弹框隐藏
				this.videoProgress = false;//进度条隐藏
				this.videoUploadBool = true;//视频上传按钮显示
				
			},
		    handleVideoSuccess(res,file){
		    	this.ruleForm.url = res.data;
		    	this.$message.success('上传成功');
		    },
		    handleVideoError(){
		    	this.$message.error('上传失败');
		    },
		    submitFormVideo(formName){
		    	this.$refs[formName].validate((valid) => {
			          if (valid) {
			          	if(this.isEdit){
			          		// 编辑页面
			          		videoUpdate({
			        			_id:this._id,
			        			url:this.ruleForm.url,
			        			name:this.ruleForm.name,
			        			classify:this.ruleForm.classify,
			        			type:this.ruleForm.type,
			        			tags:this.ruleForm.tags,
			        			desc:this.ruleForm.desc,
			        			cover:this.ruleForm.cover,
			        		}).then(res =>{
			        			this.$message.success('文章更新成功！！！');
				          	    this.$router.push({
									path:'/video/videoList',
								})
			        		})
			          	}else{
			          		// 直接上传页面
			          		videoInfo(this.ruleForm).then(res =>{
				          		console.log(res)
				          		if(res.data.status === '0'){
				          			this.$message.success('提交成功');
				          			this.$router.push({
										path:'/video/videoList',
									})
				          		}else if(res.data.status === '1'){
				          			this.$message.error('提交失败');
				          		}else if(res.data.status === '10001'){
				          			this.$message.error('上传的视频已经存在，请修改名称');
				          		}
				          	})
			          	}
				          	
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
		        });
		    },
		    

	    },
	}
</script>
<style lang="less" scoped>
	.video-box{
		width: 800px;
		margin:0 auto;
		.upload-video{
			width: 360px;
			margin:30px auto 0;
		}
		/deep/.el-upload-list ,.el-upload-list--text{
			display: none !important;
		}
		.video-gress{
			position: relative;
			.popover-cancle{
				position: absolute;
				right: 0;
				top: 22px;
				.cancle-upload-video{
					font-size: 16px;
					cursor: pointer;
					&:hover{
						color: #ff7423;
					}
				}
			}
		}
		.video-name{
			text-align: center;
			padding-top: 12px;
		}
		.uploadProgress{
			width: 100%;
		    padding: 10px 30px 56px 30px;
		    -webkit-border-radius: 5px;
		    -moz-border-radius: 5px;
		    border-radius: 5px;
		    background-color: #f3f3f3;
		    border-bottom: 3px solid #e5e5e5;
		}
		.video-ruleForm{
			margin-top: 40px;
			.submitButton{
				text-align: center;
			}
		}
		 .uploadCoverW{
	    	margin:80px 0 40px;
			.show-cover{
				width: 210px;
				height: 158px;
				border-radius: 4px;
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