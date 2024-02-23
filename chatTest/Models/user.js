const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, '사용자는 이름을 입력해야 합니다'],
    unique : true,
  },
  token : {
    type : String,
  },
  online : {
    type : Boolean,
    default : false,
  },
});
module.exports = mongoose.model('User', userSchema);