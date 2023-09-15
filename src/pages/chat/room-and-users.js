import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

import styles from './styles.module.css';

const RoomAndUsers = ({ socket, username, room }) => {
    const [roomUsers, setRoomUsers] = useState([]);
    const storagelocal = localStorage.getItem('chatroom_users');

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('chatroom_users', (data) => {
            console.log('data',data);
            setRoomUsers(data);
            localStorage.setItem('chatroom_users', JSON.stringify(data))
        })

        return () => socket.off('chatroom_users');
    }, [socket]);

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { username, room, __createdtime__ });

        // redirect to homepage
        navigate('/', { replace: true });
    };

    useEffect(() => {
        if (!storagelocal === false) {
            setRoomUsers([...roomUsers, ...JSON.parse(storagelocal)])
        }
        console.warn(storagelocal);
    }, [storagelocal])

    return (
        <div className={styles.roomAndUsersColumn}>
            <h2 className={styles.roomTitle}>{room}</h2>

            <div>
                {roomUsers.length > 0 && <h5 className={styles.userTitle}>Users:</h5>}
                <ul className={styles.userList}>
                {roomUsers.map((user) => (
                    <li
                        style={{
                            fontWeight: `${user.username === username ? 'bold' : 'normal'}`
                        }}
                        key={user.id}
                    >
                        {user.username}
                    </li>
                ))}
                </ul>
            </div>

            <button className="btn btn-outline" onClick={leaveRoom}>
                Leave
            </button>
        </div>
    )
}

export default RoomAndUsers;