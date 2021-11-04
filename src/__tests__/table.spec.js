import TestTable from '../table/index.vue'
import SfPagination from '../pagination/index.vue'
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import { mount  } from '@vue/test-utils'
import { getColumns, getData, getOtherData, getThirdData } from '../../demo/data'

Vue.use(CompositionApi)

describe('Table', () => {
  const TableMount = options => mount(TestTable, options)

  test('render', () => {
    const wrapper = TableMount()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

   // 测试自定义空文案
   test('props emptyText', async () => {
    const wrapper = TableMount({
      propsData: {
        dataSource: []
      }
    })

    expect(wrapper.find('.sf-table-empty').isVisible()).toBe(true);
    expect(wrapper.find('.sf-table-empty').text()).toBe('暂无数据');
    await wrapper.setProps({ emptyText: '测试空数据文案' })
    expect(wrapper.find('.sf-table-empty').isVisible()).toBe(true);
    expect(wrapper.find('.sf-table-empty').text()).toBe('测试空数据文案');
  })

  // 是否显示序号
  test('props startIndex', async() => {
    const wrapper = TableMount({
      propsData: {
        dataSource: getData(),
        columns: getColumns(),
        startIndex: 1,
      },
    })

    expect(wrapper.find('.sf-table-index').exists()).toBeTruthy()
    await wrapper.setProps({ startIndex: 0 })
    expect(wrapper.find('.sf-table-index').exists()).toBe(false)
  })

  // 测试表头是否显示，数据总量
  test('props tbody tr', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: []
      }
    })
    expect(wrapper.findAll('.sf-table thead tr > th').length).toEqual(getColumns().length)  // 表头存在

    await wrapper.setProps({ dataSource: getData() })
    expect(wrapper.findAll('.sf-table tbody > tr').length).toEqual(getData().length)
  })

  // 测试是否显示表头
  test('props showHeader', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData(),
        showHeader: true
      }
    })

    expect(wrapper.find('.sf-table-thead').exists()).toBeTruthy()
    await wrapper.setProps({ showHeader: false })
    expect(wrapper.find('.sf-table-thead').exists()).toBeFalsy()
  })

  // 测试排序



  // 按单个字段排序
  test('props sort', async() => {
    const data = getData()
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: data,
        sortParams: {
          name: 'age',
          direction: 'ASC'
        }
      }
    })
    // 切换排序

    // 默认升序
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeTruthy()

    // 点击降序
    await wrapper.find('.sf-table th.ascending .sort-item.descending').trigger('click')
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeFalsy()
    expect(wrapper.find('.sf-table th.descending').exists()).toBeTruthy()

    // 点击升序
    await wrapper.find('.sf-table th.descending .sort-item.ascending').trigger('click')
    expect(wrapper.find('.sf-table th.descending').exists()).toBeFalsy()

    // 再次点击升序 取消排序
    await wrapper.find('.sf-table th.ascending .sort-item.ascending').trigger('click')
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeFalsy()
    expect(wrapper.find('.sf-table th.descending').exists()).toBeFalsy()

    // 取消排序后，验证第一行数据的age列的值 是否为 data[0].age
    expect(parseInt(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text())).toEqual(data[0].age)
  })
  
  // 切换不同字段排序
  test('props sort', async() => {
    const data = getThirdData()
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: data,
        sortParams: {
          name: 'age',
          direction: 'ASC'
        }
      }
    })

    // 按照age升序排列，验证第一行数据的age列的值 是否为 初始数据data[2].age
    expect(parseInt(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text())).toEqual(data[2].age)


    // 切换按age 降序排列
    await wrapper.vm.sort('age', 'DESC')
    // 验证第一行数据的age列的值 是否为 初始数据data[4].age
    expect(parseInt(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text())).toEqual(data[4].age)

    // 切换按照name 字段 升序
    await wrapper.vm.sort('name', 'ASC')
    // 验证第一行数据的名称name列的值 是否为 初始数据data[0].name
    expect(wrapper.find('.sf-table tbody tr:first-child td:nth-child(1)').text()).toEqual(data[0].name)

    // 切换按照name 字段 降序
    await wrapper.vm.sort('name', 'DESC')
    // 验证第一行数据的名称name列的值 是否为 初始数据data[4].name
    expect(wrapper.find('.sf-table tbody tr:first-child td:nth-child(1)').text()).toEqual(data[4].name)

    // await wrapper.find('.sf-table th.descending .sort-item.descending').trigger('click')
    // await wrapper.setProps({ dataSource: getOtherData() })
    // expect(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text()).toEqual('13')
    // await wrapper.vm.sort('age', 'DESC')
    // expect(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text()).toEqual('20')
    // await wrapper.vm.sort('age', 'ASC')
    // expect(wrapper.find('.sf-table tbody tr:first-child td:nth-child(2)').text()).toEqual('1')
  })
})
