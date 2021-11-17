# Project structure
Chia Project theo chiều dọc, mỗi một chiều có nhiều layer

Router: tập hợp các API cùng tiền tố
- post: /api/posts
- comment: /api/comments

Mỗi router nằm trong 1 file, 1 module cụ thể, mỗi router trách nhiệm chọn controller tương ứng để xử lý nghiệp vụ

Controller xử lý logic
- Input đầu vào: req.params, req.body, req.query, req.headers
- xử lý logic xử lý với database qua model, tương tác với bên thứ 3

Model có nhiệm vụ define schema, tạo model tương ứng => Model có trách nhiệm kết nối và thao tác với database

# API đăng nhập, đăng ký
Không khác gì về quản lý user thông thường.
Password không được lưu plain text mà phải đc mã hóa bằng một hàm băm => mã hóa một chiều

Sử dụng thư viên bcriptjs => hash, compare

# Design schema
Mối quan hệ 1 -n (một nhiều)
C1: enbed documents
VD: 1 post có nhiều comment: Post có trường comment
VD: 1 User có nhiều địa chỉ: User có trường address
C2 ref
VD comment có postId trỏ đến Post

Mối quan hệ n - n (nhiều nhiều)
VD: 1 post có nhiều tag, 1 tag có thể được tag vào nhiều bài post
C1: enbed documents
Post có Tags, Tags có Posts
Nghiệp vụ hiển thị tag được tag bài viết đó thì oke
Nghiệp vụ hiển thị số post có tag cố định thì lại khó
C2: ref
TagPost { postId: ref tới Post, tagId ref tới Tag }

Mối quan hệ 1 - 1 (một một)
Thông thường ném hết vào 1 schema
User có profile khá là to => tác profile ra một collection riêng
Đánh id ref ở cả 2 schema