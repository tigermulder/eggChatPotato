const chatController = require('../Controllers/chat.controller');
const userController = require('../Controllers/user.controller')

module.exports = function (io) {
  //io~~~
  io.on('connection', async(socket)=>{
    console.log('클라이언트가 연결되었습니다.',socket.id);

    socket.on('login',async(userName,callback)=>{
      //유저 정보를 저장
      try{
        const user = await userController.saveUser(userName,socket.id);
        const welcomeMessage = {
          chat : `${user.name} 님이 채팅방에 입장하셨습니다.`,
          user : { id : null, name : 'system'},
        };
        io.emit('message',welcomeMessage)
        callback({ok:true,data:user});
      }catch(error){
        callback({ok:false,error: error.message});
      }
    });
    socket.on('sendMessage',async(message,callback)=>{
      try {
        // 유저 찾기 socket id로
        const user = await userController.checkUser(socket.id);
        // 메시지 저장 (유저)
        const newMessage = await chatController.saveChat(message,user);
        io.emit('message',newMessage);
        callback({ok:true});
      } catch(error) {
        callback({ok:false,error: error.message});
      }
    })
    socket.on('disconnect',()=>{
      console.log('user is disconnected');
    });
  });
};
