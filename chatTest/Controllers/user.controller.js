const User = require('../Models/user')
const userController = {}

userController.saveUser = async(userName, socketId)=>{
  // 기존에 있는 유저인지 확인
  let user = await User.findOne({ name : userName });
  // 없다면 새로 유저정보를 생성
  if(!user){
    user = new User({
      name : userName,
      token : socketId,
      online : true,
    });
  }
  // 이미지있는 유저라면 연결정보값만 바꿔주기
  user.token = socketId
  user.online = true

  await user.save();
  return user;
}

userController.checkUser =async(sid)=>{
  const user = await User.findOne({token:sid})
  if(!user) throw new Error('사용자를 찾을 수 없습니다')
  return user;
}
module.exports = userController