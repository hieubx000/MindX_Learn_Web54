const mongoose = require('mongoose');


//Post { id, imageUrl, title, description, createBy, createAt, updateAt }

// schema là định dạng document, chỉ ứng với mongoose
const PostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createBy: String
}, {
    timestamps: true
})

// là cái để thao tác CRUD đến mongodb có 2 tham số (tên colection, schema)
const PostModel = mongoose.model('Post', PostSchema)

async function main() {
    //dùng JS để kết nối tới mongodb server 
    // tương đương dùng fetch bên trình duyệt để connect tới server
    await mongoose.connect('mongodb://localhost:27017/mindx-demo')
    console.log('MongoDB connected');

    const newPost = {
        title: 'Chap 4',
        description: 'Hi',
        createBy: "hieu@gmail.com",
        imageUrl: 'http://test.png'
    };
    // tạo một bài post mới dựa vào hàm có sẵn
    // await PostModel.create(newPost);

    // tìm kiếm tất cả bài post
    const posts = await PostModel.find();
    console.log(posts);
}

main()