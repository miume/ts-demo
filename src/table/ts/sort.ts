import { reactive } from "@vue/composition-api"
import { SortParams } from './types'
import debug from 'debug'

const DEBUG = debug('sort:')

const ASC = 'ASC'
const DESC = 'DESC'

export default (props: SortParams) => {

    // 排序
    const state = reactive({
        name: props.name,
        direction: props.direction
    })

    // 更新排序
    const sort = (name: string, direction: string) => {

        if (direction && direction !== ASC && direction !== DESC ) {
            DEBUG('param error', '传入排序方式字段有误，只能是ASC、DESC或者空')
            return 
        }

        // 重复点击取消排序
        if (getName() === name && getDirection() === direction) {
            clearSort()
            return
        }
        state.name = name
        state.direction = direction
        DEBUG('update: ', `更新排序方式为: 按照${name}字段进行${direction}排序`)
    }

    // 清除排序条件
    const clearSort = () => {
        state.name = ''
        state.direction = ''
        DEBUG('update: ', `您当前取消了排序`)
    }

    // 获取排序字段
    const getName = () => {
        return state.name;
    }

    // 获取排序方向
    const getDirection = () => {
        return state.direction
    }

    // 渲染选中类
    const renderActiveClass = (name: string) => {
        if (name === getName()) {
            return getDirection() === ASC ? 'ascending' : 'descending'
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