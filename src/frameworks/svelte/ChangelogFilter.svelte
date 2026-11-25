<script lang="ts">
import { onMount } from "svelte";
import { mountChangelogFilter, type ChangelogFilterOptions } from "../../components/changelog-filter/ChangelogFilterEngine.js";
import type { MotionController } from "../../components/changelog-filter/motion-runtime";
export let options: ChangelogFilterOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountChangelogFilter(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="changelog-filter"></div>
