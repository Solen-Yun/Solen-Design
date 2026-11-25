<script lang="ts">
import { onMount } from "svelte";
import { mountApiPlayground, type ApiPlaygroundOptions } from "../../components/api-playground/ApiPlaygroundEngine.js";
import type { MotionController } from "../../components/api-playground/motion-runtime";
export let options: ApiPlaygroundOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountApiPlayground(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="api-playground"></div>
