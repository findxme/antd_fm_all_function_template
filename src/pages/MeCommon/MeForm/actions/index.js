import { getRequest, postRequest,postFormRequest } from '../../common/utils/meHttpRequest';
const submitBusinessFormData = (data) => {

  return postFormRequest({proxy: 'proxy8897', path: 'fmAll/submitBusinessFormData'},data);
  };

  const deleteData=(data)=>{
    return getRequest({proxy: 'proxy8897', path: 'fmAll/deleteData'}, {fromDefineId:'3682688506104',...data});
  };


  export default function(Arbiter,nameSpace) {
    return Arbiter.subscribes({ submitBusinessFormData,deleteData }, {nameSpace:"me.form"});
  };
  
