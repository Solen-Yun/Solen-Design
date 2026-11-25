<script lang="ts">
import { onMount } from "svelte";
import { mountConditionalContact, type ConditionalContactOptions } from "../../components/conditional-contact/ConditionalContactEngine.js";
import type { MotionController } from "../../components/conditional-contact/motion-runtime";
export let options: ConditionalContactOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountConditionalContact(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="conditional-contact"></div>
