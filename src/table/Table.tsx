/**
 * Created by uedc on 2021/10/11.
 */

import { computed, defineComponent } from '@vue/composition-api'
import { TablePublicProps, tableProps } from './types'

export default defineComponent({
  name: 'Table',
  props: tableProps,
  setup(props, { slots }) {
    const classes = useClasses(props)
    return () => {
      return (
        <div class='sf-table'>Hello World. {slots?.default?.()}
          <table>
              <thead>
                  <tr>
                      <th v-for="(item) in props?.columns">
                          11
                      </th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(row, key) in data">
                    
                </tr>
              </tbody>
          </table>
        </div>
      )
    }
  },
})

function useClasses (props: TablePublicProps) {
  return computed(() => {
    return {
      'test-class': props.test,
    }
  })
}