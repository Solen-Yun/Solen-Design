/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountInstallCommandTabs, type InstallCommandTabsOptions } from "../../components/install-command-tabs/InstallCommandTabsEngine.js";
import type { MotionController } from "../../components/install-command-tabs/motion-runtime";

export function InstallCommandTabs(props: { options?: InstallCommandTabsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountInstallCommandTabs(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="install-command-tabs" />;
}
