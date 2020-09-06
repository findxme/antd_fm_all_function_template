import { getRequest, postRequest,postFormRequest } from '../../common/utils/meHttpRequest';
const getFmBaseToDefineId = (data) => {
  return getRequest({proxy: 'proxy8897', path: 'fmAll/getFmBaseToDefineId'}, {...data});
  };

  const deleteData=(data)=>{
    return getRequest({proxy: 'proxy8897', path: 'fmAll/deleteData'}, {...data});
  };

  const submitBusinessFormData = (data) => {

    return postFormRequest({proxy: 'proxy8897', path: 'fmAll/submitBusinessFormData'},data);
    };
    const submitBusinessStartFormData = (data) => {

      return postFormRequest({proxy: 'proxy8897', path: 'fmAll/submitBusinessStartFormData'},data);
      };
  export default function(Arbiter,nameSpace) {
    return Arbiter.subscribes({ getFmBaseToDefineId,deleteData,submitBusinessFormData,submitBusinessStartFormData }, {nameSpace});
  };
  
