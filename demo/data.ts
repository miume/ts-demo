

export const getData = () => {
	const data = [];
	for (let i = 0; i < 90; i++) {
		data.push({
			id: 4 + i,
			name: '名称' + i,
			age: 6 + i,
			description: '111' + i,
		})
	}
	return data;
}

export const getThirdData = () => {
	const data = [];
	const ages = [13, 16, 1, 13, 20]
	for (let i = 0; i < 5; i++) {
		data.push({
			id: i,
			name: 'abc' + i,
			age: ages[i],
			description: '22' + i,
		})
	}
	return data;
}

export const getColumns = () => {
	return [{
		name: '名称',
		index: 'name',
		sortable: true
	}, {
		name: '年龄',
		index: 'age',
		sortable: true,
	}, {
		name: '描述',
		index: 'description',
	}, {
		name: '操作',
		index: 'id',
	}]
}

