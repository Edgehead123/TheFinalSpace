import styled from "styled-components";
import MessagesReceived from "./Messages";
import SendMessages from "../Send-Messages";

const ChatRoom = ({ username, room, socket }) => {
    return(
        <StyledChatContainer>
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