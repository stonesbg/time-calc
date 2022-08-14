<script lang="ts">
import CopyToClipboard from "./CopyToClipboard.svelte";

  let fromTime = "";
  let toTime = "";
  let operation = "plus";

  let result = "";

  function sendCalc() {
    fetch(
      `http://localhost:5050/calc?FromTime=${fromTime}&ToTime=${toTime}&Operation=${operation}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then(function(response) {
    return response.text();
    }).then(function(data) {
      result = data
    })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  }

  function toggleOperation() {
    if (operation == "plus") {
      operation = "minus";
    } else {
      operation = "plus";
    }
  }
</script>

<input bind:value={fromTime} />
<button on:click={toggleOperation}>{operation}</button>
<input bind:value={toTime} />

{#if result != ""}
<CopyToClipboard
      clipText={result}
      let:copy
    >
  <span class="h1">{result}</span>
  <button
      disabled={result.length === 0}
      id="button-copy"
      on:click={copy}
    >📋</button>
</CopyToClipboard>
{/if}

<button on:click={sendCalc}>Calc</button>
