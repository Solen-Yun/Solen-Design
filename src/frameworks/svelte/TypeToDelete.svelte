<script lang="ts">
import { onMount } from "svelte";
import { mountTypeToDelete, type TypeToDeleteOptions } from "../../components/type-to-delete/TypeToDeleteEngine.js";
import type { MotionController } from "../../components/type-to-delete/motion-runtime";
export let options: TypeToDeleteOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTypeToDelete(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="type-to-delete"></div>
