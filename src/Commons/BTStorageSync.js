/**
 * Created by leezhihua on 2018/7/5
 * @flow
 * */
'use strict';

import React from 'react';

let start = 0;
let citys = [];


const sync = {

    // sync里的方法的名字必须和所存数据的key完全相同，eg：citys()
    // 方法接受的参数为一整个object，所有参数从object中解构取出,如下：
    // let {resolve, reject, syncParams: {fetchOptions}} = params;
    // 请求需要的参数都在extraFetchOptions里
    // 调用resolve无缝返回结果或reject返回错误。


    //侧边栏菜单
    menu(params) {
        let {resolve, reject} = params;
        let url = 'https://news-at.zhihu.com/api/4/themes';
        console.log(url);
        BTFetch.fetchGET(url)
            .then((res)=>{
                console.log(res);
                let data = res.others;
                data.unshift({thumbnail:'',name:'首页'});
                BTStorage.save('menu', data);
                resolve(data);
            })
            .catch((error)=>{
                console.log('请求错误'+error);
                reject(error);
            });
    },
}

export default sync;