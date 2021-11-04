<template>
	<div>
		<h2>支持分页功能,表格支持配置显示序号，显示表头，支持名称，年龄排序</h2>
		<h3>
			<button class="sf-button sf-button--primary" @click="changeShowHeader">切换显示表头</button>

			<button class="sf-button sf-button--primary" @click="changeDataSource">加载其它数据源</button>

			<button class="sf-button sf-button--primary" @click="getDataSource">恢复初始数据源</button>
		</h3>

		<sf-table
			:columns="columns"
			:data-source="dataSource"
			:sort-params="sortParams"
			:start-index="startIndex"
			:show-header="showHeader"
		>
			<template v-slot:id="slotProps">
				<div>
					<a style="color: #409eff;cursor: pointer;" @click="handleDelete(slotProps.id)">删除</a>
				</div>
			</template>
		</sf-table>
		<sf-pagination :pagination="pagination" @handlePageChange="handlePageChange" />
	</div>
</template>

<script lang="ts">
import { SfTable } from '../src/table/index'
import { SfPagination } from '../src/pagination/index'
import { computed, defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
import { SortParams, ColumnsRecord, Pagination, TableItem } from '../src/table/types'
import { getColumns, getData, getThirdData } from './data'
import debug from 'debug'
const DEBUG = debug('table-info:debug ') // 开发日志

export default defineComponent({
	name: 'App',
	components: {
		SfTable,
		SfPagination
	},
	setup() {

		// 是否显示表头
		const showHeader = ref(true)
		const startIndex = ref(0)
		const endIndex = ref(0)

		// 默认排序参数
		const sortParams: SortParams = reactive({
			name: 'age',
			direction: 'ASC',
		})

		// 默认分页参数
		const pagination: Pagination = reactive({
			pageSize: 10,
			total: 0
		})

		// 列数据
		const columns: ColumnsRecord[] = getColumns()

		// 表格数据
		const originData: Record<string, TableItem[]> = reactive({
			list: []
		})

		const loadData = (data: TableItem[]) => {
			originData.list = data
			pagination.total = data.length
		}

		/**
		 * 监听分页器,更新当前页数
		 * @param {number} current 当前页数
		 */
		const handlePageChange = (current: number) => {

			// 表格开始序号
			startIndex.value = (current - 1) * pagination.pageSize + 1

			// 表格结束序号
			endIndex.value = current * pagination.pageSize
		}

		// 动态监听表格数据
		const dataSource = computed(() => {
			return originData.list.slice(startIndex.value - 1, endIndex.value)

		})

		// 动态显示隐藏表头
		const changeShowHeader = () => {
			showHeader.value = !showHeader.value;
			DEBUG(`${showHeader.value ? '显示' : '隐藏'}表头`)
		}

		// 加载其它数据源
		const changeDataSource = () => {
			const data = getThirdData()
			loadData(data)
		}

		// 加载表格数据
		const getDataSource = () => {
			const data = getData()
			loadData(data)
		}

		const handleDelete = () => {
			alert('您点击了删除按钮')
		}

		onMounted(() => {
			getDataSource()
		})

		return {
			columns,
			dataSource,
			sortParams,
			startIndex,
			showHeader,
			pagination,
			getDataSource,
			handlePageChange,
			changeShowHeader,
			changeDataSource,
			handleDelete
		}
	}
})
</script>

<style>
.sf-button {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	background: #fff;
	border: 1px solid #dcdfe6;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	box-sizing: border-box;
	outline: none;
	margin: 0;
	transition: 0.1s;
	font-weight: 500;
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 4px;
	color: #fff;
}

.sf-button--primary {
	background-color: #409eff;
	border-color: #409eff;
	margin-left: 5px;
}

.sf-button:focus,
.sf-button:hover {
	color: #409eff;
	border-color: #c6e2ff;
	background-color: #ecf5ff;
}
</style>
