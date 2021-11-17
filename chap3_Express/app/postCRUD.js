const fs = require('fs')
const uuid = require('uuid')
    /*
        {
            imageUrl: string,
            title: string,
            description: string,
            createBy: string
        }
    */


// trả về 1 promises k có reject
const getAllPosts = async() => {
    try {
        const jsonOldPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8' })
        const posts = JSON.parse(jsonOldPosts)
        return posts; // resolve posts
    } catch (err) {
        console.log(err);
        return []; // resolve []
    }

}

const getPosts = async(id) => {
    try {
        const jsonOldPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8' })
        const posts = JSON.parse(jsonOldPosts)

        const foundPost = posts.find(post => post.id === id);
        return foundPost ? foundPost : null; // resolve posts
    } catch (err) {
        console.log(err);
        return null; // resolve []
    }
}

const createPost = async(dataPost) => {
    try {
        const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8' })
        const posts = JSON.parse(jsonPosts)

        const newPost = {
            id: uuid.v1(),
            ...dataPost
        }

        const newPosts = [...posts, newPost]
        await fs.promises.writeFile('posts.json', JSON.stringify(newPosts))

        return newPosts; // resolve posts
    } catch (err) {
        console.log(err);
        return null; // resolve []
    }
}

const updatePost = async(id, dataUpdate) => {
    try {
        const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8' })
        const posts = JSON.parse(jsonPosts)

        //b1 tìm vị trí 
        let foundIndex = posts.findIndex(post => post.id === id);
        //console.log(foundIndex);
        if (foundIndex !== -1) {
            // b2 sửa
            posts[foundIndex] = {
                ...posts[foundIndex],
                ...dataUpdate
            }

            //b3 build lại
            await fs.promises.writeFile('posts.json', JSON.stringify(posts))
            return posts[foundIndex]
        }
        return null
    } catch (err) {
        console.log(err);
        return null; // resolve []
    }
}

const deletePost = async(id) => {
    try {
        const jsonPosts = await fs.promises.readFile('posts.json', { encoding: 'utf-8' })
        const posts = JSON.parse(jsonPosts)

        const newPosts = posts.filter(post => post.id !== id);

        await fs.promises.writeFile('posts.json', JSON.stringify(newPosts))
        return true
    } catch (err) {
        console.log(err);
        return false; // resolve []
    }
}

module.exports = {
    getAllPosts,
    getPosts,
    createPost,
    updatePost,
    deletePost
}