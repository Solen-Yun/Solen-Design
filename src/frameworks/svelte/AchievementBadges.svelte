<script lang="ts">
import { onMount } from "svelte";
import { mountAchievementBadges, type AchievementBadgesOptions } from "../../components/achievement-badges/AchievementBadgesEngine.js";
import type { MotionController } from "../../components/achievement-badges/motion-runtime";
export let options: AchievementBadgesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAchievementBadges(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="achievement-badges"></div>
