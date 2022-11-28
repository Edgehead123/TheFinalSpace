import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data);
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
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on("last_100_messages", (last100Messages) => {
      //   console.log("Last 100 messages:", JSON.parse(last100Messages));
      console.log("Last 100 messages:", last100Messages);
      //   last100Messages = JSON.parse(last100Messages);
      //when JSON.parse commented out, the chat hist renders, but they alls say invalid date
      // Sort these messages by __createdtime__
      //   last100Messages = sortMessagesByDate(last100Messages);
      //sortMessagesByDate does not seem to produce the invalid date error
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <StyledMessagesColumn ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <StyledMessage key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledMeta>{msg.username}</StyledMeta>
            <StyledMeta>
              {/* {formatDateFromTimestamp(msg.__createdtime__)} */}
              {/* {msg.__createdtime__.length > 0?
                  formatDateFromTimestamp(msg.__createdtime__)
                  :
                  ""
              } */}
              {formatDateFromTimestamp(msg.__createdtime__)}
              
              {/* {console.log(
                "timetest",
                formatDateFromTimestamp(msg.__createdtime__)
              )}
              ; */}
            </StyledMeta>
          </div>
          <StyledMsgText>{msg.message}</StyledMsgText>
          <br />
        </StyledMessage>
      ))}
    </StyledMessagesColumn>
  );
};

const StyledMessagesColumn = styled.div`
  height: 85vh;
  overflow: auto;
  padding: 10px 10px 10px 40px;
`;

const StyledMessage = styled.div`
  background: rgb(0, 24, 111);
  border-radius: 6px;
  margin-bottom: 24px;
  max-width: 600px;
  padding: 12px;
`;

const StyledMeta = styled.span`
  color: rgb(153, 217, 234);
  font-size: 1rem;
`;

const StyledMsgText = styled.p`
  color: #fff;
`;

export default Messages;
