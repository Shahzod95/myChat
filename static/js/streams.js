const APP_ID = '4538ac1c2b484378a0f19de6fa45d80b'
const CHANNEL = 'main'
const TOKEN = '007eJxTYNCYci8gnNF/5qlq3UOT1FbKTVtc1+Zz9Midss72VS2HLXUVGExMjS0Skw2TjZJMLEyMzS0SDdIMLVNSzdISTUxTLAySLs3/nxT0kSH5ctE/FkYGCATxWRhyEzPzGBgAiioiuw=='
let UID
const client = AgoraRTC.createClient()

let localTracks = [] 
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    
    client.on('user-published', handleUserJoined)
    
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)
    
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = ` <div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])

}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user)

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user-uid}`)
        if(player != null){
            player.remove()
        }
        player = ` <div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.uid}`)
    }
    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}

joinAndDisplayLocalStream()

