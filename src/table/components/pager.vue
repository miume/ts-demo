<template>
    <ul class="el-pager"
        @click="$emit('click', $event)">
        <li v-for="page in pagers" 
            :key="page"
            :class="{ active: currentPage === page, disabled }"
            class="number">
            {{ page }}
        </li>
    </ul>
</template>

<script lang="ts">

const PaginationPagerProps = {
    currentPage: {
        type: Number,
        default: 1
    },
    pagerCount: {
        type: Number,
        required: true
    },
    disabled: Boolean
} as const;

import { defineComponent, computed } from '@vue/composition-api';
export default defineComponent({
    name: 'pager',
    props: PaginationPagerProps,
    emits: ['click'],
    setup(props, { emit }) {
        const pagers = computed(
            () => {
                const pagerCount = props.pagerCount;
                const array: number[] = [];
                for (let i = 0; i < pagerCount; i++) {
                    array.push(i + 1);
                }
                return array;
            }
        )
        return {
            pagers
        }
    }
})
</script>