# State Props
- dữ liệu để quản lý hiển thị giao diện
- Declarative programing => Tell **what** => Máy tính xử lý phần **how** cho chúng ta

Props do thằng cha truyền xuống thằng con, con nhận được props mà k có quyền xử lý props(read only)
State do chính component chứ state quản lý, có hàm để thay đổi state => this.setState => không được modify trực tiếp 

Props và state là biến JS => truyền đủ thể loại dữ liệu JS

Ví dụ BTVN
- Hiển thị list tags: tags Array
- Hiển thị tag nào Active => cần một biến để check được nó có active hay không
- Dựa vào yêu cầu có thể chọn được nhiều tag => kiểu dữ liệu mà thể hiện đc sự nhiều => lựa chọn Array (Object với nhiều key)
Lợi ích:
+ Check active tag: currentTags.include() => O(n)
+ Check active tag: mapCurrentTag => mapCurrentTag(tag) => O(1)

=> chọn được cái state và props để quản lý giao diện

# Class component
- class ... extends React.Component
- Life cycle
+ constructors
=> khai báo các state => this.state = { }
chạy 1 lần khi component khởi tạo (JS sinh ra các đối tượng chứ chưa mount (gắn) vào giao diện)

+ render
=> Render react component chuyển từ DOM ảo sang DOM thật (JSX => DOM thật)
tags: [] -> render this.state.tags.map()

+ componentDidMount
giao diện đã đc mount
Fetch data => gọi API lên server
add EventListener => resize, keyup (ducument)
setTimer
chạy 1 lần sau render lần đầu tiên

+ componentDidUpdate
Chạy mỗi lần sau khi component re-render (state thay đổi, props thay đổi, component cha re-render thay đổi)
Thường kiểm tra sự khác biệt giữa state cũ, props cũ với state mới và props mới rồi setState
=> Kiểm tra (if else khéo)

# một số khái niệm liên quan
- render
return JSX => renturn một component
return (
    <div>
    ...
    </div>
)
=> fragment

- list rendering

array.map() => mảng JSX cần key không trùng (phân biệt các key)

- conditional rendering
+ Code render if else return
+ true && <Component />
+ bool ? <ComponentA /> : <ComponentB />

- lift state up
+ React: cha giao tiếp với con => props down
+ component con giao tiếp vứi cha (con muốn đổi state thằng cha) => function props (function này có logic sửa state) => con gọi props function => thay đổi state thằng cha
+ lift state một cách hợp lý