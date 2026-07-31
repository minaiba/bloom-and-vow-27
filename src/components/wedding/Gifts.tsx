import { Check, Copy, ExternalLink } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";

import { weddingConfig } from "@/config/wedding";
import { Reveal, SectionTitle } from "./primitives";

export function Gifts() {
  const { gifts, seo } = weddingConfig;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(gifts.cardNumber.replace(/\s/g, ""));
      setCopied(true);
      toast.success("Card number copied");
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy — please copy manually");
    }
  };

  return (
    <section id="gifts" className="relative px-6 py-24 sm:py-32">
      <SectionTitle overline="Gift guide" title="Gifts" />

      <Reveal className="mx-auto mt-12 max-w-2xl text-center">
        <p className="text-sm leading-loose text-foreground/75 sm:text-base">
          Your presence is the greatest gift. {gifts.text}
        </p>
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="glass flex h-full flex-col items-center justify-center gap-5 rounded-3xl p-8">
            <div className="rounded-2xl bg-card p-4">
              <QRCodeSVG value={gifts.payUrl} size={132} level="M" fgColor="#1B3A73" />
            </div>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              Scan to send a gift
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass flex h-full flex-col justify-between gap-6 rounded-3xl p-8">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Card holder
              </p>
              <p className="script mt-2 text-2xl text-primary">{gifts.cardHolder}</p>
              <p className="mt-4 font-mono text-lg tracking-[0.15em] text-foreground/80">
                {gifts.cardNumber}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-primary transition-colors hover:bg-secondary"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy Card Number"}
              </button>
              <a
                href={gifts.payUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-primary-foreground transition-transform duration-500 hover:scale-[1.02]"
              >
                {gifts.payLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mx-auto mt-16 flex max-w-sm flex-col items-center gap-4 text-center">
        <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-soft)]">
          <QRCodeSVG value={seo.siteUrl} size={104} level="M" fgColor="#1B3A73" />
        </div>
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Share our invitation
        </p>
      </Reveal>
    </section>
  );
}
