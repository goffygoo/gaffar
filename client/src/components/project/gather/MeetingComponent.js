import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import styles from '../../../styles/components/project/gather/Meeting.module.css'
import config from '../../../config.json'
import { useSelector } from 'react-redux'

const URL = config.MEETING_SERVER

let socket = null
let connections = {}
let socketid = null

export default function MeetingComponent({ leaveMeeting }) {
    const peerConnectionConfig = {
        'iceServers': [
            { 'urls': 'stun:stun.l.google.com:19302' },
        ]
    }

    const username = useSelector((state) => state.login.user.name);

    const [videoAvailable, setvideoAvailable] = useState(undefined)
    const [audioAvailable, setaudioAvailable] = useState(undefined)
    const [triggerConnect, settriggerConnect] = useState(false)

    const localVideoref = useRef()

    const [connected, setconnected] = useState(false)
    const [audio, setaudio] = useState(true)
    const [video, setvideo] = useState(true)
    const [screenshare, setscreenshare] = useState(false)

    useEffect(() => {
        if (videoAvailable === undefined || audioAvailable === undefined) return

        navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: videoAvailable })
            .then((stream) => {
                window.localStream = stream
                localVideoref.current.srcObject = stream
            })
            .then((stream) => { })
            .catch((e) => console.log(e))

    }, [videoAvailable, audioAvailable])

    const setCSS = () => {
        let pinDiv = document.getElementById("sessionVideoPin")

        if (pinDiv.childElementCount === 1) return setCSSPin()

        let mainDiv = document.getElementById("sessionVideoMain")
        const c = mainDiv.childElementCount

        pinDiv.style.width = "0vw"
        mainDiv.style.width = "90vw"

        if (c === 1) {
            mainDiv.style.gridTemplateColumns = "repeat(1, 1fr)";

            mainDiv.childNodes.forEach(child => {
                child.style.height = "40vh"
            })
        } else if (c === 2) {
            mainDiv.style.gridTemplateColumns = "repeat(2, 1fr)";

            mainDiv.childNodes.forEach(child => {
                child.style.height = "40vh"
            })
        } else if (c === 3) {
            mainDiv.style.gridTemplateColumns = "repeat(3, 1fr)";

            mainDiv.childNodes.forEach(child => {
                child.style.height = "40vh"
            })
        } else if (c === 4) {
            mainDiv.style.gridTemplateColumns = "repeat(2, 1fr)";

            mainDiv.childNodes.forEach(child => {
                child.style.height = "32vh";
            })
        }
    }

    const setCSSPin = () => {
        let pinDiv = document.getElementById("sessionVideoPin")
        let mainDiv = document.getElementById("sessionVideoMain")

        let pin = pinDiv.childNodes[0]

        pinDiv.style.width = "60vw"
        pin.style.height = "58vh"

        mainDiv.style.gridTemplateColumns = "repeat(1, 1fr)"
        mainDiv.style.width = "30vw"
        mainDiv.childNodes.forEach(child => {
            child.style.height = "23vh"
        })
    }

    const pinToScreen = id => {
        let pinDiv = document.getElementById("sessionVideoPin")
        let mainDiv = document.getElementById("sessionVideoMain")
        let pin = document.querySelector(`[data-id="${id}"]`)

        let p = document.createElement('p')
        p.appendChild(document.createTextNode("Unpin"))
        p.onclick = () => unpinToScreen(id)

        pin.replaceChild(p, pin.childNodes[0])

        p.textContent = "Unpin"
        p.onclick = () => unpinToScreen(id)

        let count = pinDiv.childElementCount

        if (count === 1) {
            let temp = pinDiv.childNodes[0]

            let t = document.createElement('p')
            t.textContent = "Pin"
            t.onclick = () => pinToScreen(temp.getAttribute("data-id"))
            temp.replaceChild(t, temp.childNodes[0])

            temp.parentNode.removeChild(temp)
            mainDiv.appendChild(temp)

            pin.parentNode.removeChild(pin)
            pinDiv.appendChild(pin)
        } else {
            pin.parentNode.removeChild(pin)
            pinDiv.appendChild(pin)
        }

        setCSS()
    }

    const unpinToScreen = id => {
        let mainDiv = document.getElementById("sessionVideoMain")
        let unpin = document.querySelector(`[data-id="${id}"]`)

        let p = unpin.childNodes[0]

        p.textContent = "Pin"
        p.onclick = () => pinToScreen(id)

        unpin.parentNode.removeChild(unpin)
        mainDiv.appendChild(unpin)

        setCSS()
    }

    const getPermissions = () => {
        try {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => setvideoAvailable(true))
                .catch(() => setvideoAvailable(false))

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(() => setaudioAvailable(true))
                .catch(() => setaudioAvailable(false))
        } catch (e) { console.log(e) }
    }

    const getMedia = () => {
        connectToSocketServer()
    }

    const getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
                .then(getUserMediaSuccess)
                .then((stream) => { })
                .catch((e) => console.log(e))
        } else {
            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { }
        }
    }

    const getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketid) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setvideo(false)
            setaudio(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            let blackSilence = (...args) => new MediaStream([black(...args), silence()])
            window.localStream = blackSilence()
            localVideoref.current.srcObject = window.localStream

            for (let id in connections) {
                connections[id].addStream(window.localStream)

                connections[id].createOffer().then((description) => {
                    connections[id].setLocalDescription(description)
                        .then(() => {
                            socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                        })
                        .catch(e => console.log(e))
                })
            }
        })
    }

    const getDislayMedia = () => {
        if (screenshare) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    const getDislayMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connections) {
            if (id === socketid) continue

            connections[id].addStream(window.localStream)

            connections[id].createOffer().then((description) => {
                connections[id].setLocalDescription(description)
                    .then(() => {
                        socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setscreenshare(false)
                .then(() => {
                    try {
                        let tracks = localVideoref.current.srcObject.getTracks()
                        tracks.forEach(track => track.stop())
                    } catch (e) { console.log(e) }

                    let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                    window.localStream = blackSilence()
                    localVideoref.current.srcObject = window.localStream

                    getUserMedia()
                })
        })
    }

    const gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketid) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    const connectToSocketServer = () => {
        socket = io.connect(URL)

        socket.on('signal', gotMessageFromServer)

        socket.on('connect', () => {
            socket.emit('join-call', username)
            socketid = socket.id

            socket.on('user-left', (id) => {
                let videoChild = document.querySelector(`[data-id="${id}"]`)

                if (videoChild !== null) {
                    videoChild.parentNode.removeChild(videoChild)

                    setCSS()
                }
            })

            socket.on('user-joined', (id, clients, names) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)

                    connections[socketListId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }

                    connections[socketListId].onaddstream = (event) => {
                        let searchVideo = document.querySelector(`[data-socket="${socketListId}"]`)
                        if (searchVideo !== null) {
                            searchVideo.srcObject = event.stream
                        } else {
                            let main = document.getElementById('sessionVideoMain')
                            let video = document.createElement('video')
                            let div = document.createElement('div')

                            div.setAttribute('data-id', socketListId)

                            video.setAttribute('data-socket', socketListId)
                            video.srcObject = event.stream
                            video.autoplay = true
                            video.playsinline = true

                            let pin = document.createElement('p')
                            pin.appendChild(document.createTextNode("Pin"))
                            pin.onclick = () => pinToScreen(socketListId)

                            let name = document.createElement('p')
                            name.appendChild(document.createTextNode(names[socketListId]))

                            div.appendChild(pin)
                            div.appendChild(video)
                            div.appendChild(name)

                            main.appendChild(div)

                            setCSS()
                        }
                    }

                    if (window.localStream !== undefined && window.localStream !== null) {
                        connections[socketListId].addStream(window.localStream)
                    } else {
                        let blackSilence = (...args) => new MediaStream([black(...args), silence()])
                        window.localStream = blackSilence()
                        connections[socketListId].addStream(window.localStream)
                    }
                })

                if (id === socketid) {
                    for (let id2 in connections) {
                        if (id2 === socketid) continue

                        try {
                            connections[id2].addStream(window.localStream)
                        } catch (e) { }

                        connections[id2].createOffer().then((description) => {
                            connections[id2].setLocalDescription(description)
                                .then(() => {
                                    socket.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    useEffect(() => {
        getUserMedia()
    }, [video, audio])

    useEffect(() => {
        getDislayMedia()
    }, [screenshare])

    const connect = () => settriggerConnect(true)

    useEffect(() => {
        if (triggerConnect)
            getMedia()
    }, [triggerConnect])

    const silence = () => {
        let ctx = new AudioContext()
        let oscillator = ctx.createOscillator()
        let dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }

    const black = ({ width = 640, height = 480 } = {}) => {
        let canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext('2d').fillRect(0, 0, width, height)
        let stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    useEffect(() => {
        getPermissions()

        return () => {
            window.localStream.getTracks().forEach(track => track.stop())

            if (socket) socket.disconnect()
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.mainWrapper}>
                <div className={styles.pinContainer} id="sessionVideoPin"></div>
                <div className={styles.mainContainer} id="sessionVideoMain">
                    <div data-id="defalut">
                        <p onClick={() => pinToScreen("defalut")}>Pin</p>
                        <video id="my-video" ref={localVideoref} autoPlay muted />
                        {(() => {
                            return <p>{username}</p>
                        })()}
                    </div>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <div className={styles.buttonContainerCentre}>
                    <img onClick={() => setaudio(v => !v)} src={`/audio-${audio ? "on" : "off"}.svg`} alt="audio" />
                    <img onClick={() => setvideo(v => !v)} src={`/video-${video ? "on" : "off"}.svg`} alt="video" />
                    <img onClick={() => setscreenshare(v => !v)} src={`/screen-share-${screenshare ? "on" : "off"}.svg`} alt="screen" />
                    <div className={connected ? styles.leave : styles.join} onClick={() => {
                        if (connected) {
                            leaveMeeting()
                        } else {
                            connect()
                            setconnected(true)
                        }
                    }}>
                        <p>{connected ? "Leave" : "Join"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
