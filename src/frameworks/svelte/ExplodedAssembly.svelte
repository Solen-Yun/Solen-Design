<script lang="ts">
import { onMount } from "svelte";
import { mountExplodedAssembly, type ExplodedAssemblyOptions } from "../../components/exploded-assembly/ExplodedAssemblyEngine.js";
import type { MotionController } from "../../components/exploded-assembly/motion-runtime";
export let options: ExplodedAssemblyOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountExplodedAssembly(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="exploded-assembly"></div>
