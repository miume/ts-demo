<template>
  <div class="sf-pagination">
    <button
      type="button"
      class="btn-pre"
      :disabled="internalDisabled"
      @click="$emit('pre')">
      <i class="">{{ '上一页' }}</i>
    </button>

    <ul class="el-pager">
      <li v-for="page in pagers"
          :key="page"
          :class="{ active: currentPage === page }"
          class="number"
          @click="$emit('pageClick', page)">
        {{ page }}
      </li>
    </ul>

    <button
      type="button"
      class="btn-next"
      :disabled="nextDisabled"
      @click="$emit('next')">
      <i>{{ '下一页' }}</i>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

const nextProps = {
  currentPage: {
    type: Number,
    default: 1,
  },
  pagerCount: {
    type: Number,
    default: 1,
  },
} as const

export default defineComponent({
  name: 'Pagination',
  props: nextProps,
  emits: ['pageClick', 'pre', 'next'],
  setup(props) {
    const internalDisabled = computed(() => props.currentPage <= 1)
    const nextDisabled = computed(() => props.currentPage >= props.pagerCount)
    const pagers = computed(
      () => {
        const pagerCount = props.pagerCount
        const array: number[] = []
        for (let i = 0; i < pagerCount; i++) {
          array.push(i + 1)
        }
        return array
      },
    )
    return {
      internalDisabled,
      nextDisabled,
      pagers,
    }
  },

})
</script>
