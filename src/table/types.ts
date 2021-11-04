/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PropOptions, PropType } from 'vue-types/dist/types'
type Prop<T, D = T> = PropOptions<T, D> | PropType<T>
type PublicRequiredKeys<T> = {
	[K in keyof T]: T[K] extends { required: true } ? K : never
}[keyof T]

type PublicOptionalKeys<T> = Exclude<keyof T, PublicRequiredKeys<T>>
type InferPropType<T> = T extends null
	? any // null & true would fail to infer
	: T extends { type: null | true }
	? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
	: T extends ObjectConstructor | { type: ObjectConstructor }
	? Record<string, any>
	: T extends BooleanConstructor | { type: BooleanConstructor }
	? boolean
	: T extends Prop<infer V, infer D>
	? unknown extends V
	? D
	: V
	: T

// eslint-disable-next-line @typescript-eslint/ban-types
export type IxPublicPropTypes<O> = O extends object
	? { [K in PublicRequiredKeys<O>]: InferPropType<O[K]> } & { [K in PublicOptionalKeys<O>]?: InferPropType<O[K]> }
	: { [K in string]: any }


export interface TableItem {
	id: number
	name: string
	age: number
	description: string
}

export interface Pagination {
	pageSize: number,
	total: number
}

export interface ColumnsRecord {
	name: string
	index: string
	renderFn?: Function
	sortable?: boolean
	sortFn?: Function
}

export interface SortParams {
	name: string
	direction: string
}

// 排序信息
export enum SortDirectionEnum {
	asc = 'ASC',
	desc = 'DESC',
	none = ''
}

export type SortDirection = 'ASC' | 'DESC' | ''

// Props 定义在这里
export const tableProps = {
	columns: {
		type: Array as PropType<Array<Record<string, any>>>,
		default: () => [],
	},
	dataSource: {
		type: Array as PropType<Array<Record<string, any>>>,
		default: () => [],
	},
	startIndex: {
		type: Number,
		default: 0
	},
	showHeader: {
		type: Boolean,
		default: true
	},
	sortParams: {
		type: Object as PropType<SortParams>,
		default: () => {
			return {
				name: '',
				direction: ''
			}
		},
	},
	emptyText: {
		type: String,
		default: '暂无数据'
	}
}

export type TablePublicProps = IxPublicPropTypes<typeof tableProps>



