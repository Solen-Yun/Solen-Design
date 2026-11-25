<script lang="ts">
import { onMount } from "svelte";
import { mountInfiniteSpiral, type InfiniteSpiralOptions } from "../../components/infinite-spiral/InfiniteSpiralEngine.js";
type Controller = ReturnType<typeof mountInfiniteSpiral>;
export let options: InfiniteSpiralOptions = {};
let host: HTMLDivElement;
let controller: Controller | undefined;
onMount(() => {
  const instance = mountInfiniteSpiral(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="infinite-spiral"></div>
