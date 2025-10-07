import { z } from "zod";
export const GenSchema = z.object({
  platform: z.enum(["tiktok","instagram","youtube"]),
  tone: z.enum(["educational","funny","bold","luxury","inspirational","authoritative","story"]),
  cta: z.enum(["follow","comment","save","share","visit_bio","buy_now","dm_me"]),
  keywords: z.array(z.string()).max(12).default([]),
  context: z.string().min(10).max(1000)
});
