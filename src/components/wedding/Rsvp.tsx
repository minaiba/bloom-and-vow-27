import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { weddingConfig } from "@/config/wedding";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Reveal, SectionTitle } from "./primitives";

const rsvpSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name").max(80),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(30, "Phone number is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  attending: z.enum(["yes", "no"]),
  guests: z.coerce
    .number()
    .int()
    .min(1, "At least one guest")
    .max(weddingConfig.rsvp.maxGuests, `Maximum ${weddingConfig.rsvp.maxGuests} guests`),
  allergies: z.string().trim().max(500).optional().or(z.literal("")),
  menuNotes: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type RsvpValues = z.input<typeof rsvpSchema>;

const fieldClass =
  "w-full rounded-xl border border-input bg-card/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/30";

const labelClass =
  "block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground";

export function Rsvp() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { attending: "yes", guests: 1 },
  });

  const attending = watch("attending");

  const onSubmit = handleSubmit(async (raw) => {
    const values = rsvpSchema.parse(raw);
    const { error } = await supabase.from("rsvps").insert({
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phone,
      email: values.email,
      attending: values.attending === "yes",
      guests: values.attending === "yes" ? values.guests : 0,
      allergies: values.allergies || null,
      menu_notes: values.menuNotes || null,
      message: values.message || null,
    });

    if (error) {
      toast.error("We couldn't save your RSVP. Please try again.");
      return;
    }
    setSent(true);
  });

  return (
    <section id="rsvp" className="relative px-6 py-24 sm:py-32">
      <SectionTitle
        overline={`Kindly reply by ${weddingConfig.rsvp.deadline}`}
        title="R.S.V.P."
        subtitle="Please let us know if you can join us — every seat is reserved with love."
      />

      <div className="mx-auto mt-14 max-w-2xl">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl px-8 py-16 text-center"
            >
              <motion.p
                className="script text-5xl text-primary"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Thank You ❤️
              </motion.p>
              <p className="mt-5 text-sm text-foreground/70">
                Your reply has been received. We can't wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="glass space-y-6 rounded-3xl p-8 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className={labelClass} htmlFor="firstName">
                    First name
                  </label>
                  <input id="firstName" className={fieldClass} {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelClass} htmlFor="lastName">
                    Last name
                  </label>
                  <input id="lastName" className={fieldClass} {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelClass} htmlFor="phone">
                    Phone
                  </label>
                  <input id="phone" type="tel" className={fieldClass} {...register("phone")} />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelClass} htmlFor="email">
                    Email
                  </label>
                  <input id="email" type="email" className={fieldClass} {...register("email")} />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <fieldset className="space-y-3">
                <legend className={labelClass}>Will you attend?</legend>
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((value) => (
                    <label
                      key={value}
                      className={cn(
                        "flex-1 cursor-pointer rounded-xl border px-5 py-3 text-center text-xs uppercase tracking-[0.25em] transition-all duration-400",
                        attending === value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-card/70 text-foreground/70 hover:border-primary/40",
                      )}
                    >
                      <input
                        type="radio"
                        value={value}
                        className="sr-only"
                        {...register("attending")}
                      />
                      {value === "yes" ? "Joyfully accept" : "Regretfully decline"}
                    </label>
                  ))}
                </div>
              </fieldset>

              {attending === "yes" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="guests">
                      Number of guests
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min={1}
                      max={weddingConfig.rsvp.maxGuests}
                      className={fieldClass}
                      {...register("guests")}
                    />
                    {errors.guests && (
                      <p className="text-xs text-destructive">{errors.guests.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="allergies">
                      Allergies
                    </label>
                    <input id="allergies" className={fieldClass} {...register("allergies")} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className={labelClass} htmlFor="menuNotes">
                      Menu preferences
                    </label>
                    <input id="menuNotes" className={fieldClass} {...register("menuNotes")} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className={labelClass} htmlFor="message">
                  A note for the couple
                </label>
                <textarea id="message" rows={4} className={fieldClass} {...register("message")} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-8 py-4 text-[0.65rem] uppercase tracking-[0.35em] text-primary-foreground transition-transform duration-500 hover:scale-[1.01] disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
