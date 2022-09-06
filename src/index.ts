// import { initializeApp } from "firebase/app";
// import { addDoc, collection, getFirestore } from "firebase/firestore";
import Peer from "peerjs";

console.log("started...");
// const firebaseConfig = {
//   apiKey: "AIzaSyC4kICJrapX1skkUKnDFwa-v-01fbYl4YM",

//   authDomain: "discood.firebaseapp.com",

//   projectId: "discood",

//   storageBucket: "discood.appspot.com",

//   messagingSenderId: "594115515420",

//   appId: "1:594115515420:web:218df40c83b6a4dec37bd9",
// };

// const app = initializeApp(firebaseConfig);

var localStream: MediaStream | null;
var remoteStream: MediaStream | null;

var startBtn = document.getElementById("start")!;
console.log("adding event listeners");
startBtn.addEventListener("click", () => {
  console.log("Calling...");
  var textField: any = document.getElementById("peerId");
  if (textField.value.length > 0) {
    startCall(textField.value);
  } else {
    answerCall();
  }
});

var endBtn = document.getElementById("end")!;
endBtn.addEventListener("click", () => {
    if (localStream) {
        localStream.getTracks().forEach(track => {
            track.stop();
        })
    }
    if (remoteStream) {
        remoteStream.getTracks().forEach(track => {
            track.stop();
        })
    }
})

const peer = new Peer();
document.getElementById("myId")!.innerText = `My Id: ${peer.id}`;
async function startCall(id: string) {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    var localVideo: any = document.getElementById("localStream");
    localVideo.srcObject = localStream;
    var call = peer.call(id, localStream!);
    call.on("stream", (_stream) => {
      var remoteVideo: any = document.getElementById("remoteStream");
      remoteStream = _stream;
      remoteVideo.srcObject = remoteStream;
      // Show stream in some video/canvas element.
    });
  } catch (err) {
    console.log("Failed to get local stream", err);
  }
}

async function answerCall() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    var localVideo: any = document.getElementById("localStream");
    localVideo.srcObject = localStream;
    peer.on("call", (call) => {
      call.answer(localStream!);
      call.on("stream", (_stream) => {
        var remoteVideo: any = document.getElementById("remoteStream");
        remoteStream = _stream;
        remoteVideo.srcObject = remoteStream;
      });
    });
  } catch (err) {
    console.log("Failed to get local stream", err);
  }
}
