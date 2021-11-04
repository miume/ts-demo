import SfPagination from '../pagination/index.vue'
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import { mount  } from '@vue/test-utils'

Vue.use(CompositionApi)

// 测试分页器
describe('pagination', () => {
  const PaginationMount = options => mount(SfPagination, options)

  test('render', () => {
    const wrapper = PaginationMount()
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => {
      wrapper.vm.$forceUpdate()
      wrapper.vm.$destroy()
    }).not.toThrow()
  })

   // 测试分页
   test('props pagination', async() => {
    const wrapper = PaginationMount({
      propsData: {
        pagination: {
          current: 1,
          total: 89,
          pageSize: 10
        }
      }
    })

    // 默认 显示第一页
    expect(wrapper.find('.sf-pagination .sf-pager .number.active').text()).toEqual('1')

    // 点击下一页 显示第2页
    await wrapper.find('button.btn-next').trigger('click')
    expect(wrapper.find('.sf-pagination .sf-pager .number.active').text()).toEqual('2')

    // 点击上一页 显示第一页
    await wrapper.find('button.btn-pre').trigger('click')
    expect(wrapper.find('.sf-pagination .sf-pager .number.active').text()).toEqual('1')

    // 点击第三页 显示第三页
    await wrapper.find('.sf-pagination .sf-pager .number:nth-child(3)').trigger('click')
    expect(wrapper.find('.sf-pagination .sf-pager .number.active').text()).toEqual('3')

    // 找到激活类 判断数字显示为3
    expect(wrapper.find('.sf-pagination .sf-pager .number:nth-child(3)').text()).toEqual('3')

    // 总页数 为 9
    expect(wrapper.findAll('.sf-pagination .sf-pager .number').length).toEqual(9)
  })
})
