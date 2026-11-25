<script lang="ts">
import { onMount } from "svelte";
import { mountSailingToc, type SailingTocOptions } from "../../components/sailing-toc/SailingTocEngine.js";
import type { MotionController } from "../../components/sailing-toc/motion-runtime";
export let options: SailingTocOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSailingToc(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="sailing-toc"></div>
