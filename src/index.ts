import Peer from "peerjs";

console.log("started...");
var localStream: MediaStream | null;
// var remoteStream: MediaStream | null;

async function getLocalStream() {
  return navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });
}

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
  var children: any = peers.children;
  for (let child of children) {
    child.srcObject.getTracks().forEach((track) => track.stop());
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  // if (remoteStream) {
  //     remoteStream.getTracks().forEach(track => {
  //         track.stop();
  //     })
  // }
});

const peers = document.getElementById("peers")!;
function createPeerAudio(_stream: MediaStream) {
  console.log("adding a stream");
  var audioElement = document.createElement("audio");
  audioElement.setAttribute("autoplay", "true");
  audioElement.srcObject = _stream;
  audioElement.volume = 1;
  peers.appendChild(audioElement);
}


const peer = new Peer();
console.log(peer);
document.getElementById("myId")!.innerText = `My Id: ${peer["_id"]}`;
async function startCall(id: string) {
  try {
    localStream = await getLocalStream();
    var call = peer.call(id, localStream!);
    document.getElementById("myId")!.innerText = `My Id: ${peer.id}`;
    call.on("stream", createPeerAudio);
  } catch (err) {
    console.log("Failed to get local stream", err);
  }
}

async function answerCall() {
  try {
    localStream = await getLocalStream();
    document.getElementById("myId")!.innerText = `My Id: ${peer.id}`;
    // var remoteAudio: any = document.getElementById("remoteAudio");
    // remoteAudio.volume = 1.0;
    peer.on("call", (call) => {
      call.answer(localStream!);
      call.on("stream", createPeerAudio);
      // (_stream) => {
      //   // remoteStream = _stream;
      //   // remoteAudio.srcObject = remoteStream;
      //   // var remoteVideo: any = document.getElementById("remoteStream");
      //   // remoteVideo.srcObject = remoteStream;
      // });
    });
  } catch (err) {
    console.log("Failed to get local stream", err);
  }
}
