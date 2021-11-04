## 项目图列

运行界面截图如下

![table](/images/table.png)

## sf-table

用于展示多条结构类似的数据，可对数据进行排序和自定义操作 


### 配置项    
| 参数      | 说明 | 类型    |    可选值      |默认值    |
| :---        |    :----:   |          ---: |          ---: |          :--- |
| columns      |  列       | Array   |-       | []   |
| dataSource   | 数据        | Array      |-       | []   |
| startIndex   | 显示序号        | Number      |0       | 大于0表示 显示序号   |
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



## sf-pagination

当数据量过多时，使用分页器进行处理

### 配置项

| 参数     |     说明     |    类型 |     可选值 | 默认值 |
| :------- | :----------: | ------: | ---------: | :----- |
| total     |     总数     |  number |          - | 0     |
| pageSize    |   每页显示数据数量   |  number |          - | 10     |
| current | 当前页数 | number | - | 1  |

### pagination Methods

| 方法名    |               说明               | 参数                           |
| :-------- | :------------------------------: | :----------------------------- |
| handlePageChange  |         监听分页事件         | current: number                           |



## 单元测试覆盖率

单元测试分为两部分：表格和分页，覆盖率为100%

## ![test_result](/images/test_result.png)