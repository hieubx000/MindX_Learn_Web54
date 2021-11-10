const fs = require('fs');


// CommonJS
// import export => ES Module
// NodeJS 14 thì mới support chuẩn ES Module
// Tuy nhiên, ta vẫn tuân theo chuẩn cũ vì nhiều tài liệu viết theo chuẩn này

// console.log('1');
// fs.readFile(
//     'hello.txt', { encoding: 'utf-8' },
//     (err, data) => {
//         if (err) return console.log(err);
//         console.log(data);
//     }
// );
// console.log('2');

// fs.promises.readFile(
//     'hello.txt'
// ).then(data => {
//     console.log(data.toString());
// }).catch(err => {
//     console.log(err);
// })

//PROMISES
const wait = (timeSec) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeSec * 1000)
        })
    }
    // console.log(1);
    // wait(3).then(() => console.log(
    //     'after 3s'
    // ))

// const readFile = (filePath) => {
//     return new Promise((resolve, rejects) => {
//         fs.readFile(filePath, (err, data) => {
//             if (err) rejects(err);

//             resolve(data);
//         })
//     })
// }

// readFile('hello.txt')
//     .then(data => console.log(data.toString()))
//     .catch(err => console.log(err))


// ASYNC AWAIT => sugar syntax
// node 8
// async là 1 từ khóa đi trc function,  để sử dụng await thì nó phải nằm trong async
// async function readFileSync() {
//     // await promises
//     try {
//         const data = await readFile('hello.txt');
//         // dừng cho đến khi promises thành công hoặc thất bại
//         return data; //resolve (data)
//     } catch (err) {
//         throw err; //rejects (err)
//     }
// }
// kết quả trả về của hàm async là 1 promises

// readFileSync()
//     .then(data => console.log(data))
//     .catch(err => console.log('1', err));


// viết 1 hàm trả về promises, chạy sau 10s sẽ trả lỗi (rejected)
// const errAfterTenSecond = () => {
//     return new Promise((resolve, rejects) => {
//         setTimeout(() => {
//             rejects("lỗi")
//         }, 10000)
//     })
// };
// const errAfterTenSecond = async() => {
//     await wait(10);
//     throw "lỗi"
// };
const successAfterTenSecond = async() => {
    await wait(10);

    return "success";
    // throw "lỗi"
};
//async trả về promise
(async() => {
    try {
        const data = await successAfterTenSecond() //10s chạy
        console.log(data);
    } catch (err) {
        console.log(err); //lỗi
    }
})() //Immediately invoked function expression

/*
Tóm gọn lại phần Promise - async, await
-NodeJS đơn luồng và bất đồng bộ
    +đơn luồng ở chỉ có 1 call stack để gọi
    +bất đồng bộ: các tác vụ IO tác vụ thao tác với phần cứng
        hay mạng nó sẽ đc các module của NodeJS xử lý
        -> điều quan tâm là sau khi xử lý trong phải truyền
        call back để gọi lại
        *C1: đọc file xong thì hiển thị data nếu k thành công hiển thị lỗi
        *C2: Promise 
        *C3: Async, await
        => thường sử dụng Async, await để xử lý
*/