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