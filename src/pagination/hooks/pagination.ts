import { reactive, toRefs } from "@vue/composition-api"
import debug from 'debug'

const LOG = debug('pagination info:')

export default () => {

    // 当前页
    const state = reactive({
        cur: 1
    })

    // 点击上一页
    const pre = () => {
        state.cur -= 1;
        LOG('分页：点击上一页')
    }

    // 点击下一页
    const next = () => {
        state.cur += 1;
        LOG('分页：点击下一页')
    }

    /**
     * 点击页数
     * @param page 当前页数
     */
    const pageClick = (page: number) => {
        state.cur = page;
        LOG(`分页：您当前点击第${page}页`)
    }

    return {
        ...toRefs(state),
        pre,
        next,
        pageClick
    }
}