<script lang="ts">
  let fromTime = "";
  let toTime = "";
  let operation = "plus";

  import { fetch } from "@tauri-apps/api/http";

  function sendCalc() {
    fetch(
      `http://localhost:5050/calc?FromTime=${fromTime}&ToTime=${toTime}&Operation=${operation}`,
      {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("the call works ok");
        }
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

<button on:click={sendCalc}>Calc</button>
