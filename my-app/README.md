# Cách xưa
- http://localhost:3000 => index.html
- http://localhost:3000/login => login.html
....

Mỗi một router trả về 1 file html => hầu như giao diện đã đc define sẵn trong file html rồi

# single page app
- http://localhost:3000 => index.html => div#root
- http://localhost:3000/login => index.html => div#root

Toàn bộ giao diện => Javascript render ra (createElement, appendDOm,...)


Client rendering => giao diện mọi ng JS render ra
Server rendering => Server sẽ tổng hợp thành html => trả về ng dùng