/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLevelUpXp, type LevelUpXpOptions } from "../../components/level-up-xp/LevelUpXpEngine.js";
import type { MotionController } from "../../components/level-up-xp/motion-runtime";

export function LevelUpXp(props: { options?: LevelUpXpOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLevelUpXp(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="level-up-xp" />;
}
