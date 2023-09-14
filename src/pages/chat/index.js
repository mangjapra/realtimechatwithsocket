import React from 'react'
import styles from "./styles.module.css";
import MessageRecived from "./message";
import SendMessage from './send-message';

function IndexChatPage({ socket, username, room }) {
  return (
    <div className={styles.chatContainer}>
        <div>
          <MessageRecived socket={socket} />
          <SendMessage socket={socket} username={username} room={room}/>
        </div>
    </div>
  )
}

export default IndexChatPage