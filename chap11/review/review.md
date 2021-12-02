# nghiệp vụ upload file
- client upload file
- server lưu trữ

Client upload => http request với body là form data >< gọi API thì http request với body là json

Server cần có cách đọc khác >< express.json() => Multer
Có 3 cách lưu
- lưu ở DB => không bao giờ dùng
- Lưu ở disk của server API => sử dụng tạm => gọi dữ liệu ảnh => chiếm băng thông của chúng ta, backup, heroku thì sau khoảng thời gian sẽ xóa mất file
- lưu ở cloud => cloud storage (firebase, cloudinary, s3, gg storage)

Multer cung cấp 2 loại storage => Một cái middleware 
- Disk storage => cung cấp cơ chế lưu file ở disk => uploads => static uploads ra để trả file ng dùng
- Memory storage => middleware upload.single => req.file (buffer, original, name, mimetype) => áp dụng docs của filebase lên => download url

# Backend
Lập trình web: Backend và Frontend

Backend:
- Phía bên server (NodeJS với ExpressJS) => API
- Thao tác với CSDL (MongoDB qua một thư viện là mongoose)
- Thao tác với API bên thứ 3 (firebase)

Frontend:
- Giao tiếp với server khi cần ( cần lưu trữ hay quản lý dữ liệu )
=> HTTP request, Websocket
- HTML, CSS, JS (code bằng ngôn ngữ gì => parse 3 ngôn ngữ này để trình duyệt hiểu đc) => JS để thay đổi DOM

Client upload ảnh => loading
+ Client gọi lên server => loading true
+ Server trả kết quả => loading false => có đg link ảnh

Load ảnh xong => ảnh hiện ra luôn
C1: input file => chọn ảnh => trình duyệt đọc dược cái ảnh đó rồi => dùng base64 để hiển thị luôn cái ảnh đó

C2: set DOM => img.src = "http://upload.png"
