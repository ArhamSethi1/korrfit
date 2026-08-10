import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getSiteTexts } from "./site-texts.functions";
import { defaultTexts } from "@/data/editable-text";

type Ctx = { texts: Record<string, string>; loading: boolean };

const TextCtx = createContext<Ctx>({ texts: defaultTexts, loading: false });

export function TextProvider({ children }: { children: ReactNode }) {
  const load = useServerFn(getSiteTexts);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    load()
      .then((data) => {
        if (!cancelled) setOverrides(data ?? {});
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [load]);

  return (
    <TextCtx.Provider value={{ texts: { ...defaultTexts, ...overrides }, loading }}>
      {children}
    </TextCtx.Provider>
  );
}

/** Returns the edited copy for a key, falling back to the built-in default. */
export function useText() {
  const { texts } = useContext(TextCtx);
  return (key: string, fallback?: string) => texts[key] ?? fallback ?? "";
}

/** True while the edited copy is still being fetched — used for skeletons. */
export function useTextsLoading() {
  return useContext(TextCtx).loading;
}
