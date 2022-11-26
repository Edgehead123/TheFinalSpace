import { useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

const Chat = () => {
  const [userName, setUserName] = useState("");

  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const socket = io.connect("http://localhost:8000");

  const joinRoom = () => {
    if (room !== "" && userName !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <StyledContainer>
      {!showChat ? (
        <StyledFormContainer>
          <h1>{`<>DevRooms</>`}</h1>
          <StyledInput
            placeholder="Username..."
            onChange={(e) => setUserName(e.target.value)}
          />

          <StyledSelect onChange={(e) => setRoom(e.target.value)}>
            {/* I had put setUserName by accident */}
            <option>-- Select Room --</option>
            <option value="javascript">JavaScript</option>
            <option value="node">Node</option>
            <option value="express">Express</option>
            <option value="react">React</option>
          </StyledSelect>

          <StyledButton style={{ width: "100%" }} onClick={joinRoom}>
            Join Room
          </StyledButton>
        </StyledFormContainer>
      ) : (
        <ChatRoom socket={socket} userName={userName} room={room} />
      )}
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

export default Chat;
