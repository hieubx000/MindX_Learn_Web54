# Buổi 14
- React
+ Ui component (props) => tái sử dụng UI
+ tái sử dụng ui là nhờ truyền props khác nhau ở các chỗ khác nhau
VD: chỗ A cần button màu đỏ => props variant = danger, chỗ B cần button màu xanh => props variant = primary

- Custom hook
+ tái sử dụng logic đấy
+ nó là 1 func ( đầu vào là parameter )
+ tập hợp các hook (useState, useCallBack, useMemo, useContext, useRef)

VD useLocalStorage => đòng bộ (sync) vào localStorage
chỗ A cần handle tasks, key là todo:tasks, value default là []
chỗ B cần handle text, key là todo:text, value default là ""

+ Output tùy mục đích sử dụng, trả về kết quả là mảng 

- Luyện tập
+ children props đặc biệt của React => toàn bộ các element nằm giữa thẻ đóng và thẻ mở của component
=> Layout 

+ biến môi trường
=> code trên nhiều môi trường
Code gọi API local, deploy gọi API chỗ khác
=> biến môi trường vào
Nhờ create-react-app => không cần cài đặt config lib bào để đọc file env
=> biến môi trường bắt đầu bằng REACT_APP
=> sử dụng axios => instance baseUrl

+ List Post
=> Hook lắng nghe sự thay đổi của data