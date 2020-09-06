/**
 * 转换表单数据列表数据
 * @param fields
 * @param attributes
 * @param total
 * @returns {{columns: Array, source: *}}
 */
import { Divider, Icon } from 'antd';
export function getFormTableData(fmData, fields, total) {
  const columns = [];
  let i = 0;
  fields && columns.push(xh);
  let colWidthSum = 0
  fields.forEach((item) => {
    // 是否可见，字段类型，字段别名，字段中文名，表名，字段表中的名字
    const { visible, fieldType, fieldName, fieldAlias, tableName, colName, colWidth } = item;
    if (visible === 1) {
      // 如果类型为一下之一
      if (['DDL', 'CHK', 'RDO'].includes(fieldType)) {
        const { keyTypeList: items = [] } = item;
        const result = {};
        items && items.forEach(mtItem => {
          const { id, text } = mtItem;
          result[id] = text;
        });
        // fmData.length && fmData.forEach(record => {
        //   record.tableId =index+1;
        // })
        fmData.length && fmData.forEach((record, index) => {
          record[fieldName] = result[record[fieldName]];

        });
      } else if (fieldType === 'TREE') {
        const { mtValue: items = [] } = item;
        const map = treeToMap(items);
        items && fmData.length && fmData.forEach(record => {
          record[fieldName] = map[record[fieldName]].text;
        });
      }
      let column = {
        name: fieldName,
        alias: fieldAlias || fieldName,
        table: tableName,
        col: colName,
        title: fieldAlias,
        dataIndex: fieldName || fieldAlias,
        key: fieldName || fieldAlias,
        width: colWidth === null || colWidth === undefined ? 200 : colWidth,
      };
      columns.push(column);
      // 计算最大宽度,默认的快递为250
      colWidthSum += colWidthSum + colWidth === null || colWidth === undefined ? 200 : colWidth
    }
  });

  let formId = "";
  if (fields.length > 0) {
    formId = fields[0].formId;
  }
  // 数据
  fmData.length && fmData.forEach((item, index) => {
    item.formId = formId;
    item.xh = index + 1;
    item.key = item.BID;
  })
  /**
   * columns 整理后的表头，
   * source 翻译后的数据
   * total 数据条数
   * fields 原本返回的表头
   * formId 表单id
   */
  return { columns, source: fmData, total, fields, formId, colWidthSum };
}

// 给一个序号供给展示使用// 按钮权限


const xh = {
  title: '序号',
  key: 'xh',
  fixed: 'left',
  width: 80,
  render: (text, record, index) => (
    <a> {index + 1} </a>

  ),
}