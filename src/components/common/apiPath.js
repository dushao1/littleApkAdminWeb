'use strict';
let apiConfig= {
        
  // baseIp:'yjsc.2012626.com',
  // basePath: 'http://yjsc.2012626.com/yjsc',
  // socketPath:'ws://yjsc.2012626.com/yjsc/websocket',

  baseIp: 'localhost',
  basePath: 'http://localhost:8804/yjsc',
  socketPath: 'ws://localhost:8804/yjsc/websocket',
  login: '/admin/login',
  addNoChekc:'/admin/addNoCheck',
  getNoCheckList:'/admin/getNoCheckList',
  deleteNoCheck:'/admin/deleteNoCheck',
  allStore:'/store/allStore',
  updateStore:'/backgroundStore/updateStroe',
  addStore:'/backgroundStore/addStore',
  allUsers:'/backgroundAdmin/allUsers',
  messageRecordList:'/admin/messageRecordList',
  addBack:'/admin/addBack',
  updateMessageInfo:'/admin/updateMessageInfo',
  deleteMessage:'/admin/deleteMessage',
  sendText:'/admin/sendText'
};

export {apiConfig}