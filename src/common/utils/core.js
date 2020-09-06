import { Super, selfExe } from './index';

const { ViewModel } = selfExe(Super);

if (typeof Array.from !== 'function') { // IE 兼容
  Array.from = function(attr, func) {
    const {length = 0} = attr || {};
    const result = [];
    for(let i = 0; i < length; i++) {
      result.push(func && func(null, i));
    }
    return result;
  }
}

export { ViewModel } ;