import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function Messages({ socket }) {
  const [messageRecived, setMessageRecived] = useState([]);

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

  function formDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messageColumn}>
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
