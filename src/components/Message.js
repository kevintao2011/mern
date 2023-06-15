import  {Component} from 'react';

class Message extends Component{
    render(){
        return(
            <div>Class {this.props.message}</div>
        )
    }
}

export default Message;