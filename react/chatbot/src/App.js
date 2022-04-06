import React, { Component } from 'react'
import SockJS from "sockjs-client"
import { over } from "stompjs"

var stompClient = null;
export default class App extends Component {
  state = {
    key:1,
    message: "",
    messages:[]
  }

  connect = () => {
    var socket = new SockJS('http://localhost:8080/chatbot');
    stompClient = over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe('/topic',this.handleReceivedMessage)
    });
  }
  handleReceivedMessage=(payload)=>{
    var tempMessages=this.state.messages;
    tempMessages.push(JSON.parse(payload.body));
    this.setState(prevState=>({...prevState,message:""}))
    console.log(this.state.messages.message)
  }

  send = () => {
    stompClient.send('/app/receive', {},JSON.stringify({message:this.state.message}));
    var tempMessages=this.state.messages;
    tempMessages.push(this.state.message);
    this.setState(prevState=>({...prevState,message:""}))
  }
  componentDidMount(){
    this.connect();
  }
  handleChange=(event)=>{
    const {name,value}=event.target;
    this.setState({[name]:value});
  }
  displayMessages=()=>{

  }
  render() {
    return (
      <div className="input-group mb-3">
        <input onChange={this.handleChange} type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" name='message' value={this.state.message} />
        <button onClick={()=>this.send()} className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        {this.state.messages.map(message=>(
          <p key={this.state.key++}>{message}</p>
        ))}
      </div>
    )
  }
}
