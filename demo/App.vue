<template>
  <div>
    <h2>显示分页,显示序号，显示表头，支持名称，年龄排序</h2>
    <h3>
      <button class="sf-button sf-button--primary" 
              @click="changePagination">切换显示分页</button>
      <button class="sf-button sf-button--primary"
              @click="changeShowIndex">切换显示序号</button>
      <button class="sf-button sf-button--primary"
              @click="changeShowHeader">切换显示表头</button>
    </h3>
    
    <sf-table ref="sfTable"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="pagination"
              :sortParams="sortParams"
              :showIndex="showIndex"
              :showHeader="showHeader"
    >
      <template #id>
        <div>
          <a style='color: #409eff;cursor: pointer;'>删除</a>
        </div>
      </template>
    </sf-table>
  </div>
</template>

<script lang="ts">
import { SfTable } from '../src/table/ts/index'
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
import { SortParams, ColumnsRecord, Pagination, TableItem } from '../src/table/ts/types'
import { getColumns, getData } from './data'

export default defineComponent({
  name: 'App',
  components: {
    SfTable,
  },
  setup() {

    // 表格实例
    const sfTable = ref('')

    // 是否显示序号
    const showIndex = ref(true)

    // 是否显示表头
    const showHeader = ref(true)

    // 默认排序参数
    const sortParams: SortParams = reactive({
      name: 'age',
      direction: 'ASC',
    })

    // 默认分页参数
    const pagination: Pagination = reactive({
      isSupport: true,
      pageSize: 10
    })

    // 列数据
    const columns: ColumnsRecord[] = getColumns()

    // 表格数据
    const dataSource: TableItem[] = reactive([])

    onMounted(() => {
      let data = getData()
      sfTable.value?.loadData(data)
    })

    const changePagination = () => {
      pagination.isSupport = !pagination.isSupport;
    }

    const changeShowHeader = () => {
      showHeader.value = !showHeader.value;
    }

    const changeShowIndex = () => {
      showIndex.value = !showIndex.value;
    }

    return {
      sfTable,
      columns,
      dataSource,
      pagination,
      sortParams,
      showIndex,
      showHeader,
      changePagination,
      changeShowHeader,
      changeShowIndex
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
    transition: .1s;
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

.sf-button:focus, .sf-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
</style>
