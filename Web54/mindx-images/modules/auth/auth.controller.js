const bcrypt = require('bcryptjs')
const UserModel = require('./user')

const signUp = async(req, res) => {
    try {
        const { username, password } = req.body

        // validate user input
        //dù client có check điều kiện hay không thì server vẫn phải check
        if (!username) {
            throw new Error("username không được để chấm")
        }
        if (password && password.length < 6) {
            throw new Error("password cần ít nhất 6 ký tự") //promise reject => nhảy xuống catch
        }

        //user name tòn tại hay chưa
        // check database này tồn tại user nào có username này hay chưa
        const existedUser = await UserModel.findOne({ username })

        if (existedUser) {
            // lộ ra mất username có trong database
            // hacker có thể lần thử password
            // => không nên trả message cụ thể là user name đó đã tồn tại
            throw new Error("Đăng ký thất bại")
        }

        const salt = await bcrypt.genSalt(10)
            // salt là chuỗi ngẫu nhiên, tăng độ mạnh
            // nếu k có salt => mã hóa có thể giải bằng các => băm password tương ứng và so sánh
            //nếu k có salt
            // 123456 => abcxyz
            // ngồi băm 123456 => abcxyz
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({ username, password: hashPassword })

        res.send({
            success: 1,
            data: { _id: newUser._id, username: newUser.username }
        })
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message || "Something went wrong" })
    }
}

const login = async(req, res) => {
    try {
        const { username, password } = req.body
            //validate user input
        const existedUser = await UserModel.findOne({ username })

        if (!existedUser) {
            throw new Error("Đăng nhập thất bại (không có username)")
        }

        const hashPassword = existedUser.password

        const matchedPassword = await bcrypt.compare(password, hashPassword);

        if (!matchedPassword) {
            throw new Error("Đăng nhập thất bại")
        }

        res.send({
            success: 1,
            data: { _id: existedUser._id, username: existedUser.username }
        })
    } catch (err) {
        res.status(400).send({ success: 0, data: null, message: err.message || "Something went wrong" })
    }
}

module.exports = { signUp, login }