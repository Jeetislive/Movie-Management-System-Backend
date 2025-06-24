import { z } from "zod";
export const filmQuerySchema = z.object({
  limit: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Limit must be a positive number",
    })
    .optional()
    .default("10"),

  pageNo: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Page number must be a positive number",
    })
    .optional()
    .default("1"),

  orderBy: z
    .enum(["title", "release_year", "replacement_cost", "length", "rating"])
    .optional()
    .default("title"),

  orderType: z
    .enum(["asc", "desc"])
    .optional()
    .default("asc"),

  filtersCategory: z.string().optional().default(""),
  filtersLanguage: z.string().optional().default(""),
  filtersRelease_year: z.string().optional().default(""),
  filtersLength_type: z.enum(["gt", "lt", ""]).optional().default(""),
  filtersLength_value: z.string().optional().default("100"),
  filtersActor: z.string().optional().default("")
});