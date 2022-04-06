package com.mindbehind.chatbot.utils;

import com.mindbehind.chatbot.model.Message;

import java.util.Random;

public class PredefinedSentences {
    public static String[] SENTENCES = {"Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com",
            "Hi, we are here to assist you Please contact us on: test@test.com"};
    public static Message getRandomSentence(){
        Random r=new Random();
        return new Message(SENTENCES[r.nextInt(SENTENCES.length)]);
    }
}
