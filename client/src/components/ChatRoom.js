import { useEffect, useState } from "react";
import styled from "styled-components";

const ChatRoom = ({ userName, room, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room,
        author: userName,
        message: currentMessage,
        time: new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <StyledContainer>
      <div>
        <p>Live Chat</p>
      </div>
      <div>
        {messageList.map((messageContent) => {
          return (
            <div>
              <div>
                <p>{messageContent.message}</p>
              </div>
              <div>
                <p>{messageContent.time}</p>
                <p>{messageContent.author}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          value={currentMessage}
          placeholder="...."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: yellow;
  margin-top: 10vh;
  margin-left: 5vw;
  margin-right: 5vw;
  width: 89vw;
`;

const StyledFormContainer = styled.div`
  width: 400px;
  margin: 0 auto 0 auto;
  padding: 32px;
  background: red;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  color: white;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid rgb(63, 73, 204);
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background: blue;
  border-radius: 6px;
`;

export default ChatRoom;
