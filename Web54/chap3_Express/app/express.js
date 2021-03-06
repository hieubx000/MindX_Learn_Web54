// lập trình dùng http packet thì cũng đc
// rất mất thời gian
// cú pháp nó khó

const express = require('express'); // lấy module bên thứ 3
const path = require('path'); // core module

const app = express();

app.get('/', (req, res) => {
    console.log(__dirname);
    // cd ./demo.html
    // console.log(__dirname + './demo.html');

    // console.log(path.resolve(__dirname, './demo.html'));
    // => trả về đường dẫn tuyệt đối => đường dẫn bắt đầu từ ổ đĩa (gốc)
    // path.join
    // tương đối với một mốc mới (__dirname)
    // res.sendFile(path.resolve(__dirname, '../test.html'))
})


app.get('/hello', (req, res) => {

    res.send("hello")
})

app.get('/hello', (req, res) => {

    res.send({ message: 'hello' })
})

// đánh dấu routing method get, url /
// đường dẫn có độ ưu tiên từ trên xuống dưới
// http://localhost:8080/hello => chạy hàm ở trên chứ không chạy 
//
app.get('/hi', (req, res) => {

    res.send({ message: 'hello' }) //json
})

app.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server started');
})