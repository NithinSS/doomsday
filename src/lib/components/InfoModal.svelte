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
      <h2>Game instructions: </h2>
      <div class="content">
  
        <ol>
          <li>You'll be shown random dates within your selected year range.</li>
          <li>Your task is to determine which day of the week that date falls on using Doomsday algorithm.</li>
          <li>Click the corresponding day button or use number keys 1-7 to select your answer.</li>
          <li>Score points by getting correct answers before time runs out.</li>
          <li>Use hints (use 'h' on keyboard or wait 10 seconds for next hint) if you get stuck.</li>
        </ol>
      </div>
      <h2>Doomsday Algorithm</h2>
      <div class="content">
        <div class="video-container">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/T_nQG-Bzxsg"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p>The Doomsday Algorithm is a mental calculation trick to determine the day of the week for any given date in history or the future. It was invented by mathematician John Horton Conway.</p>
        <p>At its core, the algorithm relies on "Doomsdays," which are specific dates in each year that always fall on the same weekday. Last day of February is the Doomsday of the year. Once you know the weekday for the Doomsday of a given year, you can quickly calculate the weekday for any other date in that year in comparison with closest doomsday weekdays.</p>

        <h3>Century Anchors:</h3>
        <ul>
          <li>1700s → Sunday</li>
          <li>1800s → Friday</li>
          <li>1900s → Wednesday</li>
          <li>2000s → Tuesday</li>
        </ul>

        <h3>Year based offsets:</h3>
        <p>For the given year within the century, calculate the number of years since the start of the century, plus the number of leap years up to that point. Use this offset to find the year’s Doomsday.</p>
        <ul>
          <li>2025 is 25 years since 2000 → 25.</li>
          <li>Leap years up to 2025 → 6 (25 ÷ 4)</li>
          <li>Offset = (25 + 6) % 7 = 31 % 7 = 3.</li>
          <li>Doomsday for 2025 = Tuesday(2000) + 3(offset) = Friday (or Day of Feb 28 2025 is Friday).</li>
        </ul>

        <h3>Monthly Doomsdays:</h3>
        <ul>
          <li>4/4, 6/6, 8/8, 10/10, 12/12</li>
          <li>3/14 (Pi Day)</li>
          <li>5/9, 9/5, 7/11, 11/7</li>
          <li>Last day of Feb (28 or 29)</li>
        </ul>

        <h3>Example:</h3>
        <p>For July 4, 2024:</p>
        <ol>
          <li>2000s anchor: Tuesday</li>
          <li>Year calculation: 24 years + 6 leap years = 30 steps forward from Tuesday = Thursday</li>
          <li>July 11 is a Doomsday (7/11), so it falls on Thursday</li>
          <li>Count backwards: 11th is Thursday, (11-7) is also a Thursday, 4th is Thursday</li>
          <li>Therefore July 4, 2024 falls on a Thursday</li>
        </ol>

        <p><em>Fun fact: Conway was so fast at this algorithm that he could perform the calculation in just 2 seconds! He even added it as a captcha to his PC login screen for daily practice.</em></p>
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

  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    margin-bottom: 1.5rem;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>