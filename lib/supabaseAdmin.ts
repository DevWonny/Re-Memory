import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABSE_SERVICE_ROLE_KEY!;
export const supabaseAdmin = createClient(url, key);