import { supabase } from "@/lib/supabase";

export const detailItem = async (userId: string) => {
  const res = await supabase.from('folder').select('*');
  return res.data;
}