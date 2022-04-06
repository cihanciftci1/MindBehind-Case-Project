import React, { Component } from 'react'
import SockJS from "sockjs-client"
import { over } from "stompjs"

var stompClient = null;
export default class App extends Component {
  state = {
    sender: "User",
    message: "",
    messages: []
  }

  connect = () => {
    let component = this;

    var socket = new SockJS('http://localhost:8080/chatbot');

    stompClient = over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe('/topic', function (payload) {
        var tempMessage = JSON.parse(payload.body)
        var tempMessages = component.state.messages;
        tempMessages.push(tempMessage);
        component.setState(prevState => ({ ...prevState, message: "" }))
      })
    });
  }


  send = () => {
    stompClient.send('/app/receive', {}, JSON.stringify({ sender: this.state.sender, message: this.state.message }));
  }
  componentDidMount() {
    this.connect();
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <div className="input-group mb-4">
            <input onChange={this.handleChange} type="text" className="form-control" placeholder="Write something" aria-describedby="button-addon2" name='message' value={this.state.message} />
            <button onClick={() => this.send()} className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
          </div>
          <ul>
            {this.state.messages.map(object => (
              <li key={this.state.messages.indexOf(object)}>
                {object.sender}: {object.message}
              </li>
            ))}
          </ul>
        </div>
        <div className='col-md-3'></div>
      </div>
    )
  }
}
