import styled from "styled-components";
import { useState, useEffect } from "react";


const Messages = ({ socket }) => {
    const [messagesReceived, setMessagesReceived] = useState([]);

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    __createdtime__: data.__createdtime__,
                },
            ]);
        });
        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);
    // dd/mm/yyyy, hh:mm:ss
    function formatDataFromTimestamp(timestamp) {
        const date= new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <StyledMessagesColumn>
            {messagesReceived.map((msg, i) => (
                <StyledMessage key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                       <StyledMeta>{msg.username}</StyledMeta>
                       <StyledMeta>
                        {formatDataFromTimestamp(msg.__createdtime__)}
                        </StyledMeta> 
                    </div>
                    <StyledMsgText>{msg.message}</StyledMsgText>
                    <br />
                </StyledMessage>
            ))}
        </StyledMessagesColumn>
    );
};

const StyledMessagesColumn= styled.div`
  height: 85vh;
  overflow: auto;
  padding: 10px 10px 10px 40px;
`;

const StyledMessage= styled.div`
 background: rgb(0, 24, 111);
  border-radius: 6px;
  margin-bottom: 24px;
  max-width: 600px;
  padding: 12px;
`;

const StyledMeta= styled.span`
color: rgb(153, 217, 234);
  font-size: 0.75rem;
`;

const StyledMsgText= styled.p`
color: #fff;
`;


export default Messages;