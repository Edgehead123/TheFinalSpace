import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoomAndUsers = ({ socket, username, setUsername, room, setRoom }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [prevRoom, setPrevRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      //console.log(data);
      setRoomUsers(data);
      setPrevRoom(room);
      setUsername(username);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    //redirect to homepage
    navigate("/chathome", { replace: true });
  };

  const changeRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("change_room", { username, room, __createdtime__ });

    // socket.emit("join_room", { username, newRoom });
socket.emit("join_room", { username, room });
    navigate("/chat", { replace: true });
    
    //redirect to homepage
  };
  // console.log("NR",newRoom);

  return (
    <StyledRoomAndUserColumn>
      <StyledRoomTitle>{prevRoom}</StyledRoomTitle>

      <div>
        <select onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value="general">general</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>
        {/* {console.log("room", room)} */}
        <button onClick={changeRoom}>Change</button>
      </div>
      <div>
        {roomUsers.length > 0 && <StyledUsersTitle>Users:</StyledUsersTitle>}
        <StyledUsersList>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </StyledUsersList>
      </div>
      <StyledLeave onClick={leaveRoom}>Leave</StyledLeave>
    </StyledRoomAndUserColumn>
  );
};

const StyledRoomAndUserColumn = styled.div`
  border-right: 1px solid #dfdfdf;
`;

const StyledRoomTitle = styled.h2`
  margin-bottom: 60px;
  text-transform: uppercase;
  font-size: 2rem;
  color: purple;
`;

const StyledUsersTitle = styled.h5`
  font-size: 1.2rem;
  color: purple;
`;

const StyledUsersList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 60px;
  /* color: rgb(153, 217, 234); */
  color: purple;
  li {
    margin-bottom: 12px;
  }
`;

const StyledLeave = styled.button`
  color: rgb(153, 217, 234);
  border: 1px solid rgb(153, 217, 234);
  background: rgb(63, 73, 204);
`;

export default RoomAndUsers;
