<template>
	<div>
		<title-m :text="text"></title-m>
		<div class="search-input-group">
			<el-input  placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getUserList"></el-input>
	        <el-button type="primary" icon="el-icon-search" :loading="isloading" @click.native="getUserList">搜索</el-button>
		</div>
		<el-table
		stripe
		:data="userList"  
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
		    		<div v-else>{{scope.row[scope.column.property] || '无'}}</div>
		    	</template>
			</el-table-column>
		    <el-table-column label="操作" align='center'>
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
	      :total="userTotal">
	    </el-pagination>
	    <edit-component :userInfo = "userInfo" v-if="editShow"  @close="close_box"></edit-component>
	</div>
</template>
<script>
	import { formatDate } from '../../../utils/index'
	import { mapState,mapGetters } from 'vuex'
	import editComponent from '../components/edit'
	export default{
		components: {
            editComponent
        },
		data(){
			return{
				text:'管理员列表',
				page:1,
				pageSize:1,
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
		        headerOptions:[
		        	{
		        		label:'日期',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'createTime',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'用户名',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'username',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'姓名',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'name',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'权限',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'roles',
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
			this.getUserList();//调取所有用户
		},
		methods:{
			// 把这个隐藏的事件传值给子组件
			close_box(){
				this.editShow = false;
				this.getUserList();
			},
			getUserList(){
				this.isloading = true;
				this.$store.dispatch('AdminUserLists',{
					keyword: this.keyword,
                    page: this.page,
                    pageSize: this.pageSize
				}).then(res =>{
					this.isloading = false;	
				}).catch(error =>{
					this.isloading = false;
				})
			},
			// 编辑
			handleEdit(index, row) {
				this.editShow = true;//弹框显示
		        this.userInfo = row;
		    },
		    //删除
		    handleDelete(index, row) {
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
		          this.$store.dispatch('DelUser',{_id:row._id})
		          this.userList.splice(index,1)
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
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
		    },
		    handleCurrentChange(val) {
		        this.page = val;
		        this.getUserList();
		    },
		    getIndex(index){
				return index + 1 +((this.page - 1) * this.pageSize)
			}
		},
		computed:{
			...mapGetters(['userList','userTotal']),
			
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
	.el-pagination{
		text-align: center;
		margin:20px 0;
	}



</style>