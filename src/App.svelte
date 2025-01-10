<script lang="ts">
  import { onMount } from 'svelte';
  import { generateRandomDate, calculateDayOfWeek, formatDate, dayNames } from './lib/utils/doomsday';

  let currentDate: Date;
  let score = 0;
  let gameStarted = false;
  let timeLeft = 120; // 2 minutes
  let timer: number;
  let feedback = '';
  let feedbackClass = '';

  function startGame() {
    gameStarted = true;
    score = 0;
    generateNewDate();
    startTimer();
  }

  function generateNewDate() {
    currentDate = generateRandomDate(1600, 2100);
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
        clearInterval(timer);
        gameStarted = false;
      }
    }, 1000);
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onMount(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  });
</script>

<main class="memphis-pattern">
  <div class="container">
    {#if !gameStarted}
      <div class="card start-screen">
        <h1>Doomsday Algorithm Practice</h1>
        <p>Test your mental calendar calculation skills!</p>
        <button class="btn" on:click={startGame}>Start Game</button>
      </div>
    {:else}
      <div class="game-screen">
        <div class="header">
          <div class="score">Score: {score}</div>
          <div class="timer">Time: {formatTime(timeLeft)}</div>
        </div>
        
        <div class="card date-display">
          <h2>{formatDate(currentDate)}</h2>
          <div class="feedback {feedbackClass}">{feedback}</div>
        </div>

        <div class="days-grid">
          {#each dayNames as day, i}
            <button 
              class="btn day-btn" 
              on:click={() => checkAnswer(i)}
            >
              {day}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  .start-screen {
    margin-top: 20vh;
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
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .day-btn {
    width: 100%;
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
</style>