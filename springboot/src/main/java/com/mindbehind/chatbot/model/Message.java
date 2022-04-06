package com.mindbehind.chatbot.model;

import lombok.Data;

@Data
public class Message {
    private String sender;
    private String message;

    public Message(){}
    public Message(String sender,String message) {
        this.sender=sender;
        this.message = message;
    }
}
