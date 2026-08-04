type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * Lightweight tracking shim. Pushes to window.dataLayer when a tag manager is
 * present, and logs in dev so events are verifiable without a provider.
 */
export function trackEvent(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  if (import.meta.env.DEV) console.info("[track]", payload);
}
