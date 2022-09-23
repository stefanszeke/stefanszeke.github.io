console.log(`script.js reporting in!`)

const playTickButton = document.querySelector(`#playTick`)
const stopTickButton = document.querySelector(`#stopTick`)

const bpmInput = document.querySelector(`#bpm`)
const bpmUp = document.querySelector(`#bpmUP`)
const bpmDown = document.querySelector(`#bpmDown`)

const beatBox = document.querySelector(`.beat-box`)

const intervalButtons = document.querySelector(`.interval-buttons`)


const snare = new Audio(`src/sounds/Snare-Drum-Hit-1.mp3`)
const sticks = new Audio(`src/sounds/Drum-Sticks-Hit-1.mp3`)
const bass = new Audio(`src/sounds/Bass-Drum-Hit-1.mp3`)



let soundsArray = [
  {name: 'rest', sound: null},
  {name: `snare`, sound: snare},
  {name: `sticks`, sound: sticks},
  {name: `bass`, sound: bass}
]

let metronomeArray = [2,1,1,1]

class Metronome {
  timeInterval = 1000
  soundIndex = 0

  constructor() {}

  start() {
    this.stop()
    this.interval = setInterval(() => this.playSound(), this.timeInterval)
  }

  stop() {
    clearInterval(this.interval)
    this.resetSoundIndex()
    this.removeAllActiveBeats()
  }

  playSound() {
    this.setTime(bpmInput.value)
    this.setActiveBeat()
    if(this.getCurrentSound() != null) {
      const audio = this.getCurrentSound()
      audio.currentTime = 0
      audio.play()
    }
    this.nextSoundIndex()
  }

  setTime(input) {
    this.timeInterval = (1000 / (input/60) )
  }

  get time() {
    return this.timeInterval
  }

  nextSoundIndex() {
    this.soundIndex++
    if (this.soundIndex >= metronomeArray.length) {
      this.soundIndex = 0
    }
  }

  resetSoundIndex() {
    this.soundIndex = 0
  }

  getCurrentSound() {
    return soundsArray[metronomeArray[this.soundIndex]].sound
  }

  get soundIndex() {
    return this.soundIndex
  }

  setActiveBeat() {
    this.removeAllActiveBeats()
    beatBox.children[this.soundIndex].children[0].classList.add(`active-beat`)
  }

  removeAllActiveBeats() {
    for (let i = 0; i < beatBox.children.length; i++) {
      beatBox.children[i].children[0].classList.remove(`active-beat`)
    }
  }

}

const makeBeats = () => {

  beatBox.innerHTML = ''
  metronomeArray.forEach((item, index) => {

    const beat = document.createElement(`div`)
    beat.classList.add(`beat`)
    beat.classList.add(`beat${index}`)

    const beatNumber = document.createElement(`p`)
    beatNumber.classList.add(`beat-number`)
    beatNumber.textContent = index + 1
    beat.appendChild(beatNumber)

    const beatSound = document.createElement(`div`)
    beatSound.classList.add(`beat-sound`)
    const beatName = document.createElement(`p`)
    beatName.textContent = soundsArray[item].name
    beatSound.appendChild(beatName)
    
    beat.addEventListener(`click`, (e) => {
      e.preventDefault()
      metronomeArray[index]++
      if (metronomeArray[index] >= soundsArray.length) {
        metronomeArray[index] = 0
      }
      beatName.textContent = soundsArray[metronomeArray[index]].name
    }) 

    beatBox.appendChild(beat)

    beat.appendChild(beatSound)   
  })
}

function changeInterval(input) {
  if(input === 'add' && metronomeArray.length < 12) {
    metronomeArray.push(1)
  }
  if(input === 'remove' && metronomeArray.length > 1) {
    metronomeArray.pop()
  }
}

function icon(name) {
  return `<i class="fa-solid fa-${name}"></i>`
}

// setup
let metronome = new Metronome()
makeBeats()


// controls
bpmInput.addEventListener(`input`, (e) => {
  e.preventDefault()
  metronome.setTime(bpmInput.value)
  if(bpmInput.value > 0) {
  metronome.start()
  }
})

playTickButton.addEventListener(`click`, (e) => {
  e.preventDefault()
  metronome.start()
})

stopTickButton.addEventListener(`click`, (e) => {
  e.preventDefault()
  metronome.stop()
})

// bpmUp.addEventListener(`click`, (e) => {
//   e.preventDefault()
//   bpmInput.value++
//   metronome.setTime(bpmInput.value)
//   metronome.start()
// })

// bpmDown.addEventListener(`click`, (e) => {
//   e.preventDefault()
//   if(bpmInput.value > 0) {
//     bpmInput.value--
//     metronome.setTime(bpmInput.value)
//     metronome.start()
//   }
// })

let holdmode = false
bpmUp.addEventListener(`mousedown`, () => onMouseHold(`up`))
bpmUp.addEventListener(`mouseup`, onStopMouseDown)
bpmUp.addEventListener(`mouseleave`, onStopMouseDown)

bpmDown.addEventListener(`mousedown`, () => onMouseHold(`down`))
bpmDown.addEventListener(`mouseup`, onStopMouseDown)
bpmDown.addEventListener(`mouseleave`, onStopMouseDown)




function onMouseHold(input) {
  holdmode = true
  if(input === 'up') {
    bpmInput.value++
    mouseDownInterval = setInterval(() => {bpmInput.value++}, 100)
  }
  if(input === 'down') {
    bpmInput.value--
    mouseDownInterval = setInterval(() => {bpmInput.value--}, 100)
  }
}

function onStopMouseDown() {
  if(holdmode) {
  clearInterval(mouseDownInterval)
  metronome.setTime(bpmInput.value)
  metronome.start()
  holdmode = false
  }
}


intervalButtons.addEventListener(`click`, (e) => {
  e.preventDefault()

  console.log(e.target.id)

  if(e.target.id === 'addInterval') {
    changeInterval('add')
  }
  if(e.target.id === 'removeInterval') {
    changeInterval('remove')
  }
  makeBeats()
})


