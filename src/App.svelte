<script lang="ts">
  import { onMount } from 'svelte';
  import { generateRandomDate, calculateDayOfWeek, formatDate, dayNames } from './lib/utils/doomsday';
  import { saveGameConfig, loadGameConfig } from './lib/utils/storage';
  import { generateHints } from './lib/utils/hints';
  import InfoModal from './lib/components/InfoModal.svelte';
  import ResultsScreen from './lib/components/ResultsScreen.svelte';
  import HintSystem from './lib/components/HintSystem.svelte';

  let currentDate: Date;
  let score = 0;
  let gameStarted = false;
  let showResults = false;
  let timeLeft: number;
  let timer: number;
  let feedback = '';
  let feedbackClass = '';
  let showInfo = false;
  let wasPaused = false;
  let pausedTime = 0;
  let hints = [];
  let resetHints = false;
  let activeButton: number | null = null;

  // Configuration
  let duration = 120;
  let startYear = 1600;
  let endYear = 2100;

  // Load configuration on mount
  onMount(() => {
    const config = loadGameConfig();
    duration = config.duration;
    startYear = config.startYear;
    endYear = config.endYear;
    timeLeft = duration;

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  function handleKeyPress(event: KeyboardEvent) {
    if (!gameStarted || showInfo) return;
    
    const key = parseInt(event.key);
    if (key >= 1 && key <= 7) {
      activeButton = key - 1;
      checkAnswer(key - 1);
      setTimeout(() => {
        activeButton = null;
      }, 200);
    }
  }

  function startGame() {
    // Save configuration
    saveGameConfig({ duration, startYear, endYear });
    
    gameStarted = true;
    showResults = false;
    score = 0;
    timeLeft = duration;
    generateNewDate();
    startTimer();
  }

  function generateNewDate() {
    currentDate = generateRandomDate(startYear, endYear);
    hints = generateHints(currentDate);
    resetHints = true;
    // Reset flag after a tick to trigger reactivity
    setTimeout(() => {
      resetHints = false;
    }, 0);
  }

  function checkAnswer(dayIndex: number) {
    const correctDay = calculateDayOfWeek(currentDate);
    
    if (dayIndex === correctDay) {
      score++;
      feedback = 'Correct!';
      feedbackClass = 'text-success';
      generateNewDate();
    } else {
      feedback = 'Try again!';
      feedbackClass = 'text-error shake';
    }

    setTimeout(() => {
      feedback = '';
      feedbackClass = '';
    }, 1000);
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  function endGame() {
    clearInterval(timer);
    gameStarted = false;
    showResults = true;
  }

  function toggleInfo() {
    showInfo = !showInfo;
    if (gameStarted) {
      if (showInfo) {
        wasPaused = true;
        pausedTime = timeLeft;
        clearInterval(timer);
      } else if (wasPaused) {
        timeLeft = pausedTime;
        startTimer();
        wasPaused = false;
      }
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function validateYears() {
    startYear = Math.max(1300, Math.min(3020, startYear));
    endYear = Math.max(1300, Math.min(3020, endYear));
    if (endYear < startYear) endYear = startYear;
  }

  function validateDuration() {
    duration = Math.max(30, Math.min(600, duration));
  }

  function handleHintUnlock() {
    // Optional: Add any logic needed when a hint is unlocked
  }
</script>

<main class="memphis-pattern">
  <button class="info-btn" on:click={toggleInfo}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  </button>

  <div class="container">
    {#if !gameStarted && !showResults}
      <div class="card start-screen">
        <h1>Doomsday Algorithm Practice</h1>
        <p>Test your mental calendar calculation skills!</p>
        
        <div class="config-form">
          <div class="form-group">
            <label for="duration">Duration (seconds)</label>
            <input 
              type="number" 
              id="duration" 
              bind:value={duration} 
              on:change={validateDuration}
              min="30" 
              max="600"
            >
          </div>
          
          <div class="form-group">
            <label for="startYear">Start Year</label>
            <input 
              type="number" 
              id="startYear" 
              bind:value={startYear}
              on:change={validateYears}
              min="1300" 
              max="3020"
            >
          </div>
          
          <div class="form-group">
            <label for="endYear">End Year</label>
            <input 
              type="number" 
              id="endYear" 
              bind:value={endYear}
              on:change={validateYears}
              min="1300" 
              max="3020"
            >
          </div>
        </div>

        <button class="btn" on:click={startGame}>Start Game</button>
      </div>
    {:else if showResults}
      <ResultsScreen 
        {score} 
        duration={duration} 
        onRestart={() => {
          showResults = false;
          gameStarted = false;
        }}
      />
    {:else}
      <div class="game-screen">
        <div class="header">
          <div class="score">Score: {score}</div>
          <div class="timer">Time: {formatTime(timeLeft)}</div>
        </div>
        
        <div class="card date-display">
          <h2>{formatDate(currentDate)}</h2>
          <div class="feedback {feedbackClass}">{feedback}</div>
          <HintSystem 
            {hints}
            {resetHints}
            onHintUnlock={handleHintUnlock}
          />
        </div>

        <div class="days-grid">
          {#each dayNames as day, i}
            <button 
              class="btn day-btn {activeButton === i ? 'active' : ''}" 
              on:click={() => {
                activeButton = i;
                checkAnswer(i);
                setTimeout(() => {
                  activeButton = null;
                }, 200);
              }}
            >
              <span class="day-name">{day.slice(0, 3)}</span>
              <span class="key-number">{i + 1}</span>
            </button>
          {/each}
        </div>

        <button class="btn end-btn" on:click={endGame}>
          End Game
        </button>
      </div>
    {/if}
  </div>
</main>

<InfoModal 
  isOpen={showInfo} 
  onClose={toggleInfo}
/>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .start-screen {
    margin-top: 10vh;
  }

  .config-form {
    margin: 2rem 0;
  }

  .form-group {
    margin: 1rem 0;
    text-align: left;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid var(--text);
    border-radius: 4px;
    font-size: 1rem;
  }

  .game-screen {
    margin-top: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    font-size: 1.2em;
    font-weight: bold;
  }

  .date-display {
    margin-bottom: 2rem;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;  /* reduced from 0.5rem */
    margin-top: 3.5rem;  /* reduced from 2rem */
    max-width: 500px;  /* added to control maximum width */
    margin-left: auto;
    margin-right: auto;
  }


  .day-btn {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    padding: 0.5em;
    border-radius: 50%;
    font-size: 0.9em;
  }

  .day-name {
    display: block;
    font-size: 0.9em;
  }

  .key-number {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--accent);
    color: var(--text);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    font-weight: bold;
  }

  .end-btn {
    margin-top: 2rem;
    background-color: var(--text);
  }

  .info-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 2px 2px 0 var(--text);
    z-index: 100;
  }

  .feedback {
    height: 1.5em;
    margin-top: 1rem;
  }

  .text-success {
    color: var(--secondary);
  }

  .text-error {
    color: var(--primary);
  }

  h1 {
    font-size: 2.5em;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2em;
    margin: 0;
  }

  .day-btn.active {
    transform: scale(0.95);
    background: var(--accent);
    transition: all 0.1s ease;
  }
</style>