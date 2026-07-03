import { spawnSync } from "node:child_process";

function run(script: string): void {
  const result = spawnSync("npm", ["run", script], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error(`npm run ${script} failed`);
  }
}

function main(): void {
  run("index-photos");
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
