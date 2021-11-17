const express = require('express'); // lấy module bên thứ 3
const postCRUD = require('./postCRUD')
const cors = require('cors')
const app = express();

app.use(cors());

// config để express đọc đc input người dùng dạng json
// k có dòng này thì req.body lúc nào cũng là undefined
app.use(express.json())

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

// app.get('/app.js', (req, res) => {
//     res.sendFile(__dirname + '/public/app.js')
// })
//   app.get('/style.css', (req, res) => {
//     res.sendFile(__dirname + '/public/style.css')
// })

//lấy tất cả bài posts
app.get('/get-all-posts', async(req, res) => {
    const allPosts = await postCRUD.getAllPosts();
    // console.log(allPosts);
    res.send({
        data: allPosts
    })
})

app.get('/posts', async(req, res) => {
    const allPosts = await postCRUD.getAllPosts();
    // console.log(allPosts);
    res.send({
        data: allPosts
    })
})

//lấy bài posts theo id
app.get('/get-detail-posts', async(req, res) => {
    const foundPost = await postCRUD.getPosts(1);
    // console.log(allPosts);
    res.send({
        data: foundPost
    })
})

app.get('/posts/:id', async(req, res) => {
    //path param
    const { id } = req.params
    const foundPost = await postCRUD.getPosts(String(id));
    console.log(id);
    res.send({
        data: foundPost
    })
})

// tạo thêm post mới
app.get('/create-post', async(req, res) => {
    const dataPost = {
        imageUrl: 'example.jpg',
        title: 'example',
        description: 'example',
        createdBy: 'example@gmail.com'
    }
    const newPost = await postCRUD.createPost(dataPost);
    res.send({
        data: newPost
    })
});

app.post('/posts', async(req, res) => {
    // để req.body có dữ liệu => express cần hiểu là người dùng dạng dữ liệu gì
    // tương đương với việc là google dịch hiểu người dùng dạng tiếng việt hay tiếng anh
    const dataPost = req.body;

    const newPost = await postCRUD.createPost(dataPost);
    // console.log(allPosts);
    res.send({
        data: newPost
    })
})

// update post mới
app.get('/update-post', async(req, res) => {
    const dataUpdate = {
        imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhinhanhdep.vn%2Fdownload-100-hinh-nen-phong-canh-dep-nhat-the-gioi%2F&psig=AOvVaw2-7CvKz42AlVx9SDtxDakx&ust=1636098362459000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOi1tMGb_vMCFQAAAAAdAAAAABAD",
        title: 'example 1',
        description: 'example1',
        createBy: 'example1@gmail.com'
    }
    const UpdatePost = await postCRUD.updatePost('b7a38460-3d44-11ec-aa4f-e3a18c4ab3df', dataUpdate);
    // console.log(allPosts);
    res.send({
        data: UpdatePost
    })
})

app.put('/posts/:id', async(req, res) => {
    //input
    const { id } = req.params;
    const dataUpdate = req.body;

    //process
    const UpdatePost = await postCRUD.updatePost(id, dataUpdate);
    // console.log(allPosts);

    //output
    res.send({
        data: UpdatePost
    })
})

app.delete('/posts/:deletePostId', async(req, res) => {
    const { deletePostId } = req.params;

    const deleteStatus = await postCRUD.deletePost(deletePostId);
    // console.log(allPosts);
    res.send({
        data: deleteStatus
    })
})

// rest api chỉ là conversation đặt tên

app.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server started');
})