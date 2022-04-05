package com.mindbehind.chatbot.controller;

import com.mindbehind.chatbot.model.Message;
import com.mindbehind.chatbot.utils.PredefinedSentences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ChatbotController {
    @Autowired
    private SimpMessagingTemplate template;

    public void broadcastMessage(@Payload Message message){
        template.convertAndSend("/topic",message);
        template.convertAndSend("/topic", PredefinedSentences.getRandomSentence());
    }
}
