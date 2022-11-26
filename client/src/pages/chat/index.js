import styled from "styled-components";
import MessagesReceived from "./Messages";

const ChatRoom = ({ socket }) => {
    return(
        <StyledChatContainer>
<div>
    <MessagesReceived socket={socket} />
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