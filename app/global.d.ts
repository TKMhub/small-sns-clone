import type { Database as DB } from "@/app/lib/database.types.ts";

declare global {
  type Database = DB;
}
