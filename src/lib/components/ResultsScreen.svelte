<script lang="ts">
  export let score: number;
  export let duration: number;
  export let onRestart: (resetConfig: boolean) => void;

  $: calculationsPerMinute = Math.round((score / duration) * 60);
</script>

<div class="container">
  <div class="card results">
    <h2>Game Over!</h2>
    
    <div class="stats">
      <div class="stat-item">
        <span class="label">Final Score</span>
        <span class="value">{score}</span>
      </div>
      
      <div class="stat-item">
        <span class="label">Calculations per Minute</span>
        <span class="value">{calculationsPerMinute}</span>
      </div>
    </div>

    <div class="button-group">
      <button class="btn" on:click={() => onRestart(false)}>
        Play Again
      </button>
      <button class="btn btn-secondary" on:click={() => onRestart(true)}>
        Reset
      </button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }

  .results {
    text-align: center;
    min-width: 300px;
  }

  .stats {
    margin: 2rem 0;
  }

  .stat-item {
    margin: 1rem 0;
  }

  .label {
    display: block;
    font-size: 0.9em;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .value {
    display: block;
    font-size: 2em;
    font-weight: bold;
    color: var(--primary);
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn-secondary {
    background-color: var(--text);
  }
</style>