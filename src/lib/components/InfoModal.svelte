<script lang="ts">
  export let isOpen = false;
  export let onClose: () => void;

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={handleBackdropClick}>
    <div class="modal card">
      <button class="close-btn" on:click={onClose}>&times;</button>
      <h2>Doomsday Algorithm</h2>
      <div class="content">
        <p>The Doomsday Algorithm is a method to calculate the day of the week for any given date.</p>
        
        <h3>Key Concepts:</h3>
        <ol>
          <li>Each century has an anchor day (Doomsday)</li>
          <li>Certain dates in each month fall on the same day of the week (Doomsdays)</li>
        </ol>

        <h3>Century Anchors:</h3>
        <ul>
          <li>1700s → Sunday</li>
          <li>1800s → Friday</li>
          <li>1900s → Wednesday</li>
          <li>2000s → Tuesday</li>
        </ul>

        <h3>Monthly Doomsdays:</h3>
        <ul>
          <li>4/4, 6/6, 8/8, 10/10, 12/12</li>
          <li>3/14 (Pi Day)</li>
          <li>5/9, 9/5, 7/11, 11/7</li>
          <li>Last day of Feb (28 or 29)</li>
        </ul>

        <h3>Example:</h3>
        <p>For March 15, 2024:</p>
        <ol>
          <li>2000s anchor: Tuesday</li>
          <li>24 ÷ 4 = 6 steps forward</li>
          <li>March 14 is a Doomsday</li>
          <li>15th is one day after → Friday</li>
        </ol>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    position: relative;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text);
  }

  .content {
    text-align: left;
  }

  h3 {
    color: var(--primary);
    margin-top: 1.5rem;
  }

  ul, ol {
    margin-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }
</style>