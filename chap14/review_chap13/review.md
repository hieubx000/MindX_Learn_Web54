# Function Component
- khác với class compomnent
+ this.state, this.props không có => props là tham sồ function(props), state của hook (useState)
+ render => return JSX
+ không có lifecycle

# Hook
## useState
-Quản lý state của component
```
const [state, setState] = useState()
```
- chạy 1 lần 
- tham số đầu vào của useState 
+ Giá trị (default state)
+ Function => trả giá trị => defaultState

- không có merge State, set là set toàn bộ giá trị chứ k set từng key, value

`chú ý: nên lập trình functional programing, state cũ => không tác động trực tiếp => giữ nguyên giá trị (clone) => ra state mới`

VD: state => [{content: 1}], state.push({content: 2}); => so sánh state mới với state cũ => React bị chậm
Thay vì thế: [...state, {content: 1}, filter(), map]
state cũ: 3key-value, state mới 4key-value => state cũ 4key-value, state mới cũng vậy => build cây DOM chậm hơn

setState => render => so sánh state mới với state cũ => Build cây DOM ảo => Build cây DOM thật

=> {...obj}, [... arr], filter, map, reduce

## useEffect
- List dependencies => các biến phụ thuộc
```
useEffect(() => {
    // chạy useEffect
}, [a,b])
```
khi a hoặc b thay đổi => useEffect => useEffect này đc so sánh sự thay đổi => shallow compare
1 === 1 => true
"a" === "a" => true
[] === [] false
{a:1} = {a:1} = false

- Chạy sau khi render (kể cả lần đầu tiên)
=> componentDidMount <=> useEffect(() => {}, [])
componentDidMount <=> useFetch là gì,... hay hook gì

-Hook thinking => Lắng nghe sự thay đổi của data (deps)
Data thay đổi thì chạy hàm gì

Component thay đổi thì chạy hàm gì => class life Cycle

## useMemo
```
const x = useMemo(() => {
    return value;
}, [deps])
```
Deps thay đổi => tính lại giá trị 
Deps không thay đổi thì không tính toán  => x lần 1 và x lần 2 (dù là ref, primitive ) đều so sánh đc

## useCallBack
```
const func = useCallBack(() => {
    return value;
}, [deps])
```
trả giá trị là function => ghi nhớ giá trị ref của giá trị này
=> So sánh đc 2 function với nhau

## useRef
không có deps => không lắng nghe data
Gán 1 giá trị không thay đổi qua các lần render cho đến khi mình chủ đọng gán lại
Ref đc gán lại, sẽ không render
Ref gắn vào DOM, để lấy ra DOM thật => hạn chế xử lý DOM thật, hạn chế luôn document.querySelector

