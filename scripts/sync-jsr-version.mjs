import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = require(packageJsonPath);

const workspaces = packageJson.workspaces || [];

for (const workspace of workspaces) {
  const workspacePath = path.join(rootDir, workspace);
  const pkgJsonPath = path.join(workspacePath, 'package.json');
  const jsrJsonPath = path.join(workspacePath, 'jsr.json');

  if (fs.existsSync(pkgJsonPath) && fs.existsSync(jsrJsonPath)) {
    const pkg = require(pkgJsonPath);
    const jsr = require(jsrJsonPath);

    if (jsr.version !== pkg.version) {
      console.log(
        `Updating ${workspace} jsr.json version from ${jsr.version} to ${pkg.version}`,
      );
      jsr.version = pkg.version;
      fs.writeFileSync(jsrJsonPath, JSON.stringify(jsr, null, 2) + '\n');
    }
  }
}
