import { mountArticlePaywall, type ArticlePaywallOptions } from "../../components/article-paywall/ArticlePaywallEngine.js";
import type { MotionController } from "../../components/article-paywall/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ArticlePaywallOptions = {}): ReturnType<typeof mountArticlePaywall> {
  return mountArticlePaywall(target, options);
}
export type { ArticlePaywallOptions };
