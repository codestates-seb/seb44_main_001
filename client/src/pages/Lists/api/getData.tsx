import axios from 'axios';

export const getData = (category:string) => {
    axios('url',{
        params:{
            region: '광진구',
            category:category
        }
    })
    .then((res)=>{
        console.log(res);
        return res.data
    })
    .catch((err)=>{
        console.error(`Fail to get. ${err}`);
    })
};
