package com.mindbehind.chatbot.utils;

import java.util.Random;

public class PredefinedSentences {
    public static String[] SENTENCES = {"Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com",
            "Hi, we are here to assist you Please contact us on: test@test.com"};
    public static String getRandomSentence(){
        Random r=new Random();
        return SENTENCES[r.nextInt(SENTENCES.length)];
    }
}
