<template>
    <button 
        type="button"
        class="btn-pre"
        :disabled="internalDisabled"
        @click="$emit('click', $event)"
    >
    <span v-if="prevText">{{ prevText }}</span>
    <i v-else class="">{{ '上一页' }}</i>
    </button>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

const pervProps = {
    disabled: Boolean,
    currentPage: {
        type: Number,
        default: 1
    },
    prevTexy: {
        type: String,
        default: ''
    }
} as const

export default defineComponent({
    name: 'prev',
    props: pervProps,
    emits: ['click'],
    setup(props) {
        const internalDisabled = computed(
            () => props.disabled || props.currentPage <= 1
        )
        return {
            internalDisabled
        }
    }
    
})
</script>