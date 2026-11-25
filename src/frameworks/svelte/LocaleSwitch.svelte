<script lang="ts">
import { onMount } from "svelte";
import { mountLocaleSwitch, type LocaleSwitchOptions } from "../../components/locale-switch/LocaleSwitchEngine.js";
import type { MotionController } from "../../components/locale-switch/motion-runtime";
export let options: LocaleSwitchOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLocaleSwitch(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="locale-switch"></div>
