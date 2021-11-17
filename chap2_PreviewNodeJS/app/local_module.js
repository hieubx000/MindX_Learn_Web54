const add = require('./add_user') //local module
const sum = require('./child/app')

// add({ username: "Tuan", password: '321' }) //nếu là function
// add.addUser({ username: "Tuan", password: '321' }) //nếu là object

console.log(sum(1, 2));