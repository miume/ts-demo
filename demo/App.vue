<template>
  <div>
    <sf-table :columns="columns"
              :dataSource="data"
              :showIndex=true
              :total="total"
              :current-page="currentPage">
    </sf-table>
  </div>
</template>

<script lang="ts">
import { SfTable } from '../src/table'
import { onMounted, ref, reactive } from '@vue/composition-api'

interface record {
  id: number,
  name: string,
  age: number,
  description: string
}

interface columnsRecord {
    name: string,
    index: string,
    sortable?: Boolean
}

export default 
({
  name: 'App',
  components: {
    SfTable
  },
  setup() {

    let columns: columnsRecord[] = reactive([{
      name: '名称',
      index: 'name'
    }, {
      name: '年龄',
      index: 'age',
      sortable: true
    }, {
      name: '描述',
      index: 'description'
    }]);

    let data: record[] = reactive([{
            id: 1,
            name: '名称',
            age: 12,
            description: '111'
          }, {
            id: 2,
            name: '年龄',
            age: 12,
            description: '111'
          }, {
            id: 3,
            name: '描述',
            age: 14,
            description: '111'
          }]);

    let total: Number = ref(9);
    let currentPage: Number = ref(1);

    const loadData = () => {
        total = 9;
        currentPage = 1;
        data.push({
            id: 4,
            name: '名称',
            age: 6,
            description: '111'
          }, {
            id: 5,
            name: '年龄',
            age: 9,
            description: '111'
          }, {
            id: 7,
            name: '描述',
            age: 19,
            description: '111'
          },{
            id: 14,
            name: '名称',
            age: 16,
            description: '111'
          }, {
            id: 15,
            name: '年龄',
            age: 9,
            description: '111'
          }, {
            id: 17,
            name: '描述',
            age: 19,
            description: '111'
          });
    };

    onMounted(() => {
        loadData();
    })

    return { 
        columns,
        data,
        total,
        currentPage
     }
  },
})
</script>
