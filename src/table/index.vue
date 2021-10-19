<template>
    <div>
       <div class='sf-table'>
          <table>
              <thead>
                  <tr>
                      <th v-if="showIndex">序号</th>
                      <th v-for="(item) in props.columns" 
                          :key="item.index">
                           <div style="display: flex"> 
                               <div>{{ item.name }}</div>
                                <div v-if="item.sortable" class="sort">
                                    <div class="sort-item" @click="asc(`${item.index}`)">^</div>
                                    <div class="sort-item" @click="desc(`${item.index}`)">^</div>
                                </div>
                        </div>
                      </th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(row, key) in tableList.list" 
                    :key="key">
                    <td v-if="props.showIndex">{{ startIndex + key + 1 }}</td>
                    <td v-for="(col, key2) in props.columns" 
                        :key="key2">
                        <template v-if="col.render">
                            <Render :columns="col"
                                    :row="row"
                                    :index="key1"
                                    :render="col.render"></Render>
                        </template>
                        <template v-else>
                            {{ row[col.index] }}
                        </template>
                    </td>
                </tr>
              </tbody>
          </table>
          <div class="sf-pagination">
                <prev :currentPage="currentPageNumber"
                      @click="handleChangePageNumber"></prev>
                <pager :currentPage="currentPageNumber" 
                        @click="pageClick"
                       :pagerCount="pagerCount"></pager>
                <next :currentPage="currentPageNumber"
                      :pagerCount="pagerCount"
                       @click="handleChangePageNumber"></next>
        </div>
        </div>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent, reactive, ref, watch} from '@vue/composition-api'; 
import { tableProps, record } from './types';
import prev from './components/prev.vue';
import pager from './components/pager.vue';
import next from './components/next.vue';
export default defineComponent({
    name: 'Table',
    props: tableProps,
    components: {
        prev,
        pager,
        next
    },
    setup(props) {
        const currentPageNumber: Number = ref(1); // 当前页数
        const total: Number = ref(props.total); // 数据总数
        const onePageNumber: Number = ref(3); // 默认每页显示数量

        // 记录启示index
        const startIndex = ref(0);
        const endIndex = ref(0);


        // 总页数
        const pagerCount = computed(() => Math.ceil(total.value / onePageNumber.value) )

        // 初始数据
        const defaultTableList = reactive({
                list: props.dataSource as record[]
        })

        // 表格渲染数据（动态）
        const tableList = reactive({
            list: props.dataSource as record[]
        })


        // 更新表格数据
        const updateData = (data?: record[]) => {
            if (data) {
                tableList.list = data;
            }
            
        }

        // 更新当前页
        const updateCurrentPage = (page: Number) => {
            currentPageNumber.value = page;
        }

        // 排序
        const asc = (type: String):void => {
            tableList.list.sort((a: record, b: record) =>  a[type] - b[type]);
        }
        const desc = (type: String):void => {
            tableList.list.sort((a, b) =>  b[type] - a[type]);
        }


        // 点击上一页，下一页
        const handleChangePageNumber = (pre: Boolean) => {
            pre ? currentPageNumber.value-- : currentPageNumber.value++;
        }

        // 点击中间页数
        const pageClick = (obj: Object) => {
            var page: Number = parseInt(obj?.target?.innerText, 10);
            currentPageNumber.value = page;
        }

    
        // 监听分页器 更新表格渲染数据
        watch(currentPageNumber, () => {
            startIndex.value = (currentPageNumber.value-1) * onePageNumber.value;
            endIndex.value = currentPageNumber.value*onePageNumber.value;
            tableList.list = defaultTableList.list.slice(startIndex.value, endIndex.value)
        }, {immediate:true})

        return {
            asc, 
            props,
            pagerCount,
            tableList,
            desc,
            currentPageNumber,
            handleChangePageNumber,
            pageClick,
            startIndex
        }
    },
    })
    </script>

<style lang="less">
    .sf-table {
       table{
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            empty-cells: show;
            border: 1px solid #e9e9e9;
            .sort {
                padding-left: 5px;
            }
            .sort-item {
                height: 8px;
                cursor: pointer;
            }
        }
        table th{
            background: #f7f7f7;
            color: #5c6b77;
            font-weight: 600;
        }
        table td, table th{
            padding: 8px 16px;
            border: 1px solid #e9e9e9;
            text-align: left;
        }
    }
    .sf-pagination {
        display: flex;
        padding: 10px;
        .btn-pre {
            padding-right: 12px;
        }
        .btn-next {
            padding-left: 12px;
        }
        .el-pager {
            display: flex;
            .number {
                text-align: center;
                min-width: 22px;
                cursor: pointer;
            }
            .active {
                color: #409eff;
            }
        }
    }
</style>