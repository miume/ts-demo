## sf-table
用于展示多条结构类似的数据，可对数据进行排序、分页和其它自定义操作 

示例


### 配置项    
| 参数      | 说明 | 类型    |    可选值      |默认值    |
| :---        |    :----:   |          ---: |          ---: |          :--- |
| columns      |  列       | Array   |-       | []   |
| dataSource   | 数据        | Array      |-       | []   |
| showIndex   | 显示序号        | Boolean      |true/false       | false   |
| pagination   | 分页参数        | object     |       | { isSupport: false, pageSize: 10, current: 1 }   |
| showHeader | 显示表头 | Boolean | true/false | true |
| sortParams | 排序参数 | object | - | { name: '', direction: '' } |
| emptyText | 空数据文本 | string | - | 暂无数据 |



### Table Methods

| 方法名    |               说明               | 参数                           |
| :-------- | :------------------------------: | :----------------------------- |
| loadData  |         动态加载表格数据         | []                             |
| clearSort | 清除排序条件，数据恢复成初始状态 | 无                             |
| sort      |       手动对table进行排序        | name:string, direction: string |

### Table column 属性

| 参数     |     说明     |    类型 |     可选值 | 默认值 |
| :------- | :----------: | ------: | ---------: | :----- |
| name     |     列名     |  string |          - | []     |
| index    |   字段索引   |  string |          - | []     |
| sortable | 是否支持排序 | Boolean | true/false | false  |

### Table pagination 属性

| 参数     |     说明     |    类型 |     可选值 | 默认值 |
| :------- | :----------: | ------: | ---------: | :----- |
| isSupport     |     是否支持分页     |  Boolean |          - | false     |
| pageSize    |   每页显示数据数量   |  number |          - | 10     |
| current | 当前页数 | number | - | 1  |