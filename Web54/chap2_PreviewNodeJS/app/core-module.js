const fs = require('fs'); //sử lý file


const users = [
    { id: 1, username: 'hieu', password: '123456' },
    { id: 2, username: 'nam', password: '123456' },
    { id: 3, username: 'linh', password: '123456' }
];

//users => string
fs.writeFile(
    'users.txt',
    JSON.stringify(users), {
        flag: 'a'
    },
    (err) => {
        console.log(err);
    })

//hàm để nối đuôi file
// file.appendFile
// giữ nguyên wirteFile chuyển cơ chế ghi đè thành nối đuôi

//CRUD => files 
const addUser = async(user) => {
    try {
        const stringUsers = await fs
            .promises.readFile('users.json', { encoding: 'utf-8' });
        const users = JSON.parse(stringUsers);
        const newUsers = [
            ...users,
            { id: users.length + 1, ...user }
        ]
        await fs.promises.writeFile('users.json', JSON.stringify(newUsers))
    } catch (err) {
        console.log(err);
    }
}
addUser({ username: 'ha', password: '123' })
const readUsers = () => {

}

const readUser = (id) => {

}
const updateUser = (id, dataUpdate) => {

}
const deleteUser = (id) => {

}