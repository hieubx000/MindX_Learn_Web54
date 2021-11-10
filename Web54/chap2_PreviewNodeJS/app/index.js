const a = 1;
const b = 2;

console.log(a + b);
// console.log(window);
// console.log(document);
console.log(global);

// mảng task => lọc ra các task đã hoàn thành
const tasks = [{
        name: 'Học JS',
        isCompleted: true
    },
    {
        name: 'Học CSS',
        isCompleted: true
    },
    {
        name: 'Học HTML',
        isCompleted: true
    },
]

const completedTasks = tasks.filter(task => task.isCompleted);
// string.replaceAll => replace + regex
// Lớp Web54 học web full stack => Lớp mobile54 học web full stack 
console.log(completedTasks);