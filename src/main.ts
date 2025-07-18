import './style.css'

// BPM Counter State
interface BPMState {
  isActive: boolean
  startTime: number | null
  buttonPresses: number[]
  currentBPM: number
  timeoutId: number | null
}

const state: BPMState = {
  isActive: false,
  startTime: null,
  buttonPresses: [],
  currentBPM: 0,
  timeoutId: null
}

// Get the app element
const app = document.getElementById('app')

if (app) {
  app.innerHTML = `
    <div class="container">
      <h1>BPM Counter</h1>
      <p>Tap the button to measure your heart rate</p>
      <button id="bpm-button" class="bpm-button" aria-label="Tap Here">
        Tap Here
      </button>
      <div id="bpm-display" class="bpm-display">
        <span id="bpm-value">0</span> BPM
      </div>
    </div>
  `
  
  // Set up event listeners
  setupBPMCounter()
}

function setupBPMCounter() {
  const button = document.getElementById('bpm-button')
  const bpmValueElement = document.getElementById('bpm-value')
  
  if (!button || !bpmValueElement) return
  
  button.addEventListener('click', () => handleButtonPress(bpmValueElement))
}

function handleButtonPress(bpmValueElement: HTMLElement) {
  const now = Date.now()
  
  if (!state.isActive) {
    // First press - start measuring
    state.isActive = true
    state.startTime = now
    state.buttonPresses = [now]
    state.currentBPM = 0
  } else {
    // Subsequent presses - record the time
    state.buttonPresses.push(now)
  }
  
  // Clear any existing timeout
  if (state.timeoutId) {
    clearTimeout(state.timeoutId)
  }
  
  // Calculate and display BPM
  updateBPM(bpmValueElement)
  
  // Set timeout to stop measuring after 10 seconds of inactivity
  state.timeoutId = setTimeout(() => {
    stopMeasuring(bpmValueElement)
  }, 10000)
}

function updateBPM(bpmValueElement: HTMLElement) {
  if (!state.isActive || state.buttonPresses.length < 2) {
    state.currentBPM = 0
    bpmValueElement.textContent = '0'
    return
  }
  
  const now = Date.now()
  const tenSecondsAgo = now - 10000
  
  // Filter presses to only include those within the last 10 seconds
  const recentPresses = state.buttonPresses.filter(time => time >= tenSecondsAgo)
  
  if (recentPresses.length < 2) {
    state.currentBPM = 0
    bpmValueElement.textContent = '0'
    return
  }
  
  // Calculate BPM: (number of presses - 1) over 10 seconds * 6
  // We subtract 1 because the first press starts the timing
  const pressesInTenSeconds = recentPresses.length - 1
  const bpm = Math.round(pressesInTenSeconds * 6)
  
  state.currentBPM = bpm
  bpmValueElement.textContent = bpm.toString()
}

function stopMeasuring(bpmValueElement: HTMLElement) {
  state.isActive = false
  state.startTime = null
  state.buttonPresses = []
  state.currentBPM = 0
  state.timeoutId = null
  
  bpmValueElement.textContent = '0'
}