import styled from "styled-components";
import RoomAndUsersHome from "../pages/chat/RoomAndUsersHome";
import MessagesReceived from "../pages/chat/Messages";
import SendMessages from "../pages/Send-Messages";

const ChatHomeMessageStyle = ({ setUsername, username, room, setRoom, socket }) => {
    return(
        <StyledChatContainer>
            <RoomAndUsersHome socket={socket} setUsername={setUsername} username={username} room={room} setRoom={setRoom} />
<div>
    <MessagesReceived socket={socket} />
    <SendMessages socket={socket} username={username} room={room} />
</div>
        </StyledChatContainer>
    );
};

const StyledChatContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
`;

export default ChatHomeMessageStyle;