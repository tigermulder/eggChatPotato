const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());


mongoose.connect(process.env.DB , {
}).then(() => {
    console.log("데이터베이스와 연결되었습니다.");
}).catch(err => {
    console.error("데이터베이스 연결 중 오류가 발생했습니다:", err);
});

module.exports = app;
