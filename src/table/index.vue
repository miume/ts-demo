<template>
	<div>
		<div class="sf-table">
			<table>
				<thead v-if="showHeader" class="sf-table-thead">
					<tr>
						<th v-if="showIndex" class="sf-table-index">序号</th>
						<th v-for="(column) in columns" :key="column.index" :class="renderActiveClass(column.index)">
							<div class="header">
								<div>{{ column.name }}</div>
								<div v-if="column.sortable" class="sort">
									<div class="sort-item ascending" @click="sort(column.index, 'ASC')" />
									<div class="sort-item descending" @click="sort(column.index, 'DESC')" />
								</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, key) in showList" :key="row.id">
						<td v-if="showIndex">{{ startIndex + key }}</td>
						<td v-for="(col) in columns" :key="col.index">
							<slot v-if="slots[col.index]" :name="col.index" :id="row.id"></slot>
							<span v-else>{{ row[col.index] }}</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div v-if="isEmpty" class="sf-table-empty">{{ emptyText }}</div>
		</div>
	</div>
</template>
<script lang="ts">

import './style/table.less'
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { tableProps, SortDirectionEnum } from './types'
import userSort from './hooks/sort'
import debug from 'debug'

const DEBUG = debug('table-info:debug ') // 开发日志

export default defineComponent({
	name: 'Table',
	props: tableProps,
	setup(props, { slots }) {

		const state = reactive({
			sortParams: props.sortParams,
		})

		// 数据是否存在 
		const isEmpty = computed(() => !showList.value.length)

		// 是否显示序号
		const showIndex = computed(() => props.startIndex && props.startIndex > 0)

		// 获取排序参数和方法
		const { sort, getName, getDirection, clearSort, renderActiveClass } = userSort(state.sortParams)

		// 表格渲染数据（动态）
		const showList = computed(() => {
			const data = [...props.dataSource]
			const key = getName()

			// 排序字段不存在，则直接返回data
			if (!key) {
				DEBUG('表格无排序显示')
				return props.dataSource
			}

			// 排序
			return dataSort(data, key)
		})

		// 当前页数据 根据某列升序降序排序
		const dataSort = (data: { [x: string]: any }, key: string) => {
			DEBUG(`表格数据根据${key}进行${getDirection() === SortDirectionEnum.asc ? '升序' : '降序'}排列`)
			return data.sort((preItem: Record<string, any>, nextItem: Record<string, any>) => {
				const isAsc = getDirection() === SortDirectionEnum.asc
				if (Number.isFinite(preItem[key])) {
					if (preItem[key] > nextItem[key]) {
						return isAsc ? 1 : -1
					}
					if (preItem[key] < nextItem[key]) {
						return isAsc ? -1 : 1
					}
					return 0
				}
				const sortResult = (preItem[key] as string).localeCompare((nextItem[key] as string), 'zh');
				return isAsc ? sortResult : -sortResult
			})
		}

		return {
			showList,
			isEmpty,
			slots,
			showIndex,
			sort,
			renderActiveClass,
			clearSort
		}
	}
})
</script>
