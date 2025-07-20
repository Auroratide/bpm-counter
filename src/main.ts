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
      <h1>Your Heartrate</h1>
      <p>Tap the button to your pulse to measure your BPM.</p>
      <button id="bpm-button" class="bpm-button heart-button" aria-label="Tap to measure heartrate">
        <span>Tap Here</span>
      </button>
      <div id="bpm-display" class="bpm-display">
        <label for="bpm-value">BPM</label>
        <output id="bpm-value" aria-live="polite">--</output>
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
  const button = document.getElementById('bpm-button')
  
  // Add pulse animation effect
  if (button) {
    button.classList.add('pulse')
    setTimeout(() => {
      button.classList.remove('pulse')
    }, 600)
  }
  
  // Vibrate on mobile devices (very brief)
  if ('vibrator' in navigator || 'vibrate' in navigator) {
    navigator.vibrate?.(50) // 50ms vibration
  }
  
  if (!state.isActive) {
    // First press - start measuring
    state.isActive = true
    state.startTime = now
    state.buttonPresses = [now]
    state.currentBPM = 0
  } else {
    // Subsequent presses - record the time
    state.buttonPresses.push(now)
    
    // Clean up old presses (older than 30 seconds) to prevent memory buildup
    const thirtySecondsAgo = now - 30000
    state.buttonPresses = state.buttonPresses.filter(time => time >= thirtySecondsAgo)
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
    bpmValueElement.textContent = '--'
    return
  }
  
  const now = Date.now()
  const thirtySecondsAgo = now - 30000
  
  // Filter presses to only include those within the last 30 seconds
  const recentPresses = state.buttonPresses.filter(time => time >= thirtySecondsAgo)
  
  if (recentPresses.length < 2) {
    state.currentBPM = 0
    bpmValueElement.textContent = '--'
    return
  }
  
  // Calculate the time span of our data
  const oldestPress = recentPresses[0]
  const newestPress = recentPresses[recentPresses.length - 1]
  const timeSpanMs = newestPress - oldestPress
  const timeSpanSeconds = timeSpanMs / 1000
  
  // Calculate BPM based on dynamic sampling window
  let bpm: number
  
  if (timeSpanSeconds >= 30) {
    // If we have more than 30 seconds of data, use last 30 seconds and multiply by 2
    const pressesInWindow = recentPresses.length - 1 // Subtract 1 because first press starts timing
    bpm = Math.round(pressesInWindow * 2)
  } else {
    // If we have n seconds of data, multiply by 60/n
    const pressesInWindow = recentPresses.length - 1 // Subtract 1 because first press starts timing
    bpm = Math.round(pressesInWindow * (60 / timeSpanSeconds))
  }
  
  state.currentBPM = bpm
  bpmValueElement.textContent = bpm > 0 ? bpm.toString() : '--'
}

function stopMeasuring(bpmValueElement: HTMLElement) {
  state.isActive = false
  state.startTime = null
  state.buttonPresses = []
  state.currentBPM = 0
  state.timeoutId = null
  
  bpmValueElement.textContent = '--'
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('[Service Worker] Registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('[Service Worker] Registration failed:', error);
      });
  });
}