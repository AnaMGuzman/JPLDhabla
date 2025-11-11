// ✅ Reemplazo sencillo de useClipboard
import { useState } from "react";

export function useClipboardCustom() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("❌ Error al copiar:", err);
    }
  };

  return [copied, copy];
}
