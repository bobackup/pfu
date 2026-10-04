import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";

export function CopyField({ label, value }: { label: string; value: string }) {
  const { t } = useT();
  const [done, setDone] = useState(false);
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 rounded-lg border bg-muted px-3 py-2">
        <span className="flex-1 break-all font-mono text-sm sm:text-base">{value}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText(value.replace(/[[\]]/g, ""));
            setDone(true);
            setTimeout(() => setDone(false), 2000);
          }}
          aria-label={`${t.common.copy} ${label}`}
        >
          {done ? <Check /> : <Copy />} <span aria-live="polite">{done ? t.common.copied : t.common.copy}</span>
        </Button>
      </div>
    </div>
  );
}
