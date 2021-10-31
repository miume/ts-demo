<template>
  <div>
    <div class="sf-table">
      <table>
        <thead v-if="showHeader" class="sf-table-thead">
          <tr>
            <th v-if="showIndex" class="sf-table-index">
              序号
            </th>
            <th v-for="(column) in columns"
                :key="column.index"
                :class="renderActiveClass(`${column.index}`)"
            >
              <div class="header">
                <div>{{ column.name }}</div>
                <div v-if="column.sortable" class="sort">
                  <div class="sort-item ascending"
                       @click="sort(`${column.index}`, 'ASC')" />
                  <div class="sort-item descending"
                       @click="sort(`${column.index}`, 'DESC')" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, key) in showList"
              :key="row.id"
          >
            <td v-if="showIndex">
              {{ startIndex + key + 1 }}
            </td>
            <td v-for="(col) in columns"
                :key="col.index"
            >
              <slot v-if="slots[col.index]" 
                    :name="col.index">
              </slot>
              <span v-else>
                {{ row[col.index] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isEmpty" class="sf-table-empty">{{ emptyText }}</div>
      <sf-pagination v-if="!isEmpty && pagination.isSupport" 
                     :currentPage="cur"
                     :pagerCount="pagerCount"
                     @pre="pre"
                     @next="next"
                     @pageClick="pageClick"
                     />
    </div>
  </div>
</template>
<script lang="ts">

import './style/table.less'
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { tableProps, SortDirection } from './ts/types'
import sfPagination from './components/pagination.vue'
import usePagination from './ts/pagination'
import userSort from './ts/sort'
import debug from 'debug'

const DEBUG = debug('SfTable:')

export default defineComponent({
  name: 'Table',
  components: {
    sfPagination,
  },
  props: tableProps,
  setup(props, { slots }) {
    const state = reactive({
      // 初始数据
      list: props.dataSource
    })

    // 获取当前页数
    const { cur, pre, next, pageClick } = usePagination(props.pagination.current | 1);

    // 每页显示多少条数据
    const pagerCount = computed(() => Math.ceil(state.list.length / props.pagination.pageSize))
    
    // 数据是否存在 
    const isEmpty = computed(() => !showList.value.length)

    // 开始序号
    const startIndex = computed(() => (cur.value - 1) * props.pagination.pageSize)

    // 结束序号
    const endIndex = computed(() => cur.value * props.pagination.pageSize)

    // 获取排序参数和方法
    const { sort, getName, getDirection, clearSort, renderActiveClass } = userSort(props.sortParams)

    // 表格渲染数据（动态）
    const showList = computed(() => {
      const data = state.list.slice(startIndex.value, endIndex.value)
      const key = getName()

      // 排序字段不存在，则直接返回data
      if (!key) {
        DEBUG('table:', '表格无排序显示')
        return data
      } 

      // 排序
      return dataSort(data, key)
    })

    // 当前页数据 根据某列升序降序排序
    const dataSort = (data: {[x: string]: any }, key: string) => {
      DEBUG('table:',  `表格数据根据${key}进行${getDirection() === SortDirection.asc ? '升序' : '降序'}排列`)
      return data.sort((a: Record<string, any>, b: Record<string, any>) => {
        const isAsc = getDirection() === SortDirection.asc
        if (Number.isFinite(a[key])) {
          if (a[key] > b[key]) {
            return isAsc ? 1 : -1
          }
          if (a[key] < b[key]) {
            return isAsc ? -1 : 1
          }
          return 0
        }
        const sortResult = (a[key] as string).localeCompare((b[key] as string), 'zh');
        return isAsc ? sortResult : -sortResult
      })
    }

    /**
     * 动态加载表格数据
     * @param {Array} data 数据源
     */
    const loadData = (data: {[x: string]: any }[]) => {
      state.list = data;
    }

    return {
      cur,
      showList,
      state,
      pagerCount,
      isEmpty,
      startIndex,
      endIndex,
      slots,
      pre, 
      next, 
      pageClick,
      sort,
      renderActiveClass,
      loadData,
      clearSort
    }
  },
})
</script>
