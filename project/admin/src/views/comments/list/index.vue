<template>
	<div>
		<title-m :text="text"></title-m>
		<div class="search-input-group">
			<el-input  placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getCommentsList"></el-input>
	        <el-button type="primary" icon="el-icon-search" :loading="isloading" @click.native="getCommentsList">搜索</el-button>
		</div>
		<el-table
		stripe
		:data="commentsArr"  
		v-loading="isloading" 
		element-loading-text="拼命加载中"
    	element-loading-spinner="el-icon-loading"
        border size="medium"
        fit highlight-current-row>
        <el-table-column type="expand">
	      <template slot-scope="props">
	        <el-form label-position="left" inline class="demo-table-expand">
	          <el-form-item label="发布时间：">
	            <span>{{ props.row.time }}</span>
	          </el-form-item>
	          <el-form-item label="游客名：">
	            <span>{{ props.row.name }}</span>
	          </el-form-item>
	          <el-form-item label="Ip：">
	            <span>{{ props.row.ip }}</span>
	          </el-form-item>
	          <el-form-item label="城市：">
	            <span>{{ props.row.city }}</span>
	          </el-form-item>
	          <el-form-item label="评论内容：" class="comments-wrap">
	            <span class="comments-content">{{ props.row.content }}</span>
	          </el-form-item>
	        </el-form>
	      </template>
	    </el-table-column>
		    <el-table-column type="index" align="center" label="ID" fixed :index="getIndex"></el-table-column>
		    <el-table-column v-for="(item,key) in headerOptions"
		    	:key="key"
		    	:prop="item.prop"
		    	:label="item.label"
		    	:align="item.align"
		    	:min-width="item.minWidth"
		    	:header-align="item.headerAlign"
		    	sortable
		    	>
		    	<template slot-scope="scope">
		    		<div v-if="scope.column.property === 'roles'">
		    			<el-tag
                        class="tag"
                        type="primary"
                        close-transition 
                        v-for="(tag, index) in scope.row.roles" :key="index">{{tag}}</el-tag>
		    		</div>
		    		<div v-else-if="scope.column.property == 'createTime'">
		    			{{scope.row[scope.column.property]|formatDate}}
		    		</div>
		    		<div v-else-if="scope.column.property == 'content'" :title="scope.row[scope.column.property]" class="h-content-comment">
		    			{{scope.row[scope.column.property]}}
		    		</div>
		    		<div v-else>{{scope.row[scope.column.property] || '无'}}</div>
		    	</template>
			</el-table-column>
		    <el-table-column label="操作" align='center'>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-pagination
		  background
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :page-sizes="sizeShowNumber"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="commentTotal">
	    </el-pagination>
	</div>
</template>
<script>
	import {commentsList,deleteComment} from '@/api/comments'
	import { formatDate } from '../../../utils/index'
	export default{
		components: {
            
        },
		data(){
			return{
				text:'留言墙评论列表',
				page:1,
				pageSize:10,
				keyword:'',
				idOptions: [{
		          value: '选项1',
		          label: 'ID Ascending'
		        }, {
		          value: '选项2',
		          label: 'ID Descending'
		        }],
		        value: '',
		        sizeShowNumber:[10,20,50,100,200],
		        isloading:true,
		        commentsArr:[],
		        commentTotal:0,
		        headerOptions:[
		        	{
		        		label:'发布时间',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'time',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'游客名',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'name',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'Ip',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'ip',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'城市',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'city',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'评论内容',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'content',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	}
		        ],
		        userInfo:{},
		        editShow:false//弹框默认隐藏
			}
		},
		filters:{
			formatDate (time) {
			    let date = new Date(time)
			    return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		mounted(){
			this.getCommentsList();//调取所有用户
		},
		methods:{
			// 把这个隐藏的事件传值给子组件
			close_box(){
				this.editShow = false;
				this.getCommentsList();
			},
			getCommentsList(){
				this.isloading = true;
				commentsList({page:this.page,pageSize:this.pageSize}).then(res =>{
					console.log(res)
					this.commentsArr = res.data.result.list;
					this.commentTotal = res.data.totalCount;
					this.isloading = false;
				}).catch(error =>{
					this.isloading = false;
					console.log(error)
				})
		        // this.userInfo = row;
		    },
		    //删除
		    handleDelete(index, row) {
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		          deleteComment({_id:row._id}).then(res=>{
		          	  this.commentsArr.splice(index,1)
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
		          })
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });
		        });
		    },
		    // 分页
		    handleSizeChange(val) {
		        this.pagesize = val;//先默认两条
		        this.getCommentsList();
		    },
		    handleCurrentChange(val) {
		        this.page = val;
		        this.getCommentsList();
		    },
		    getIndex(index){
				return index + 1 +((this.page - 1) * this.pageSize)
			}
		},
	}
</script>
<style lang="less" scoped="">
	.search-input-group{
		margin-bottom: 30px;
		.el-input{
			width: 300px;
		}
	}
	.el-pagination{
		text-align: center;
		margin:20px 0;
	}

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .comments-content{
  	color: #409EFF !important;
  }
 .comments-wrap{
 	width: 100% !important;
 	display: flex !important;

 }
 /deep/.comments-wrap .el-form-item__label{
		width: 180px !important;
 	}
 /deep/.h-content-comment{
		display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
 	}
</style>