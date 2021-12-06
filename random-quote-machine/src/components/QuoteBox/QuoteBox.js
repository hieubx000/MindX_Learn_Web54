import axios from "axios";
import React, {Component} from "react";
import {RefreshCcw} from 'react-feather'
import './QuoteBox.css'

// onload script => gọi API
// click button =>  gọi API

class QuoteBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            status: 'idle',
            quote: null,
        }
    }

    // chỉ chạy 1 lần sau khi render lần đầu tiên
    async componentDidMount(){
        this.fetchRandomQuote()
    }
    // componentDidUpdate(){

    // }
    fetchRandomQuote = async() => {
        try {
            this.setState({status: "loading"})
            const res = await axios.get('https://api.quotable.io/random')
            const quote = res.data;
            this.setState({
                quote,
                status: "done"
            })
        } catch (err) {
            this.setState({status: "error"})
        }
    }

    handleRefreshQuote = () => {
        this.fetchRandomQuote()
    }

    renderQuote = () => {
        const {status, quote} = this.state
        if(status === "loading" || status === "idle"){
            return <div>Loading...</div>
        }
        if(status === "error"){
            return <div>Something went wrong</div>
        }
        console.log(quote);
        return(
            <>
                <div className = "content">
                    {quote.content}
                </div>
                <div className = "author">
                    {quote.author}
                </div>
            </>
        )
    }

    render() {
        const {activeColor} = this.props
        return(
            <div className= "QuoteBox" style={{color: activeColor}}>
                {this.renderQuote()}
                <div className = "newAction" >
                    <button className = "refresh" style={{backgroundColor: activeColor}} onClick={this.handleRefreshQuote}>
                        <RefreshCcw size={20} style={{marginRight:8}}/>
                        New Quote
                    </button>
                </div>
            </div>
        )
    }
}

export default QuoteBox