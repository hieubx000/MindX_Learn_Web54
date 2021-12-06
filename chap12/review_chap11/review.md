# Làm quen với React
- Tại sao chúng ta nên học React để làm frontend
- Tư tưởng React cũng như các framework frontend hiện đại (Vue, Angular)
- Recat chỉ là một thư viện UI

# Phân biệt đc lập trình frontend xưa và nay
## Xưa
- thao tác trực tiếp với DOM thật
- Load file script ở <script> => sắp xếp khéo đúng thứ tự => Module management tool
- Dùng JS, CSS => Viết code đủ cho các phiên bản Browser => Transform code tool

## NAY
- Frontend => Xoay quanh config được tool đó => Đã có tool, template, framework được config sẵn cho mình rồi => mình cần lấy ra và sử dụng
- React: create-react-app => Tool đc FB phát triển => Tạo ra các React App => Single page app
-Webpack
+ module management: import css, import scss, import svg, import jsx,...
+ es module (import export default)>< commonJS (require module.exports)
+ minify bundle => file nhỏ lại (quan trọng nhất) => load nhanh hơn (đổi tên biến, xóa khoảng trắng), phần nào đó che dấu code
=> trình duyệt chỉ hiểu đc HTML, CSS, JS

-babel 
+ transform JS, sử dụng ES6 => parse về code phù hợp cho một browser nhất định
=> ngoài ra tool khác => parse SCSS => CSS, parse Less => CSS,...

- Webpack dev server
+ localhost:3000 => index.html (public)
+ host reload => thay đổi code => tự động load lại

- single page app
=> localhost:3000/ localhost:3000/login => index.html
=> client rendering => hoàn toàn dùng JS => tạo ra các DOM
=> tạo ra các iao diện

- Phân biệt Server rendering
=> giao diện phần lớn đã có trong HTML (server sinh ra các file HTML => trả về người dùng)
