import { cp, mkdir } from "node:fs/promises";

await mkdir(new URL("../dist/config/", import.meta.url), { recursive: true });
for (const name of ["a2at.yaml", "agent.yaml", "workflow.yaml"]) {
  await cp(
    new URL("../src/config/" + name, import.meta.url),
    new URL("../dist/config/" + name, import.meta.url),
  );
}
