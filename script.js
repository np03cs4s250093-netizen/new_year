// State
let currentStep = 0
let isMusicPlaying = false
let currentNoteIndex = 0
let noteInterval = null

const loveNotes = [
    "You walked into my life and suddenly everything made sense 💫",
    "Every moment with you teaches me what it really means to feel alive ✨",
    "I mess up sometimes. I say things I wish I could take back. But you help me become better every day 💕",
    "You've changed me in ways I never expected — and I'm so grateful for that 🌸",
    "Even when the words don't come easy, I hope you feel how much I care 💗",
    "Losing you scares me. But loving you? That's the easiest thing I've ever done 💝",
    "You're my favorite hello and the hardest goodbye — always 🌹",
]

// Elements
const contentWrapper = document.getElementById("contentWrapper")
const musicToggle = document.getElementById("musicToggle")
const backBtn = document.getElementById("backBtn")
const steps = document.querySelectorAll(".step")

// Initialize
function init() {
    createFloatingHearts()
    setupEventListeners()
    showStep(0)
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.getElementById("floatingHearts")
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement("div")
        heart.className = "floating-heart"
        heart.innerHTML = `<svg width="${8 + Math.random() * 16}" height="${8 + Math.random() * 16}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        heart.style.left = `${Math.random() * 100}%`
        heart.style.top = `${Math.random() * 100}%`
        heart.style.animationDelay = `${Math.random() * 8}s`
        heart.style.animationDuration = `${12 + Math.random() * 8}s`
        container.appendChild(heart)
    }
}

// Setup event listeners
function setupEventListeners() {
    // Click anywhere to advance
    contentWrapper.addEventListener("click", handleContentClick)

    // Music toggle
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation()
        toggleMusic()
    })

    // Back button
    backBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        goBack()
    })
}

// Handle content click
function handleContentClick() {
    if (currentStep < 4) {
        nextStep()
    }
}

// Show step
function showStep(stepNum) {
    steps.forEach((step) => step.classList.remove("active"))
    steps[stepNum].classList.add("active")

    // Show/hide back button
    if (stepNum > 0) {
        backBtn.classList.remove("hidden")
    } else {
        backBtn.classList.add("hidden")
    }

    // Handle step 2 (love notes carousel)
    if (stepNum === 2) {
        startNoteRotation()
    } else {
        stopNoteRotation()
    }

    // Handle step 4 (finale hearts)
    if (stepNum === 4) {
        createFinaleHearts()
    }
}

// Next step
function nextStep() {
    if (currentStep < 4) {
        currentStep++
        showStep(currentStep)
    }
}

// Go back
function goBack() {
    if (currentStep > 0) {
        currentStep--
        showStep(currentStep)
    }
}

// Toggle music
function toggleMusic() {
    isMusicPlaying = !isMusicPlaying
    const iconMusic = musicToggle.querySelector(".icon-music")
    const iconMute = musicToggle.querySelector(".icon-mute")

    if (isMusicPlaying) {
        iconMusic.classList.add("hidden")
        iconMute.classList.remove("hidden")
    } else {
        iconMusic.classList.remove("hidden")
        iconMute.classList.add("hidden")
    }
}

// Start note rotation
function startNoteRotation() {
    currentNoteIndex = 0
    updateNote()
    createProgressDots()

    noteInterval = setInterval(() => {
        currentNoteIndex = (currentNoteIndex + 1) % loveNotes.length
        updateNote()
        updateProgressDots()
    }, 4000)
}

// Stop note rotation
function stopNoteRotation() {
    if (noteInterval) {
        clearInterval(noteInterval)
        noteInterval = null
    }
}

// Update note text
function updateNote() {
    const noteText = document.getElementById("noteText")
    if (noteText) {
        noteText.textContent = `"${loveNotes[currentNoteIndex]}"`
    }
}

// Create progress dots
function createProgressDots() {
    const container = document.getElementById("progressDots")
    if (!container) return

    container.innerHTML = ""
    loveNotes.forEach((_, i) => {
        const dot = document.createElement("div")
        dot.className = `progress-dot ${i === currentNoteIndex ? "active" : ""}`
        container.appendChild(dot)
    })
}

// Update progress dots
function updateProgressDots() {
    const dots = document.querySelectorAll(".progress-dot")
    dots.forEach((dot, i) => {
        if (i === currentNoteIndex) {
            dot.classList.add("active")
        } else {
            dot.classList.remove("active")
        }
    })
}

// Create finale hearts
function createFinaleHearts() {
    const container = document.getElementById("floatingHeartsFinale")
    if (!container) return

    container.innerHTML = ""
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div")
        heart.className = "floating-heart-finale"
        heart.innerHTML = `<svg width="${14 + Math.random() * 14}" height="${14 + Math.random() * 14}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
        heart.style.left = `${Math.random() * 100}%`
        heart.style.top = `${Math.random() * 100}%`
        heart.style.animationDelay = `${Math.random() * 4}s`
        heart.style.animationDuration = `${10 + Math.random() * 5}s`
        container.appendChild(heart)
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", init)
