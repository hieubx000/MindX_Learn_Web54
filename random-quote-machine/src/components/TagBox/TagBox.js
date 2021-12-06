import React, {Component} from "react";
import axios from "axios";
import './TagBox.css'



class TagBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            tags: [],
            status: "idle"
        }
    }
    async componentDidMount(){
        try {
            this.setState({status: "loading"})
            const res = await axios.get('https://api.quotable.io/tags')
            const tags = res.data;
            
            console.log(tags[1]);
            this.setState({
                tags,
                status: "done"
            })
        } catch (err) {
            this.setState({status: "error"})
        }
    }

    renderTags = () => {
        const {status, tags} = this.state
        const {activeTag, handleActiveTag} = this.props;
        console.log(tags);
        if(status === "error"){
            return <div>Something went wrong</div>
        }
        console.log(tags);
        console.log(status);
        return(
            <>
                {tags.map(tag => {
                    const colorActive = tag === activeTag ? "tag-item active" : "tag-item"
                    return(
                        <span key={tag._id} 
                        className ={colorActive}
                        onClick={() => handleActiveTag(tag)}>
                            {tag.name}
                        </span>
                    )
                })}
            </>
        )
    }
    
    render() {
        // const {tags} = this.state
        // // {this.renderTags()}
        // console.log(tags);
        return(
            <div className="Tag-Box">
                {this.renderTags()}
            </div>
        )
    }
}

export default TagBox