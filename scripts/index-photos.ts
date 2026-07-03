import fs from "node:fs/promises";
import path from "node:path";
import programJson from "@/data/program.json";
import manualMap from "@/data/manualMap.json";
import { indexPhotos } from "@/lib/photoIndexer";
import type { DancePiece } from "@/lib/types";

async function main(): Promise<void> {
  const siteRoot = process.cwd();
  const workspaceRoot = path.resolve(siteRoot, "..");
  const srcDataDir = path.join(siteRoot, "src", "data");
  const rootDataDir = path.join(siteRoot, "data");

  const program = structuredClone(programJson as DancePiece[]);
  if (program.length === 0) {
    throw new Error("Program data is empty. Populate src/data/program.json first.");
  }

  const results = await indexPhotos(program, {
    rootDir: workspaceRoot,
    appDir: siteRoot,
    manualMap: manualMap as Record<string, string>,
  });

  await fs.mkdir(rootDataDir, { recursive: true });
  const outputs = [
    ["program.json", `${JSON.stringify(results.program, null, 2)}\n`],
    ["photoIndex.json", `${JSON.stringify(results.photoIndex, null, 2)}\n`],
    ["unmatched.json", `${JSON.stringify(results.unmatched, null, 2)}\n`],
  ] as const;
  for (const [name, content] of outputs) {
    await fs.writeFile(path.join(srcDataDir, name), content, "utf8");
    await fs.writeFile(path.join(rootDataDir, name), content, "utf8");
  }

  if (results.unmatched.warnings.length > 0) {
    console.warn("Matching warnings:");
    for (const warning of results.unmatched.warnings) {
      console.warn(`- ${warning}`);
    }
  }
  console.log(`Indexed ${results.photoIndex.pieces.length} dance folders.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
