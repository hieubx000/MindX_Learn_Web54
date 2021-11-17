# làm quen CSDL (mongoDB)
- tại sao phải dùng CSDL thay cho file
+ tổ chức các đối tượng
User, Post, Comment
+ tối ưu các truy vấn
CRUD => Hệ quản trị CSDL đã tối ưu các hàm này rồi
- Khi nào dùng CSDL
+ Giữ lại dữ liệu giữa các HTTP request => CSDL
+ sử dụng chung dữ liệu giữa các client
VD: vào bằng điện thoại và web vần trả dữ liệu đồng nhất => có một chỗ chung để lưu => CSDL
Phân biệt khóa 1, 2: làm chức năng giỏ hàng => local storage => chỉ trên 1 client mới thấy đc dữ liệu giỏ hàng thôi

- MongoDB
+ NoSQL, truy vấn nhanh
+ Đi với JS rất là tiện
+ Document tương đương object, Collection tương đương với mảng, Database tương đương với tập hợp các Collection (1 project - 1 DB)
+ Client -Server: thường client ở trong project chính là server của browser: Browser => Server (Express) => MongoDB
+ Server Express giao tiếp với server mongoDB qua giao thức mạng (TCP)

- JS giao tiếp với MongoDB
+ MongoDB thì với mỗi một ngôn ngữ đều có một thư viện chuẩn để giao tiếp
+ Sử dụng thư viện mongoose
+ Connect
+ Tạo Schema, model tương ứng với Schema 
+ CRUD dựa vào model