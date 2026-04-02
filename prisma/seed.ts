import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { CATEGORIES } from "../src/lib/categories";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Day 1 = 2026-04-01
const DAY_ONE = new Date("2026-04-01T00:00:00Z");

function dayNumberToDate(dayNumber: number): Date {
  const d = new Date(DAY_ONE);
  d.setUTCDate(d.getUTCDate() + (dayNumber - 1));
  // Publish at 08:00 UTC
  d.setUTCHours(8, 0, 0, 0);
  return d;
}

interface RawComment {
  comment_id: string;
  day_number: number;
  publish_order: number;
  type: string;
  thread_root_id: string;
  parent_id: string | null;
  depth: number;
  username: string;
  persona_tag: string;
  intent: string;
  sentiment: string;
  models: string[];
  title: string | null;
  body: string;
}

interface Block {
  block_id: string;
  source_block: string;
  day_range: number[];
  items: RawComment[];
}

async function main() {
  console.log("Seeding database...");

  // 1. Upsert categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        status: cat.status,
        sortOrder: cat.sortOrder,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        status: cat.status,
        sortOrder: cat.sortOrder,
      },
    });
  }
  console.log(`Seeded ${CATEGORIES.length} categories.`);

  // 2. Load comments from JSON (multi-block format)
  const jsonPath = path.join(__dirname, "..", "commenti_forum.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");

  // Split blocks: each block is a top-level JSON object separated by }\n{
  const blockStrings = raw.split(/\}\s*\{/).map((s, i, arr) => {
    if (i === 0) return s + "}";
    if (i === arr.length - 1) return "{" + s;
    return "{" + s + "}";
  });

  const allComments: RawComment[] = [];
  const seenIds = new Set<string>();

  for (const blockStr of blockStrings) {
    const block: Block = JSON.parse(blockStr);
    for (const item of block.items) {
      if (!seenIds.has(item.comment_id)) {
        seenIds.add(item.comment_id);
        allComments.push(item);
      }
    }
  }

  console.log(`Loaded ${allComments.length} unique comments from JSON.`);

  // 3. Collect unique usernames and create users
  const usernames = [...new Set(allComments.map((c) => c.username))];
  for (const username of usernames) {
    await prisma.user.upsert({
      where: { username },
      update: {},
      create: { username },
    });
  }
  console.log(`Seeded ${usernames.length} users.`);

  // 4. Insert scheduled comments in batches
  // Clear existing to allow re-seeding
  await prisma.scheduledComment.deleteMany();

  const batchSize = 100;
  for (let i = 0; i < allComments.length; i += batchSize) {
    const batch = allComments.slice(i, i + batchSize);
    await prisma.scheduledComment.createMany({
      data: batch.map((c) => ({
        commentId: c.comment_id,
        dayNumber: c.day_number,
        publishOrder: c.publish_order,
        publishDate: dayNumberToDate(c.day_number),
        type: c.type,
        threadRootId: c.thread_root_id,
        parentId: c.parent_id,
        depth: c.depth,
        username: c.username,
        personaTag: c.persona_tag,
        intent: c.intent,
        sentiment: c.sentiment,
        models: c.models,
        title: c.title,
        body: c.body,
        published: false,
      })),
    });
    console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allComments.length / batchSize)}`);
  }

  console.log(`Seeded ${allComments.length} scheduled comments.`);
  console.log("Done!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
