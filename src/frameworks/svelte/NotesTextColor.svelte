<script lang="ts">
import { onMount } from "svelte";
import { mountNotesTextColor, type NotesTextColorOptions } from "../../components/notes-text-color/NotesTextColorEngine.js";
import type { MotionController } from "../../components/notes-text-color/motion-runtime";
export let options: NotesTextColorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountNotesTextColor(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="notes-text-color"></div>
