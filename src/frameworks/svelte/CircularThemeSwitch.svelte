<script lang="ts">
import { onMount } from "svelte";
import { mountCircularThemeSwitch, type CircularThemeSwitchOptions } from "../../components/circular-theme-switch/CircularThemeSwitchEngine.js";
import type { MotionController } from "../../components/circular-theme-switch/motion-runtime";
export let options: CircularThemeSwitchOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCircularThemeSwitch(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="circular-theme-switch"></div>
