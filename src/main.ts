import './style.css'

// Get the app element
const app = document.getElementById('app')

if (app) {
  app.innerHTML = `
    <div class="container">
      <h1>Hello World</h1>
      <p>Welcome to BPM Counter!</p>
      <p>BPM Counter is a website that measures your heart rate.</p>
    </div>
  `
}