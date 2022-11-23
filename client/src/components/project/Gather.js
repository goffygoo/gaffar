import { useState } from "react"
import MeetingComponent from "../gather/MeetingComponent"

export default function Gather() {
	const [connected, setConnected] = useState(false)

	if (connected) {
		return <MeetingComponent
			leaveMeeting={() => {
				setConnected(false)
			}}
		/>
	}

	return (
		<div style={{
			height: '10vh',
			width: '15vw',
			backgroundColor: '#B4FF9F',
			margin: 'auto',
			cursor: 'pointer',
			display: 'flex',
			borderRadius: '5px'
		}}
			onClick={() => setConnected(true)}>
			<p style={{
				margin: 'auto',
				fontFamily: 'Noto Sans',
				fontSize: '1.2rem',
			}}
			> 
				Gather
			</p>
		</div>
	)
}
