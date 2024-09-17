package com.ChatApplication.LetsChat.Config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.ChatApplication.LetsChat.models.Message;
import com.ChatApplication.LetsChat.models.MessageType;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DisconnectListener {

    private final SimpMessageSendingOperations messageTemplate;
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if(username!=null){
            log.info("User Disconnected : {}",username);
            var msg = Message.builder().type(MessageType.LEAVE).name(username).build();
            messageTemplate.convertAndSend("/topic/public",msg);
        }
    }
    
}
