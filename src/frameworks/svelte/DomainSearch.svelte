<script lang="ts">
import { onMount } from "svelte";
import { mountDomainSearch, type DomainSearchOptions } from "../../components/domain-search/DomainSearchEngine.js";
import type { MotionController } from "../../components/domain-search/motion-runtime";
export let options: DomainSearchOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDomainSearch(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="domain-search"></div>
