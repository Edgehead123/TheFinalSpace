import styled from "styled-components";
import RoomAndUsers from "./RoomAndUsers";
import MessagesReceived from "./Messages";
import SendMessages from "../Send-Messages";

const ChatRoom = ({ setUsername, username, room, setRoom, socket }) => {
    return(
        <StyledChatContainer>
            <RoomAndUsers socket={socket} setUsername={setUsername} username={username} room={room} setRoom={setRoom} />
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

export default ChatRoom;