<template>
    <button 
        type="button"
        class="btn-next"
        :disabled="internalDisabled"
    >
        <span v-if="nextText">{{ nextText }}</span>
        <i v-else class="">{{ '下一页' }}</i>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

const nextProps = {
    disabled: {
        type: Boolean,
        default: false
    },
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
        console.log(props)
        const internalDisabled = computed(
            () => props.disabled || props.currentPage <= props.pagerCount
        )
        return {
            internalDisabled
        }
    }
    
})
</script>