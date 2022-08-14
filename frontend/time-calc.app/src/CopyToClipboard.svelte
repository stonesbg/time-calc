<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let clipText = "";

  const dispatch = createEventDispatcher<{ copy: string; fail: never }>();

  const copy = () => {
    navigator.clipboard.writeText(clipText).then(
      () => dispatch("copy", clipText),
      (e) => dispatch("fail")
    );
  };
</script>

<slot {copy} />