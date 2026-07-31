import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Grants the admin role to the calling user, but only while no admin exists yet.
 * This bootstraps the very first wedding administrator safely.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw new Error(countError.message);
    if ((count ?? 0) > 0) {
      return { granted: false as const, reason: "An administrator already exists." };
    }

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });

    if (error) throw new Error(error.message);
    return { granted: true as const, reason: "" };
  });
