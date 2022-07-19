

const servers = {
	iceServers: [
		{
		   urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
		},
	],
	iceCandidatePoolSize: 10,
};

console.log("beginning")

let pc = new RTCPeerConnection()

let localStream = null;
let remoteStream = null;

const startCall = () => {
	localStream = await navigator.mediaDevices.getUserMedia({audio: true})
	remoteStream = new MediaStream()

	localStream.getTracks().forEach((track) => {
		pc.addTrack(track, localStream)
	})

	pc.ontrack = (event) => {
		event.streams[0].getTracks().forEach((track) => {
			remoteStream.addTrack(track)
		})
	}
}

const makeConnection = async () => {
	pc.onicecandidate = (event) => {
		event.candidate
	}
}
