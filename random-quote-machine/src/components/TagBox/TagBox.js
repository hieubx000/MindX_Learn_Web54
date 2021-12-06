import React, {Component} from "react";
import axios from "axios";
import './TagBox.css'



class TagBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            tags: null,
            status: "idle"
        }
    }
    async componentDidMount(){
        try {
            this.setState({status: "loading"})
            const res = await axios.get('https://api.quotable.io/tags')
            const tags = res.data;
            
            console.log(tags);
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
        console.log(tags);
        if(status === "error"){
            return <div>Something went wrong</div>
        }
        console.log(tags);
        console.log(status);
        return(
            <>
                {tags.map(tag => {
                    return(
                        <div className = "nameTags">
                            {tag.name}
                        </div>
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