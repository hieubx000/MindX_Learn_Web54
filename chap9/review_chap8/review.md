# Flow
Input -> Process -> Output

Output: Error handling
Input: Validate Input

=> Đảm bảo dữ liệu đầu vào đúng
=> Khả năng cao Output đúng

Backend tư duy: cần validate dữ liệu
mặc dù Frontend đã validate rồi

Thay vì if else, ta sẽ sử dụng thư viện: Joi

# Practice
Mỗi một module sẽ thêm 1 validation.js => Khai báo schema cho mỗi API => Schema khai báo như thế nào sẽ phụ thuộc vào doc

Viết middleware
- Function đầu vào là schema, property của request
+ mỗi một API là một schema riêng
+ mỗi một API thì có một các truyền dữ liệu khác nhau
