const bcrypt = require('bcryptjs')
const UserModel = require('./user')
const tokenProvider = require("../../common/tokenProvider")
const HttpError = require("../../common/httpError")

const signUp = async(req, res, next) => {

    const { username, password } = req.body

    // validate user input
    //dù client có check điều kiện hay không thì server vẫn phải check
    if (!username) {
        throw new HttpError("username không được để trông", 422)
    }
    if (password && password.length < 6) {
        throw new HttpError("password cần ít nhất 6 ký tự", 422) //promise reject => nhảy xuống catch
    }

    //user name tòn tại hay chưa
    // check database này tồn tại user nào có username này hay chưa
    const existedUser = await UserModel.findOne({ username })

    if (existedUser) {
        // lộ ra mất username có trong database
        // hacker có thể lần thử password
        // => không nên trả message cụ thể là user name đó đã tồn tại
        throw new HttpError("Đăng ký thất bại", 400)
    }

    const salt = await bcrypt.genSalt(10)
        // salt là chuỗi ngẫu nhiên, tăng độ mạnh
        // nếu k có salt => mã hóa có thể giải bằng các => băm password tương ứng và so sánh
        //nếu k có salt
        // 123456 => abcxyz
        // ngồi băm 123456 => abcxyz
    console.log(salt);
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await UserModel.create({ username, password: hashPassword })
    const token = tokenProvider.sign(existedUser._id)

    res.send({
        success: 1,
        data: {
            _id: newUser._id,
            username: newUser.username,
            token
        }
    })

}

const login = async(req, res) => {

    const { username, password } = req.body
        //validate user input
    const existedUser = await UserModel.findOne({ username })

    if (!existedUser) {
        throw new HttpError("Đăng nhập thất bại (không có username)", 400)
    }

    const hashPassword = existedUser.password

    const matchedPassword = await bcrypt.compare(password, hashPassword);

    if (!matchedPassword) {
        throw new HttpError("Đăng nhập thất bại (password không đúng)", 400)
    }

    // đăng nhập thành công trả token định danh người dùng
    const token = tokenProvider.sign(existedUser._id)

    res.send({
        success: 1,
        data: { _id: existedUser._id, username: existedUser.username },
        token
    })

}

module.exports = { signUp, login }