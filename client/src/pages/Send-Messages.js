import styled from "styled-components";
import React, { useState } from "react";

const SendMessages = ({ socket, username, room }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message !== '') {
            const __createdtime__ = Date.now();
             // Send message to server. We can't specify who we send the message to from the frontend. 
             //We can only send to server. Server can then send message to rest of users in room
             socket.emit('send_message', { username, room, message, __createdtime__});
             setMessage('');
        }
    }
    return (
        <StyledSendMessageContainer>
            <StyledMessageInput
            placeholder= 'Message...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            />

            <StyledBtnPrimary onClick={sendMessage}>
                Send Message
            </StyledBtnPrimary>

        </StyledSendMessageContainer>
    )
}

const StyledSendMessageContainer= styled.div`
padding: 16px 20px 20px 16px;
`;

const StyledMessageInput = styled.input`
padding: 14px;
  margin-right: 16px;
  width: 60%;
  border-radius: 6px;
  border: 1px solid rgb(153, 217, 234);
  font-size: 0.9rem;
  
`;

const StyledBtnPrimary = styled.button`
  padding: 14px 14px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
background: rgb(153, 217, 234);
  color: rgb(0, 24, 111);
  border-radius: 6px;
`;


export default SendMessages;