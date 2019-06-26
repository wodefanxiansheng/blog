<template>
	<div class="">
	    <title-m :text="text"></title-m>
	    <div class="search-input-group">
			<el-input  placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getBlogLists"></el-input>
	        <el-button type="primary" icon="el-icon-search" :loading="isloading" @click.native="getBlogLists">搜索</el-button>
		</div>
		<div class="deleteAll">	
			<el-button type="success" size="mini" :loading="isloading" @click.native="deleteAllVideo">删除已选择项</el-button>
		</div>
		<el-table
		stripe
		:data="videolistArr"  
		v-loading="isloading" 
		element-loading-text="拼命加载中"
    	element-loading-spinner="el-icon-loading"
        border size="medium"
        @selection-change="handleSelectionChange"
        fit highlight-current-row>
        	 <el-table-column
		      type="selection"
		      width="55">
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
		    		<div v-if="scope.column.property === 'tags'">
		    			<el-tag
                        class="tag"
                        type="primary"
                        close-transition 
                        v-for="(tag, index) in scope.row.tags" :key="index">{{tag}}</el-tag>
		    		</div>
		    		<div v-else-if="scope.column.property == 'cover'" @click="videoShowPlay(scope.row)">
		    			<img :src="scope.row[scope.column.property]" alt="" class="fillCoverImage" >
		    		</div>
		    		<div v-else-if="scope.column.property == 'createTime'">
		    			{{scope.row[scope.column.property]|formatDate}}
		    		</div>
		    		<div v-else>{{scope.row[scope.column.property] || '无'}}</div>
		    	</template>
			</el-table-column>
		    <el-table-column label="操作" align="center" width="250">
		      <template slot-scope="scope">
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
	      :total="videoTotal"
	      class="pagination"
	      >
	    </el-pagination>
	    <video-play v-if="videoShow" :videoInfo = "videoInfo" @close="closeVideo"></video-play>

	</div>
</template>
<script>
  import videoPlay from './components/play'
  import { videolists,deleteVideo,deleteSelectAllVideo } from '@/api/video'
  import { formatDate } from '@/utils/index'
  export default {
  	components:{
  		videoPlay
  	},
    data() {
      return {
      	videoShow:false,
      	text:'视频列表',
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
        		prop:'createTime',
        		minWidth:''||100,
        		headerAlign: 'center',
        	},
        	{
        		label:'封面',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'cover',
        		minWidth:''||220,
        		headerAlign: 'center',
        	},
        	{
        		label:'标题',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'name',
        		minWidth:''||150,
        		headerAlign: 'center',
        	},
        	{
        		label:'分类',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'classify',
        		minWidth:''||100,
        		headerAlign: 'center',
        	},
        	{
        		label:'类型',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'type',
        		minWidth:''||100,
        		headerAlign: 'center',
        	},
        	{
        		label:'标签',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'tags',
        		minWidth:''||200,
        		headerAlign: 'center',
        	},
        	{
        		label:'描述',
        		align:'center',
        		hidden:false,//显示，true隐藏
        		prop:'desc',
        		minWidth:''||100,
        		headerAlign: 'center',
        	}
        ],
        // userInfo:{},
        editShow:false,//弹框默认隐藏
        videolistArr: [],
        videoTotal:0,
        multipleSelection:[],
        selectVideoId:[],
        videoInfo:{},

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
    	closeVideo(){
    		this.videoShow = false;
    	},
    	videoShowPlay(data){
    		this.videoInfo = data;
    		this.videoShow = true;
    	},
	    handleSelectionChange(val) {
	       this.multipleSelection = val;
	    },
	    deleteAllVideo(){
	    	if(this.multipleSelection.length === 0){
	    		this.$message.error('请选择您要删除的视频');
	    	}else{
	    		for (let item of this.multipleSelection) {
	    			this.selectVideoId.push(item._id)
	    		}

	    		this.$confirm('是否删除选中项?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		        let _this = this;
		        deleteSelectAllVideo({videoAllId:_this.selectVideoId}).then(res =>{
		        	// 删除多个视频
		        	for (let i = _this.videolistArr.length - 1; i >= 0; i--) {
			        	for (let index in _this.multipleSelection) {
			        		if(_this.multipleSelection[index] == _this.videolistArr[i]){
			        			_this.videolistArr.splice(i,1)
			        		}
			        	}
			        }
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
	    	}
	    },
    	getBlogLists() {
    		videolists({
					// keyword: this.keyword,
                    page: this.page,
                    pageSize: this.pageSize
				}).then(res =>{
					this.videolistArr = res.data.result.list;
    				this.videoTotal =res.data.totalCount;
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
		handleDelete(index, row) {
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		        let _this = this;
		        deleteVideo({_id:row._id}).then(res =>{
		          	  _this.videolistArr.splice(index,1)
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
				path:`/video/editVideo/${id}`,
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
		height: 100px;
		object-fit: cover;
	}
	.deleteAll{
		margin-bottom: 20px;;
	}
</style>