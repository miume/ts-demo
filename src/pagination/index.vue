<template>
    <div class="sf-pagination">
        <prev :currentPage="currentPage"
              @click="prevClick"></prev>
        <pager :currentPage="currentPage" 
               :pagerCount="pagerCount"></pager>
        <next :currentPage="currentPage"
              @click="nextClick"></next>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from '@vue/composition-api'
import prev from './components/prev.vue';
import next from './components/next.vue';
import pager from './components/pager.vue';
const paginationProps = {
    currentPage: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    }
} as const;
export default defineComponent({
    name: 'pagination',
    components: {
        prev,
        next,
        pager
    },
    props: paginationProps,
    setup(props) {
        let { currentPage } = toRefs(props);
        const pagerCount: Number = computed(() => {
                return Math.ceil(props.total / 10);
            })
        const updateCurrentPage = (currentPage: Number) => {
            currentPage = currentPage;
        }
        const prevClick = () => {
            if (props.disabled) return
            currentPageBridge.value -= 1
            currentPage -= 1;
            emit('prev-click', currentPageBridge.value)
        }

        return {
            pagerCount,
            currentPage,
            props,
            prevClick
        }
    }
})
</script>
<style lang="less">
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
            li {
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