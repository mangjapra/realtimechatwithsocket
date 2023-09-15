import React from 'react'
import styles from "./styles.module.css";
import MessageRecived from "./message";
import SendMessage from './send-message';
import RoomAndUsers from './room-and-users';

function IndexChatPage({ socket, username, room }) {
  return (
    <div className={styles.chatContainer}>

      <RoomAndUsers socket={socket} username={username} room={room}/>
        <div>
          <MessageRecived socket={socket} />
          <SendMessage socket={socket} username={username} room={room}/>
        </div>
    </div>
  )
}

export default IndexChatPage