<script lang="ts">
import { onMount } from "svelte";
import { mountCollectionLayoutMorph, type CollectionLayoutMorphOptions } from "../../components/collection-layout-morph/CollectionLayoutMorphEngine.js";
import type { MotionController } from "../../components/collection-layout-morph/motion-runtime";
export let options: CollectionLayoutMorphOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCollectionLayoutMorph(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="collection-layout-morph"></div>
