import React, {Component} from "react";
import Header from "./components/Header";
import ColorPicker from "./components/ColorPicker"
import QuoteBox from "./components/QuoteBox";
import TagBox from "./components/TagBox";
import './App.css'

const colors = [
  "cornflowerblue",
  "blueviolet",
  "indianred",
  "deeppink",
  "forestgreen",
  "yellow",
  "gray"
]

// để đổi màu đc background color của app => cần có biến quản lý backgorund color
// props, state
// tuy nhiên color lại nằm ở Color Picker là con của App
class App extends Component {
   /* constructor khởi tạo trước lần render đầu tiên,
     chỉ chạy 1 lần duy nhất, thưởng để khởi tạo state */
    constructor(props) {
      super(props);
      // const {colors} = props;

      // khai báo một cái biến để quy định thằng nào active
      this.state = {
          activeColor: colors[0],
          activeTag: null
          
      }
  }
    handleActiveColor = (newColor) => {
      // modify directly
      // this.state.activeColor = newColor
      this.setState({
          activeColor:newColor
      })
    }

    handleActiveTag = (newTag) => {
      this.setState({
        activeTag:newTag
      })
    }

    render() {
    const {activeColor, activeTag} = this.state
    return (  
      <div className ="App" style={{backgroundColor: activeColor}}>
        <div className ="Header-box">
          <Header title="Random quote machine"/>
        </div> 
        <div className = "Quote-wrapper">
          <QuoteBox activeColor = {activeColor}/>
        </div>
        <div className = "ColorPicker-box">
          <ColorPicker 
            colors={colors} 
            activeColor = {activeColor}
            handleActiveColor= {this.handleActiveColor}
          />
        </div>
        <div className="Tags-Box">
            <TagBox activeTag = {activeTag} 
            handleActiveTag = {this.handleActiveTag}/>
        </div>
      </div>

    );
  }  
}
// để con thay đổi đc state cha
// state => cha mới có quyền gọi hàm this.setState
// khai báo ở cha một hàm có this.setState
// để con có thể sử dụng được hàm này => truyền hàm này xuống thằng con

export default App;
