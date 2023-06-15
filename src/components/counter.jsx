import React, { Component } from 'react'
//show how to bind
class Counter extends Component {
    constructor(){
        super();
        this.state = {
            counter: 0,
        }
        this.increment = this.increment.bind(this);
    }
    increment(){
        this.setState({counter:this.state.counter+1})
    }
    render() {
        return(
            <div>
                extends Component {this.state.counter}
                <button 
                    onClick={()=>{this.increment() }}
                >
                    click this
                </button>
            </div>
        ) 
    }
}

export default  Counter;