<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Hint } from '../utils/hints';

  export let hints: Hint[];
  export let onHintUnlock: () => void;
  export let resetHints: boolean;

  let hintTimer: number;
  let currentHintIndex = 0;
  let showExtra = false;

  $: if (resetHints) {
    currentHintIndex = 0;
    hints.forEach(hint => hint.unlocked = false);
    showExtra = false;
    startHintTimer();
  }

  onMount(() => {
    startHintTimer();
    window.addEventListener('keydown', handleKeyPress);
  });

  onDestroy(() => {
    if (hintTimer) clearInterval(hintTimer);
    window.removeEventListener('keydown', handleKeyPress);
  });

  function startHintTimer() {
    if (hintTimer) clearInterval(hintTimer);
    hintTimer = setInterval(() => {
      if (currentHintIndex < hints.length) {
        unlockNextHint();
      } else {
        clearInterval(hintTimer);
      }
    }, 10000);
  }

  function unlockNextHint() {
    if (currentHintIndex < hints.length) {
      hints[currentHintIndex].unlocked = true;
      currentHintIndex++;
      onHintUnlock();
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'h') {
      unlockNextHint();
    }
  }

  function toggleExtra() {
    showExtra = !showExtra;
  }
</script>

<div class="hints-container">
  {#each hints as hint (hint.id)}
    <div class="hint" class:unlocked={hint.unlocked}>
      <button 
        class="hint-icon" 
        disabled={!hint.unlocked}
        title={hint.unlocked ? 'Click to reveal hint' : 'Hint locked'}
      >
        {hint.icon}
      </button>
      {#if hint.unlocked}
        <div class="hint-content">
          <p>{hint.text}</p>
          {#if hint.extraInfo && hint.id === 2}
            <button 
              class="show-more" 
              on:click={toggleExtra}
            >
              {showExtra ? 'Hide calculation' : 'Show calculation'}
            </button>
            {#if showExtra}
              <pre class="calculation">{hint.extraInfo}</pre>
            {/if}
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  .hints-container {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
  }

  .hint {
    position: relative;
  }

  .hint-icon {
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.2s;
    padding: 0.5rem;
  }

  .unlocked .hint-icon {
    opacity: 1;
  }

  .hint-content {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: max-content;
    max-width: 300px;
    display: none;
    z-index: 10;
  }

  .hint:hover .hint-content {
    display: block;
  }

  .show-more {
    background: none;
    border: none;
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
    padding: 0;
    margin-top: 0.5rem;
  }

  .calculation {
    background: #f5f5f5;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    font-size: 0.9em;
    white-space: pre-wrap;
  }

  p {
    margin: 0;
  }
</style>