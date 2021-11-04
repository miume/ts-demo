import { reactive } from "@vue/composition-api"
import { SortParams, SortDirection } from '../types'
import debug from 'debug'

const DEBUG = debug('sort-info:debug ') // 开发日志
const LOG = debug('sort-info:log ')

const ASC = 'ASC'
const ASC_CLS = 'ascending' 
const DESC_CLS = 'descending'

export default (props: SortParams) => {

    // 排序
    const state = reactive({
        name: props.name,
        direction: props.direction
    })

    // 更新排序
    const sort = (name: string, direction: SortDirection) => {

        // 重复点击取消排序
        if (getName() === name && getDirection() === direction) {
            clearSort()
            return
        }
        state.name = name
        state.direction = direction
        LOG('切换排序')
        DEBUG(`update: 更新排序方式为: 按照${name}字段进行${direction}排序`)
    }

    // 清除排序条件
    const clearSort = () => {
        state.name = ''
        state.direction = ''
        DEBUG('update: 您当前取消了排序')
    }

    // 获取排序字段
    const getName = () => state.name

    // 获取排序方向
    const getDirection = () => state.direction

    // 渲染选中类
    const renderActiveClass = (name: string) => {
        if (name === getName()) {
            return getDirection() === ASC ? ASC_CLS : DESC_CLS
        } 
        return ''
    }
    
    return {
        sort,
        getName,
        getDirection,
        renderActiveClass,
        clearSort
    }
}