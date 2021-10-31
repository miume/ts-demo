import TestTable from '../table/index.vue'
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import { mount  } from '@vue/test-utils'
import { getColumns, getData } from '../../demo/data'

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
        emptyText: '测试空数据文案',
        dataSource: []
      }
    })

    expect(wrapper.find('.sf-table-empty').isVisible()).toBe(true);
    expect(wrapper.find('.sf-table-empty').text()).toBe('测试空数据文案');
  })

    // 测试默认空数据
    test('props dataSource empty', () => {
      const wrapper = TableMount({
        propsData: {
          dataSource: [],
        }
      })
  
      expect(wrapper.find('.sf-table-empty').isVisible()).toBe(true);
      expect(wrapper.find('.sf-table-empty').text()).toBe('暂无数据');
    })

  // 是否显示序号
  test('props showIndex', () => {
    const wrapper = TableMount({
      propsData: {
        dataSource: getData(),
        showIndex: true,
      },
    })

    expect(wrapper.find('.sf-table-index').exists()).toBeTruthy()
  })

  test('props showIndex', () => {
    const wrapper = TableMount({
      propsData: {
        dataSource: getData(),
        showIndex: false,
      },

    })
    expect(wrapper.find('.sf-table-index').exists()).toBe(false)
  })

  // 是否显示分页
  test('props pagination', () => {
    const wrapper = TableMount({
      propsData: {
        dataSource: [{
          id: 4,
          name: '名称',
          age: 6,
          description: '111'
        }],
        pagination: {
          isSupport: true
        },
      },
    })

    expect(wrapper.find('.sf-pagination').exists()).toBeFalsy()
  })

  test('props pagination', () => {
    const wrapper = TableMount({
      propsData: {
        dataSource: getData(),
        pagination: {
          isSupport: false
        }
      },
    })
    expect(wrapper.find('.sf-pagination').exists()).toBeFalsy()
  })

  // 测试表头是否显示，是否没数据
  test('props tbody tr', () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: []
      }
    })

    expect(wrapper.findAll('.sf-table thead tr > th').length).toEqual(getColumns().length)  // 表头存在
    expect(wrapper.findAll('.sf-table tbody > tr').length).toEqual(0) // 数据不存在
  })

  // 测试表格是否有数据
  // 测试分页功能是否正确
  test('props tbody tr', async () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData()
      }
    })

    expect(wrapper.findAll('.sf-table tbody > tr').length).toEqual(10)
  })

  // 测试是否显示表头
  test('props showHeader', () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData(),
        showHeader: true
      }
    })

    expect(wrapper.find('.sf-table-thead').exists()).toBeTruthy()
  })

  test('props showHeader', () => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData(),
        showHeader: false
      }
    })
    expect(wrapper.find('.sf-table-thead').exists()).toBeFalsy()
  })

  // 测试分页
  test('props pagination', async() => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData(),
        pagination: {
          isSupport: true,
          pageSize: 10
        }
      }
    })
    expect(wrapper.find('.sf-pagination .el-pager .number.active').text()).toEqual('1')
    await wrapper.find('button.btn-next').trigger('click')
    expect(wrapper.find('.sf-pagination .el-pager .number.active').text()).toEqual('2')

    await wrapper.find('button.btn-pre').trigger('click')
    expect(wrapper.find('.sf-pagination .el-pager .number.active').text()).toEqual('1')

    await wrapper.find('.sf-pagination .el-pager .number:nth-child(3)').trigger('click')
    expect(wrapper.find('.sf-pagination .el-pager .number.active').text()).toEqual('3')
  })


  // 测试排序
  test('props pagination', async() => {
    const wrapper = TableMount({
      propsData: {
        columns: getColumns(),
        dataSource: getData(),
        sortParams: {
          name: 'age',
          direction: 'ASC'
        }
      }
    })
    // 切换排序
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeTruthy()
    await wrapper.find('.sf-table th.ascending .sort-item.descending').trigger('click')
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeFalsy()
    expect(wrapper.find('.sf-table th.descending').exists()).toBeTruthy()

    await wrapper.find('.sf-table th.descending .sort-item.ascending').trigger('click')
    expect(wrapper.find('.sf-table th.descending').exists()).toBeFalsy()


    await wrapper.find('.sf-table th.ascending .sort-item.ascending').trigger('click')
    expect(wrapper.find('.sf-table th.ascending').exists()).toBeFalsy()
    expect(wrapper.find('.sf-table th.descending').exists()).toBeFalsy()

    // 动态加载数据
    await wrapper.vm.loadData([{ id: 1, name: '2323', age: 13, description: '23234' },
    { id: 2, name: 'af23', age: 15, description: '23234' },
    { id: 4, name: 'af23', age: 15, description: '23234' },
    { id: 3, name: '测试23', age: 5, description: '23234' }])

    // 切换不同字段排序（降序升序）
    await wrapper.vm.sort('age', 'ASC')
    await wrapper.vm.sort('age', 'DESC')
    await wrapper.vm.sort('age', 'wec')
    await wrapper.vm.sort('name', 'ASC')
    await wrapper.vm.sort('name', 'DESC')
  })
})
