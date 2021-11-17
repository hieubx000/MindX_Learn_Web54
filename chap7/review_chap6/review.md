# Middleware
- cơ chế rất hay dùng trong các ngôn ngũ
- code xử lý nằm giữa chỗ input đầu vào và main task

app.get(url, [middleware], handler)
+ Application middleware => Config một lần => Áp dụng router
app.use(express.json()) => Parse body của HTTP request => thành biến gắn trong req.body. Bản chấp express.json() là function
```
function (req, res,next())
```
+ Route middlerware => isAuth
=> config theo từng route
```
function (req, res, next){
    xử lý logic phần token
}
```
- Middelware1 => middleware 2 next()
- trong một chuỗi middleware trả được luôn chuỗi dữ liệu cho người dùng sử dụng res
- truyền dữ liệu qua middleware => lợi dụng qua req
=> req(field) = data cần truyền
isAuth => req.user = user

# xác thực và phân quyền
Định danh được request đấy là ai gửi
HTTP là stateless => giải quyết => gắn thêm dữ liệu vào API phía sau API login => gắn dữ liệu để định danh

login => sinh token trả về client
client lưu lại (local storage,..)

create post => API create post (đinh kèm token vào trong header)

server => verify => thông tin user => định danh thành công 

Xác thực hay phân quyền tùy vào nghiệp vụ

## Thực hành
jsonwebtoken => mã hóa định danh ({ userId })
peivate_key => chỉ server biết => server verify token sẽ biết token đó có hợp lệ hay không => cài đặt trong biến môi trường
expired at => token không quá lâu => cài đặt trong biến môi trường

Tái sử dụng code bằng middleware => isAuth middleware
=> lấy token từ header (req.header)
verify => findDB => req.user = user  { throw error => res.status(401)}

main task sẽ xử lý logic dựa vào user này

