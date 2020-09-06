export default function (Arbiter, pkey) {


    const initState = () => {
        const evts = {
            initData: () => {
                const { meSearchCtrl: { tableFields } } = this.props
                let tableFieldJsons = {}
                let tableFieldsVisible = tableFields.filter(item => {
                    const { visible } = item;
                    if (visible === 1) {
                        return item
                    }
                })
                for (let i = 0; i < tableFields.length; i++) {
                    const { visible, colName } = tableFields[i];
                    if (visible === 1) {
                        tableFieldJsons[colName] = tableFields[i]
                    }
                }
                this.setState({
                    tableFields: tableFieldsVisible,
                    tableFieldJsons: tableFieldJsons
                })
            },

            // 字段值更新的时候触发的函数
            /**
             * changedFields 更新的字段
             * allFields // 全部字段
             */
            onValuesChange: (changedFields, allFields) => {
                const { tableFields, tableFieldJsons } = this.state
                const { tables } = allFields
                // 计算出填入表单的下拉的key
                let selectedMeName = []

                for (let i = 0; i < tables.length; i++) {
                    if (tables[i] != undefined) {
                        let { meName: { key, label, value } = {} } = tables[i]
                        if (value != null) {
                            selectedMeName.push(value)
                        }
                    }
                }
                let selectedAllMe = []
                // 从初始化的json中找到全部的下拉条件
                for (let key in tableFieldJsons) {
                    selectedAllMe.push(key)
                }

                var subset = [];
                // 找到为填入的key
                if (selectedMeName.length != 0) {
                    var set1 = new Set(selectedAllMe);
                    var set2 = new Set(selectedMeName);
                    for (let item of set1) {
                        if (!set2.has(item)) {
                            subset.push(item);
                        }
                    }
                }
                // 通过未填入的key找到对应的json
                let fields = []
                if (tables.length != 0) {
                    if (selectedMeName.length != 0) {
                        for (let key of subset) {
                            fields.push(tableFieldJsons[key])
                        }
                        this.setState({ tableFields: fields })
                    }

                } else {
                    for (let key in tableFieldJsons) {
                        fields.push(tableFieldJsons[key])
                    }
                    this.setState({ tableFields: fields })
                }
            },
            // 拼接提交的表单数据
            onFinish: (value) => {
                const { tables = [] } = value
                let conditionList = []
                if (tables.length != 0) {

                    for (let i = 0; i < tables.length; i++) {
                        const { meQueryMethod, meName = {}, meValue } = tables[i];
                        const { value } = meName;
                        if (meQueryMethod === '=') {
                            conditionList.push(' ' + value + ' = \'' + `${meValue}` + '\' ')

                        } else {
                            conditionList.push(" " + value + " like '%" + `${meValue}` + "%' ")
                        }
                    }
                }
                const { meSearchCtrl: { onQuerySearch } } = this.props
                let condition = conditionList.join("and")
                onQuerySearch({ condition: condition })
            },
            onResetQuery: () => {
                const { meSearchCtrl: { onQuerySearch } } = this.props
                onQuerySearch()
            }
        }
        this.setState({ tools: { evts } }, evts.initData);
    }
    this.setState({ loading: true, tableFields: null, tableFieldJsons: null }, initState);

}