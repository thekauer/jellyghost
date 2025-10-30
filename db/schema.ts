import {
  pgTable,
  check,
  serial,
  text,
  real,
  varchar,
  pgSchema,
  index,
  jsonb,
  timestamp,
  uuid,
  customType,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const neonAuth = pgSchema("neon_auth");

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
});

export const playingWithNeon = pgTable(
  "playing_with_neon",
  {
    id: serial().primaryKey().notNull(),
    name: text().notNull(),
    value: real(),
  },
  (table) => [
    check("playing_with_neon_id_not_null", sql`NOT NULL id`),
    check("playing_with_neon_name_not_null", sql`NOT NULL name`),
  ],
);

export const emebrek = pgTable(
  "emebrek",
  {
    id: serial().primaryKey().notNull(),
    nev: varchar({ length: 255 }),
  },
  (table) => [check("emebrek_id_not_null", sql`NOT NULL id`)],
);

export const usersSyncInNeonAuth = neonAuth.table(
  "users_sync",
  {
    rawJson: jsonb("raw_json").notNull(),
    id: text()
      .primaryKey()
      .notNull()
      .generatedAlwaysAs(sql`(raw_json ->> 'id'::text)`),
    name: text().generatedAlwaysAs(sql`(raw_json ->> 'display_name'::text)`),
    email: text().generatedAlwaysAs(sql`(raw_json ->> 'primary_email'::text)`),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).generatedAlwaysAs(
      sql`to_timestamp((trunc((((raw_json ->> 'signed_up_at_millis'::text))::bigint)::double precision) / (1000)::double precision))`,
    ),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
  },
  (table) => [
    index("users_sync_deleted_at_idx").using(
      "btree",
      table.deletedAt.asc().nullsLast().op("timestamptz_ops"),
    ),
    check("users_sync_raw_json_not_null", sql`NOT NULL raw_json`),
    check("users_sync_id_not_null", sql`NOT NULL id`),
  ],
);

export const posts = pgTable("posts", {
  id: uuid().notNull().primaryKey().defaultRandom(),
  text: text(),
  originalImage: bytea().notNull(),
  userId: text()
    .references(() => usersSyncInNeonAuth.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
