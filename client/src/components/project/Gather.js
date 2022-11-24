import { useEffect, useState } from "react"
import MeetingComponent from "./gather/MeetingComponent"
import styles from '../../styles/components/project/Gather.module.css'
import MessageTile from "./gather/MessageTile"
import axios from "axios"
import config from '../../config.json'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Gather() {
	const { login: { user }, project: { project_id }, gather: { messages } } = useSelector(state => state)

	const [connected, setConnected] = useState(false)
	const [messageText, setMessageText] = useState('')

	const navigate = useNavigate();

	useEffect(() => {
		const chatDiv = document.getElementById("scrollMessageChat");
		chatDiv.scrollTop = chatDiv.scrollHeight;
	}, [messages])

	const sendMessage = () => {
		const token = localStorage.getItem("token");

		const req = {
			user_id: user._id,
			name: user.name,
			img: user.img,
			msg_data: messageText,
			project_id: project_id
		}

		console.log(req)

		axios
			.post(config.SERVER + "/message/createmessage", req, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.data.success === false) throw Error("Error");
				setMessageText('')
				console.log("data", res.data)
			})
			.catch((err) => {
				console.log(err);
				if (err.response && err.response.data === "Unauthorized")
					return navigate("/login");
			});
	}

	const deleteMessage = (id) => {
		const token = localStorage.getItem("token");

		const req = {
			message_id: id,
			project_id
		}

		axios
			.post(config.SERVER + "/message/deletemessage", req, {
				headers: {
					Authorization: token,
				},
			})
			.then((res) => {
				if (res.data.success === false) throw Error("Error");

				// console.log("data", res.data)
			})
			.catch((err) => {
				console.log(err);
				if (err.response && err.response.data === "Unauthorized")
					return navigate("/login");
			});
	}

	if (connected) {
		return <MeetingComponent
			leaveMeeting={() => {
				setConnected(false)
			}}
		/>
	}

	return (
		<div className={styles.container}>
			<div id="scrollMessageChat" className={styles.messageScroll}>
				{
					messages.map(msg => {
						return <MessageTile
							key={msg.message_id}
							id={msg.message_id}
							name={msg.sender}
							timeStamp={msg.time_stamp}
							img={msg.img}
							senderId={msg.sender_id}
							text={msg.text}
							deleteMessage={deleteMessage}
						/>
					})
				}
			</div>

			<div className={styles.activityContainer}>
				<input
					autoComplete="off"
					value={messageText}
					onChange= {e => setMessageText(e.target.value)}
					spellCheck="false"
					placeholder="Write your message here..."
				/>

				<div className={styles.sendBtn} onClick={() => sendMessage()}>
					<p>Send</p>
				</div>

				<div className={styles.gatherBtn}
					onClick={() => setConnected(true)}>
					<p>Gather</p>
				</div>

			</div>
		</div>

	)
}
