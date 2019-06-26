<template>
	<div class="roles-box">
		<title-m :text="text"></title-m>
		<div class="create-roles">
			<el-button type="primary" @click="dialogFormVisible = true">新增角色</el-button>
			<el-dialog title="新增roles权限" :visible.sync="dialogFormVisible">
			  <el-form :model="form">
			    <el-form-item label="权限名称" :label-width="formLabelWidth">
			      <el-input v-model="form.name" autocomplete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="权限描述" :label-width="formLabelWidth">
			    	<el-input type="textarea" v-model="form.desc"></el-input>
			  	</el-form-item>
			    
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<el-table
		stripe
		:data="userList"  
		v-loading="isloading" 
		element-loading-text="拼命加载中"
    	element-loading-spinner="el-icon-loading"
        border size="medium"
        fit highlight-current-row>
		    <el-table-column type="index" align="center" label="ID" fixed ></el-table-column>
		    <el-table-column v-for="(item,key) in headerOptions"
		    	:key="key"
		    	:prop="item.prop"
		    	:label="item.label"
		    	:align="item.align"
		    	:min-width="item.minWidth"
		    	:header-align="item.headerAlign"
		    	sortable
		    	>
			</el-table-column>
		    <el-table-column label="操作" align='center'>
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">编辑权限</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				text:'角色权限',
				dialogFormVisible: false,
				isloading:false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px',
		        headerOptions:[
		        	{
		        		label:'权限名称',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'rolename',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	},
		        	{
		        		label:'权限描述',
		        		align:'center',
		        		hidden:false,//显示，true隐藏
		        		prop:'roleintro',
		        		minWidth:''||150,
		        		headerAlign: 'center',
		        	}
		        ],
		        userList:[
		        	{
			          rolename: 'admin',
			          roleintro: '超级管理员,有权查看所有页面.'
			        }, {
			          rolename: 'general',
			          roleintro: '普通管理员,可以查看除权限页之外的所有页.'
			        }, {
			          rolename: 'visitor',
			          roleintro: '访客,只能查看首页和github'
			        },
		        ]
			}
		},
		methods:{
			// getIndex(index){
			// 	return index + 1 +((this.page - 1) * this.pageSize)
			// },
		}
	}
</script>
<style lang="less" scoped>
	.create-roles{
		margin-bottom: 50px;
	}
</style>