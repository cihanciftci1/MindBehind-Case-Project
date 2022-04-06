package com.mindbehind.chatbot.model;

import lombok.Data;

@Data
public class Message {
    private String message;

    public Message(){}
    public Message(String content) {
        this.message = content;
    }
}
