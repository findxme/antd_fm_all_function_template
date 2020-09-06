import { getTypeList } from '../actions';
export default {
    namespace: 'bookEnter', /// namespace 表示在全局 state 上的 key
    state: {   
    },
 
    effects: {
        * init({}, { call, put, select }){
            const todos = yield select(state => state.bookEnter);
            console.log(todos);
            yield put({
                type: 'initState',
                payload:{
                }
            })
        },
        * onChange({payload,callback}, { call, put, select }){
            const res = yield call(getTypeList);
            // if(res){
            // alert(res)
            // }
            yield put({
                type: 'initState',
                payload:{value: payload.toolParams.target.value}
            })

        },
        * handleSubmit({payload}){
            alert("qweqw")
        },
    
       
    },
  
  
    reducers: {
        initState(state, { payload }) {
        // 连接两个数组
        //   const todos = state.todos.concat(todo);
        // 合并两个json的方法
            Object.assign(state, payload)
              return  { ...state };
        }
      
    }
}