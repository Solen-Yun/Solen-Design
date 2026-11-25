<script lang="ts">
import { onMount } from "svelte";
import { mountLongPressPeek, type LongPressPeekOptions } from "../../components/long-press-peek/LongPressPeekEngine.js";
import type { MotionController } from "../../components/long-press-peek/motion-runtime";
export let options: LongPressPeekOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLongPressPeek(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="long-press-peek"></div>
