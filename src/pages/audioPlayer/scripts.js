console.log("script.js working")
 
const musicContainer = document.querySelector(".player");

const playButton = document.querySelector("#play")
const prevButton = document.querySelector("#prev")
const nextButton = document.querySelector("#next")

const audio = document.querySelector("#audio")

const progressBox = document.querySelector(".progress-box")
const progressLine = document.querySelector(".progress-line")

const title = document.querySelector("#title")
const cover = document.querySelector("#cover")

const menu = document.querySelector(".menu")
const mainContent = document.querySelector(".main-content")
const timeText = document.querySelector(".image h3")

// song list
const songList = document.querySelector(".songs")



// songs
const allSongs = [
    "Ave maria - Bach",
    "Clair de lune - Debussy",
    "Moonlight sonata sonate - Bethoven",
]

let songs = allSongs

// categories
const categories = [
    {
        name: "all",
        songs: allSongs,
    },
    {
        name: "favorites",
        songs:["Clair de lune - Debussy"]
    }
]



// variables
let songIndex = 2 // which song is playing

let isPlaying = false;

// load songs
makeSongList()

loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song;
    audio.src = `./songs/${song}.mp3`
    cover.src = `./images/${song}.jpg`

    songList.childNodes.forEach(song => {
        song.classList.remove("selectedSong")
    })

    songList.childNodes[songIndex].classList.add("selectedSong")

    if (isPlaying) {
        playSong()
    }


}

function playSong() {
    isPlaying = true
    playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`

    audio.play()
}

function pauseSong() {
    isPlaying = false
    playButton.innerHTML = `<i class="fa-solid fa-play"></i>`

    audio.pause()
}

function nextSong() {
    songIndex++
    if (songIndex === songs.length) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length-1
    }

    loadSong(songs[songIndex])
}

// event listeners //////////////////
// nav buttons
playButton.addEventListener("click", () => {
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

})

prevButton.addEventListener("click", () => {
    prevSong()
})

nextButton.addEventListener("click", () => {
    nextSong()
})


// progress line
audio.addEventListener("timeupdate", (event) => {

    let duration = event.srcElement.duration
    let current = event.srcElement.currentTime
    let percent = (current/duration) * 100

    // console.log(percent)
    progressLine.style.width = `${percent.toFixed(1)}%`

    if (duration === current) {
        nextSong()
    }

    let minutesDuration = Math.floor(audio.duration/60)
    let secondsStringDuration = (audio.duration/60).toFixed(2).toString().replace(/.\./,"")
    let secondsDuration = Math.floor((Number(secondsStringDuration)*0.6))

    let minutesCurrent = Math.floor(audio.currentTime/60)
    let secondsStringCurrent = (audio.currentTime/60).toFixed(2).toString().replace(/.\./,"")
    let secondsCurrent = Math.floor((Number(secondsStringCurrent)*0.6))


    timeText.textContent = `${minutesCurrent}:${secondsCurrent} - ${minutesDuration}:${secondsDuration}`
 
})

progressBox.addEventListener("click", (event) => {

    let duration = audio.duration
    let current = audio.currentTime

    let progressPosition = event.clientX - progressBox.offsetLeft
    let progressPercent =  progressPosition / (progressBox.clientWidth/100) 

    audio.currentTime = (duration/100) * progressPercent

})

// menu buttons
menu.addEventListener("click", (event) => {
    console.log(event.target.id)

    if (event.target.id === "button1") {
        mainContent.style.left = 0+"px"
    }
    if (event.target.id === "button2") {
        mainContent.style.left = -300+"px"
    }
    if (event.target.id === "button3") {
        mainContent.style.left = -600+"px"
    }
})



function makeSongList() {
    songList.innerHTML =""
    songs.forEach((song, index)=> {
        const songBox = document.createElement("div")
        songBox.classList.add("songBox")
        songBox.id = `${index}`
        const songName  = document.createElement("p")
        songName.textContent = song
    
        songBox.append(songName)
        songList.append(songBox)
    })
}



songList.addEventListener("click", (event) => {
    console.log(songList.childNodes)
    songIndex = event.target.id
    loadSong(songs[songIndex])


})


//category list
const categoryList = document.querySelector(".categories")

categories.forEach(category => {
    const songBox = document.createElement("div")

    songBox.id = `${category.name}`
    const songName  = document.createElement("p")
    songName.textContent = category.name

    songBox.append(songName)
    categoryList.append(songBox)
})

categoryList.addEventListener("click", (event)=> {

    if (event.target.id === "all") {
        songs = categories[0].songs

    }
    if (event.target.id === "favorites") {
        songs = categories[1].songs
    }
    makeSongList()
})