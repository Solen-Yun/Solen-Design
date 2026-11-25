<script lang="ts">
import { onMount } from "svelte";
import { mountSecretTextMask, type SecretTextMaskOptions } from "../../components/secret-text-mask/SecretTextMaskEngine.js";
import type { MotionController } from "../../components/secret-text-mask/motion-runtime";
export let options: SecretTextMaskOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSecretTextMask(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="secret-text-mask"></div>
