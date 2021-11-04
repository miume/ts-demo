<template>
	<div class="sf-pagination">
		<button type="button" class="btn-pre" :disabled="preDIsabled" @click="pre">
			<i>{{ '上一页' }}</i>
		</button>

		<ul class="sf-pager">
			<li
				v-for="(page) in pagers"
				:key="page"
				:class="{ active: cur === page + 1 }"
				class="number"
				@click="pageClick(page + 1)"
			>{{ page + 1 }}</li>
		</ul>

		<button type="button" class="btn-next" :disabled="nextDisabled" @click="next">
			<i>{{ '下一页' }}</i>
		</button>
	</div>
</template>

<script lang="ts">

import './style/pagination.less'
import { computed, defineComponent, watch, watchEffect } from '@vue/composition-api'
import type { PropType } from 'vue-types/dist/types'
import usePagination from './hooks/pagination'
import debug from 'debug'

const DEBUG = debug('pagination-info: debug ')

const nextProps = {
	pagination: {
		type: Object as PropType<Record<string, any>>,
		default: () => {
			return {
				pageSize: 10,
				total: 0
			}
		}
	}
} as const

export default defineComponent({
	name: 'Pagination',
	props: nextProps,
	emits: ['handlePageChange'],
	setup(props, { emit }) {

		// 获取当前页数
		const { cur, pre, next, pageClick } = usePagination();

		// 总共有多少页
		const pagerCount = computed(() => Math.ceil(props.pagination.total / props.pagination.pageSize))

		// 快速创建一个length 为 pagerCount.value的数组，方便渲染中间页数
		const pagers = computed(() => [...Array(pagerCount.value).keys()])

		// 判断 上一页 下一页是否置灰
		const preDIsabled = computed(() => cur.value <= 1)
		const nextDisabled = computed(() => cur.value >= pagerCount.value)

		watchEffect(() => {

			// 若当前页 大于总页数，则回到第一页
			if (cur.value > pagerCount.value) {
				pageClick(1)
				DEBUG(`当前页数${cur.value}大于总页数${pagerCount.value}，则直接跳转回第一页`)
			}
		})

		// 监听当前页变化
		watch(cur, (newValue) => {
			emit('handlePageChange', newValue);
			DEBUG(`当前页更新为${newValue}`)
		}, { immediate: true })

		return {
			preDIsabled,
			nextDisabled,
			pagers,
			cur,
			pagerCount,
			pre,
			next,
			pageClick
		}
	},

})
</script>
