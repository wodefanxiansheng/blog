<template>
	<div class="">
	    <title-m :text="text"></title-m>
	    <!-- <div class="search-input-group">
			<el-input  placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getBlogLists"></el-input>
	        <el-button type="primary" icon="el-icon-search" :loading="isloading" @click.native="getBlogLists">搜索</el-button>
		</div> -->
		<el-table
		stripe
		:data="blogListsArr"  
		v-loading="isloading" 
		element-loading-text="拼命加载中"
    	element-loading-spinner="el-icon-loading"
        border size="medium"
        fit highlight-current-row>
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
		    		<div v-if="scope.column.property === 'type'">
		    			<el-tag
                        class="tag"
                        type="primary"
                        close-transition 
                        v-for="(tag, index) in scope.row.type" :key="index">{{tag}}</el-tag>
		    		</div>
		    		<div v-else-if="scope.column.property == 'impNuber'">
		    			<el-rate v-model="scope.row[scope.column.property]"></el-rate>
		    		</div>
		    		<div v-else-if="scope.column.property == 'src'">
		    			<img :src="scope.row[scope.column.property]" alt="" class="fillCoverImage">
		    		</div>
		    		<div v-else-if="scope.column.property == 'time'">
		    			{{scope.row[scope.column.property]|formatDate}}
		    		</div>
		    		<div v-else>{{scope.row[scope.column.property] || '无'}}</div>
		    	</template>
			</el-table-column>
		    <el-table-column label="操作" align="center" width="250">
		      <template slot-scope="scope">
		      	<el-button
		          size="mini"
		          type="primary"
		          @click="handlePreview(scope.$index, scope.row)">预览</el-button>
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
	      :total="blogTotal"
	      class="pagination"
	      >
	    </el-pagination>
	</div>
</template>
<script>
  import { blogLists , deleteBlog } from '@/api/blog'
  import { formatDate } from '../../../utils/index'
  export default {
    data() {
      return {
      	text:'文章列表',
      	page:1,
		pageSize:10,
		keyword:'',
        value: '',
        sizeShowNumber:[10,20,50,100,200],
        isloading:false,
        headerOptions:[
        	{
        		label:'日期',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'time',
        		minWidth:''||100,
        		headerAlign: 'center',
        	},
        	{
        		label:'封面',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'src',
        		minWidth:''||220,
        		headerAlign: 'center',
        	},
        	{
        		label:'类型',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'type',
        		minWidth:''||150,
        		headerAlign: 'center',
        	},
        	{
        		label:'标题',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'title',
        		minWidth:''||150,
        		headerAlign: 'center',
        	},
        	{
        		label:'重要性',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'impNuber',
        		minWidth:''||100,
        		headerAlign: 'center',
        	}
        ],
        // userInfo:{},
        editShow:false,//弹框默认隐藏
        blogListsArr: [],
        blogTotal:0
      }
    },
    mounted(){
    	this.getBlogLists();
    },
    filters:{
		formatDate (time) {
		    let date = new Date(time)
		    return formatDate(date, 'yyyy-MM-dd hh:mm')
		}
	},
    methods:{
    	getBlogLists() {
    		blogLists({
					// keyword: this.keyword,
                    page: this.page,
                    pageSize: this.pageSize
				}).then(res =>{
					this.blogListsArr = res.data.result.list;
    				this.blogTotal =res.data.totalCount;
    		})
    	},
    	// 分页
	    handleSizeChange(val) {
	        this.pageSize = val;
	        this.getBlogLists();
	    },
	    handleCurrentChange(val) {
	        this.page = val;
	        this.getBlogLists();
	    },
    	getIndex(index){
			return index + 1 +((this.page - 1) * this.pageSize)
		},
		// 文章预览
		handlePreview(index, row){
			// console.log(row._id)
			let id = row._id;
			this.$router.push({
				path:`/article/preview/${id}`,
			})
		},
		handleDelete(index, row) {
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		        let _this = this;
		        console.log(row._id)
		        deleteBlog({_id:row._id}).then(res =>{
		          	 console.log(res)
		          	  _this.blogListsArr.splice(index,1)
			          _this.$message({
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
		handleEdit(index,row){
			var id = row._id;
			this.$router.push({
				path:`/article/edit/${id}`,
			})
		}
    }
  }
</script>
<style lang="less" scoped="">
	.search-input-group{
		margin-bottom: 30px;
		.el-input{
			width: 300px;
		}
	}
	.pagination{
		text-align: right;
		margin: 40px 0 100px;
	}
	.tag{
		margin:0 10px 10px 10px;
	}
	.fillCoverImage{
		width: 200px;
		height: 200px;
		object-fit: cover;
	}
</style>