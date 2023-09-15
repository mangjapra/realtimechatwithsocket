import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

function Messages({ socket }) {
  const [messageRecived, setMessageRecived] = useState([]);

  const messageColumnRef = useRef(null);

  useEffect(() => {
    socket.on("recive_message", (data) => {
      console.log(data);
      setMessageRecived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off("recive_message");
  }, [socket]);

  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      console.log("las 100 messages", JSON.parse(last100Messages));

      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages)
      setMessageRecived((state) => [...last100Messages, ...state]);
    })

    return () => socket.off('last_100_messages')
  }, [socket])

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  function formDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messageColumn} ref={messageColumnRef}>
      {messageRecived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Messages;
