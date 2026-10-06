"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface ToolFilterValue {
  tool: string | null;
  setTool: (id: string | null) => void;
  /** WorkGrid registers a callback to measure card positions before a change (FLIP). */
  onBeforeChange: (fn: (() => void) | null) => void;
}

const Ctx = createContext<ToolFilterValue>({ tool: null, setTool: () => {}, onBeforeChange: () => {} });

/** Shares the selected Toolbox tool with the WorkGrid below it. */
export function ToolFilterProvider({ children }: { children: ReactNode }) {
  const [tool, setToolState] = useState<string | null>(null);
  const before = useRef<(() => void) | null>(null);

  const setTool = useCallback((id: string | null) => {
    before.current?.();
    setToolState(id);
  }, []);
  const onBeforeChange = useCallback((fn: (() => void) | null) => {
    before.current = fn;
  }, []);

  return <Ctx.Provider value={{ tool, setTool, onBeforeChange }}>{children}</Ctx.Provider>;
}

export const useToolFilter = () => useContext(Ctx);
