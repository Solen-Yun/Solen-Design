<script lang="ts">
import { onMount } from "svelte";
import { mountRepoStarButton, type RepoStarButtonOptions } from "../../components/repo-star-button/RepoStarButtonEngine.js";
import type { MotionController } from "../../components/repo-star-button/motion-runtime";
export let options: RepoStarButtonOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRepoStarButton(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="repo-star-button"></div>
