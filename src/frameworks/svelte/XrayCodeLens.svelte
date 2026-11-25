<script lang="ts">
import { onMount } from "svelte";
import { mountXrayCodeLens, type XrayCodeLensOptions } from "../../components/xray-code-lens/XrayCodeLensEngine.js";
import type { MotionController } from "../../components/xray-code-lens/motion-runtime";
export let options: XrayCodeLensOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountXrayCodeLens(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="xray-code-lens"></div>
