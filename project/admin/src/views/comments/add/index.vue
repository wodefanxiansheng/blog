<template>
	<el-table
	    :data="csData"
	    tooltip-effect="dark"
	    border
	    stripe
	    style="width: 100%">
	    <el-table-column type="index" label="序号" align="center" width=""></el-table-column>
	    <el-table-column prop="name" label="名称" header-align="center" align="right"></el-table-column>
	    <el-table-column label="操作" align="center" width="">
	      <template slot-scope="scope">
	        <el-switch
	          v-model="scope.row.on"
	          on-color="#00A854"
	          off-color="#F04134"
	          @change="changeSwitch(scope.row)">
	        </el-switch>
	      </template>
	    </el-table-column>
	</el-table>
</template>
<script>
export default{
		data () {
		    return {
		      csData: [
		        {
		          name: '一',
		          on: '0'
		        },
		        {
		          name: '二',
		          on: '1'
		        }
		      ]
		    }
		},
		methods:{
		    changeSwitch (data) {
		      console.log(data)
		    }
		}
	}
</script>