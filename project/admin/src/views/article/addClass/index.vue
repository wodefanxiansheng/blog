<template>
	<div class="">
	    <title-m :text="text"></title-m>
	    <el-button type="primary" class="addClass" @click="editShow = true">添加分类</el-button>
		<el-table
		stripe
		:data="addClassLists"  
		v-loading="isloading" 
		element-loading-text="拼命加载中"
    	element-loading-spinner="el-icon-loading"
        border size="medium"
        fit highlight-current-row>
		    <el-table-column type="index" align="center" label="ID" fixed :index="getIndex"></el-table-column>
		    <el-table-column
		    	min-width="100px" 
		    	label="分类名称"
		    	prop="name"
		    	align="center"
		    	>
		        <template slot-scope="scope">
			        <template v-if="scope.row.edit">
			        	<div class="fenleiName">	
				            <el-input v-model="scope.row.name" class="edit-input" size="small" />
				            <el-button
				              class="cancel-btn"
				              size="mini"
				              type="warning"
				              @click="cancelEdit(scope.row)"
				            >
				              取消
				            </el-button>
			            </div>
			        </template>
		          	<span v-else>{{ scope.row.name }}</span>
		          </template>
		        </el-table-column>
		        <el-table-column
			      prop="type"
			      label="状态"
			      width="180"
			      align="center"
			      >
			      <template slot-scope="{row}">
			      		<span>{{row.type === true ? '已开启':'已禁用'}}</span>
			      </template>
		    	</el-table-column>
		    <el-table-column label="操作" align="center" width="350">
		      <template slot-scope="scope" class="operation-button">
		      	<el-switch 
		      	  class="switch-open"
				  v-model="scope.row.type"
				  active-color="#13ce66"
				  inactive-color="#ff4949"
				  active-text="开启"
				  inactive-text="禁用"
				  @change="changeSwitch(scope.row)"
				  >
				</el-switch>
				<template>
					<el-button
			            v-if="scope.row.edit"
			            type="success"
			            size="mini"
			            @click="confirmEdit(scope.row)"
			          >
			            确定
			         </el-button>
			        <el-button
			          v-else
			          size="mini"
			          @click="scope.row.edit = !scope.row.edit">编辑</el-button>
				</template>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<add-fenlei v-if="editShow" @close="close_add_show"></add-fenlei>
	</div>
</template>
<script>
  import addFenlei from '../components/addFenlei'
  import { getClass,updateType,editClass,deleteClass } from '@/api/blog'
  export default {
  	components:{
  		addFenlei,
  	},
    data() {
      return {
      	text:'分类列表',
      	page:1,
		pageSize:10,
        value: '',
        sizeShowNumber:[10,20,50,100,200],
        isloading:false,
        addClassLists: [],
        editShow:false,//默认弹框隐藏
      }
    },
    mounted(){
    	this.getClasslists();
    },
    methods:{
    	// 关闭添加分类弹框
    	close_add_show(){
    		this.editShow = false;
    		this.getClasslists();
    	},
    	getClasslists() {
    		getClass().then(res =>{
				this.addClassLists = res.data.result;
    		})
    	},
    	getIndex(index){
			return index + 1 +((this.page - 1) * this.pageSize)
		},
		handleDelete(index, row) {
			console.log(index)
		        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning',
		          center: true
		        }).then(() => {
			        let _this = this;
			        deleteClass({_id:row._id}).then(res =>{
			          	  _this.addClassLists.splice(index,1)
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
		changeSwitch(data){
			let _id = data._id,type = data.type;
			updateType({_id:_id,type:type}).then(res =>{
				this.getClasslists();
			})
		},
		// 确定修改
		confirmEdit(row){
			row.edit = !row.edit;
		    let _id = row._id,name = row.name;
			editClass({_id:_id,name:name}).then(res =>{
				this.getClasslists();
			})
		},
		// 取消修改
		cancelEdit(row){
			console.log(row)
			row.edit = !row.edit;
		}
    }
  }
</script>
<style lang="less">
.switch-open{
	margin-right: 10px;
}
.el-switch__label *{
	font-size: 12px !important;
}
.switch-open  .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
.switch-open  .el-switch__label--right {
  z-index: 1;
  right: 21px;
}
/*关闭时文字位置设置*/
.switch-open  .el-switch__label--left {
  z-index: 1;
  left: 21px;
}
/*显示文字*/
.switch-open  .el-switch__label.is-active {
  display: block;
}
.el-switch__core {
   width: 56px !important;
   height: 28px !important;
}
.el-switch__core:after{
	top: 4px;
}
.fenleiName{
	display: flex;	
}
.edit-input{
	margin-right: 12px;
}
.addClass{
	margin-bottom: 30px;
}
</style>