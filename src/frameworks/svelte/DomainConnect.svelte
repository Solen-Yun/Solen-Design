<script lang="ts">
import { onMount } from "svelte";
import { mountDomainConnect, type DomainConnectOptions } from "../../components/domain-connect/DomainConnectEngine.js";
import type { MotionController } from "../../components/domain-connect/motion-runtime";
export let options: DomainConnectOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDomainConnect(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="domain-connect"></div>
