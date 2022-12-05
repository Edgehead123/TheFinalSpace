import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { CharContext } from "../../CharContext";

const RoomandUsersHome = ({ socket, username, setUsername, room, setRoom }) => {
  const [roomUsers, setRoomUsers] = useState([]);
  //   const [newRoom, setNewRoom] = useState("");
  const [prevRoom, setPrevRoom] = useState("");
  const [nextRoom, setNextRoom] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { currentUser, isChatActive, setIsChatActive } =
    useContext(CharContext);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      //console.log(data);
      setRoomUsers(data);
      //   setUsername(user);
      setPrevRoom(room);
      setUsername(username);
    });
    return () => socket.off("chatroom_users");
  }, [socket]);
  // console.log("prev", prevRoom);
  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    //redirect to homepage

    navigate("/chathome", { replace: true });
  };

  const changeRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    //   socket.emit("join_room", { username, newRoom });
    socket.emit("join_room", {
      username,
      room: nextRoom,
      userId: currentUser._id,
    });
    // socket.emit("join_room", { username, room });
    setRoom(nextRoom);
    //redirect to homepage

    navigate("/chatroom", { replace: true });
  };

  return (
    <StyledRoomAndUserColumn>
      <StyledRoomTitle>{room}</StyledRoomTitle>

      {/* <StyledInput
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      /> */}

      <div>
        <select onChange={(e) => setNextRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value="SPACE">SPACE</option>
          <option value="EARTH">EARTH</option>
          <option value="VENTREXIA">VENTREXIA</option>
          <option value="INFINITY GUARD OUTPOST">INFINITY GUARD OUTPOST</option>
          <option value="FINAL SPACE">FINAL SPACE</option>
        </select>
        {/* {console.log("room", room)} */}
        <button onClick={changeRoom}>Change</button>
      </div>
      <div>
        {roomUsers.length > 0 && <StyledUsersTitle>Users:</StyledUsersTitle>}
        <StyledUsersList>
          {roomUsers.map((user) => {
            //most important, literally smusjhing userids together to make a room ID

            //verification step... might not need this
            // for(const currentUserRoomId of currentUser.rooms) {
            //   for(const otherUserRoomId of user.rooms){
            //     if(currentUserRoomId === otherUserRoomId)
            //     sharedRoomId = currentUserRoomId;
            //   }
            // }

            return (
              <li
                style={{
                  fontWeight: `${
                    user.username === username ? "bold" : "normal"
                  }`,
                  cursor: "pointer",
                }}
                key={user.id}
                // onClick={() => navigate(`/users/${user.id}`)}
                // onClick={(e) => setRoom(e.target.innerText)}
              >
                <div
                  onClick={(e) => {
                    setIsChatActive(!isChatActive);
                    fetch("/user/chat", {
                      method: "POST",
                      body: JSON.stringify({
                        currentUser: currentUser._id,
                        user: user.userId,
                      }),
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    });

                    const sharedRoomId = `${user.userId}${currentUser._id}`;
                    // setNextRoom(e.target.value);
                    setNextRoom(sharedRoomId);
                  }}
                >
                  {user.username}{" "}
                  <span onClick={() => navigate(`/users/${user.userId}`)}>
                    Profile
                  </span>
                </div>
                <button onClick={changeRoom}>Change</button>
                {currentUser.chat && user.username === username && (
                  <button
                    onClick={() => {
                      console.log("here", currentUser);
                      const sharedRoomId = `${currentUser._id}${currentUser.chat[0]}`;
                      setNextRoom(sharedRoomId);
                    }}
                  >
                    Private
                  </button>
                )}
                {console.log("room", room)}
              </li>
            );
          })}
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

const StyledInput = styled.input`
  margin-top: 20px;
`;
export default RoomandUsersHome;
