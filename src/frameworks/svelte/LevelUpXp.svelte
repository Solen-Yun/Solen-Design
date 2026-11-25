<script lang="ts">
import { onMount } from "svelte";
import { mountLevelUpXp, type LevelUpXpOptions } from "../../components/level-up-xp/LevelUpXpEngine.js";
import type { MotionController } from "../../components/level-up-xp/motion-runtime";
export let options: LevelUpXpOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLevelUpXp(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="level-up-xp"></div>
