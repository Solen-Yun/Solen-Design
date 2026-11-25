<script lang="ts">
import { onMount } from "svelte";
import { mountEmailTypoFix, type EmailTypoFixOptions } from "../../components/email-typo-fix/EmailTypoFixEngine.js";
import type { MotionController } from "../../components/email-typo-fix/motion-runtime";
export let options: EmailTypoFixOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountEmailTypoFix(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="email-typo-fix"></div>
