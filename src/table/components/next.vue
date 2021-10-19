<template>
    <button 
        type="button"
        class="btn-next"
        :disabled="internalDisabled"
        @click="$emit('click', false)"
    >
        <i class="">{{ '下一页' }}</i>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

const nextProps = {
    disabled: Boolean,
    currentPage: {
        type: Number,
        default: 1
    },
    pagerCount: {
        type: Number,
        default: 1
    }
} as const

export default defineComponent({
    name: 'next',
    props: nextProps,
    emits: ['click'],
    setup(props) {
        const internalDisabled = computed(
            () => props.disabled || props.currentPage >= props.pagerCount
        )
        return {
            internalDisabled
        }
    }
    
})
</script>