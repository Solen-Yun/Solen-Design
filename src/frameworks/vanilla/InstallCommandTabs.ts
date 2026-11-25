import { mountInstallCommandTabs, type InstallCommandTabsOptions } from "../../components/install-command-tabs/InstallCommandTabsEngine.js";
import type { MotionController } from "../../components/install-command-tabs/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: InstallCommandTabsOptions = {}): ReturnType<typeof mountInstallCommandTabs> {
  return mountInstallCommandTabs(target, options);
}
export type { InstallCommandTabsOptions };
