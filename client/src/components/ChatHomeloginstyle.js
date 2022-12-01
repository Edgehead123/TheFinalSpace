import styled from "styled-components";
// import ChatRoom from "./ChatRoom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CharContext } from "../CharContext";

const Chat = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const {currentUser} = useContext(CharContext)
  // const [userName, setUserName] = useState("");
  // const [room, setRoom] = useState("");
  // const [showChat, setShowChat] = useState(false);

  // const socket = io.connect("http://localhost:8000");

  const joinRoom = () => {
    //check if username and room fields are filled
    if (room !== "" && username !== "") {
      //if yes emit a socket event to server
      // socket.emit("join_room", room);
      socket.emit("join_room", { username, room , userId:currentUser._id});
    }
    // setUsername(user.nickname);
    navigate("/chatroom", { replace: true });
    ///chatRoom ?
    // console.log("username",user.nickname);
  };
  return (
    <StyledContainer>
      <StyledFormContainer>
        <h1>{`<>DevRooms</>`}</h1>
        <StyledInput
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          />

        <StyledSelect onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value="general">general</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </StyledSelect>
        {/* {console.log("room", room)} */}
        <StyledButton style={{ width: "100%" }} onClick={joinRoom}>
          Join Room
        </StyledButton>
      </StyledFormContainer>
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
