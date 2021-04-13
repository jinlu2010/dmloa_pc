<template>
	<div>
		<el-page-header @back="goBack" content="项目名称"></el-page-header>
		<div class="project-content">
			<ul>
				<li>项目标题<span>花开声音</span></li>
				<li>项目周期<span>2019.1.1至2020.1.31</span></li>
				<li>服务对象</li>
				<li>项目状态<span>已完成</span></li>
				<li>服务目的</li>
				<li>对接人</li>
				<li>服务目标</li>
				<li>项目预算</li>
				<li>验收标准</li>
				<li>相关介绍</li>
			</ul>
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>品牌塑造</span>
				<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			<el-collapse v-model="activeNames" @change="handleChange" accordion>
				<el-collapse-item title="Logo设计 - 张小小" name="1">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="tastname" label="任务名称" width="180"></el-table-column>
						<el-table-column prop="finishdate" label="截止日期" width="180"></el-table-column>
						<el-table-column prop="name" label="负责人" width="180"></el-table-column>
						<el-table-column prop="status" label="完成状态" width="180"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="画册设计 - 张小小" name="2">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="tastname" label="任务名称" width="180"></el-table-column>
						<el-table-column prop="finishdate" label="截止日期" width="180"></el-table-column>
						<el-table-column prop="name" label="负责人" width="180"></el-table-column>
						<el-table-column prop="status" label="完成状态" width="180"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="包装设计 - 张小小" name="3">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="tastname" label="任务名称" width="180"></el-table-column>
						<el-table-column prop="finishdate" label="截止日期" width="180"></el-table-column>
						<el-table-column prop="name" label="负责人" width="180"></el-table-column>
						<el-table-column prop="status" label="完成状态" width="180"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>品牌调研</span>
				<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
			</div>
			<el-collapse v-model="activeNames" @change="handleChange" accordion>
				<el-collapse-item title="Logo设计 - 张小小" name="5">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="tastname" label="任务名称" width="180"></el-table-column>
						<el-table-column prop="finishdate" label="截止日期" width="180"></el-table-column>
						<el-table-column prop="name" label="负责人" width="180"></el-table-column>
						<el-table-column prop="status" label="完成状态" width="180"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="画册设计 - 张小小" name="6">
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
						<el-table-column prop="tastname" label="任务名称" width="180"></el-table-column>
						<el-table-column prop="finishdate" label="截止日期" width="180"></el-table-column>
						<el-table-column prop="name" label="负责人" width="180"></el-table-column>
						<el-table-column prop="status" label="完成状态" width="180"></el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
			</el-collapse>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeNames: ['1'],
				tableData: [{
					tastname:'任务一',
					finishdate: '2016-05-02',
					name: '王小虎',
					status: '已完成'
				}, {
					tastname:'任务一',
					finishdate: '2016-05-02',
					name: '王小虎',
					status: '已完成'
				}, {
					tastname:'任务一',
					finishdate: '2016-05-02',
					name: '王小虎',
					status: '已完成'
				}, {
					tastname:'任务一',
					finishdate: '2016-05-02',
					name: '王小虎',
					status: '已完成'
				}],
				multipleSelection: []
			};
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			handleClick(row) {
				console.log(row);
			},
			goBack() {
			    console.log('go back');
			}
		}
	}
</script>

<style>
	
</style>
