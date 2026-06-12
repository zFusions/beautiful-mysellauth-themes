#!/usr/bin/env node
/**
 * Upload binary theme assets (png, woff2, …) to SellAuth.
 *
 * `sellauth-theme watch` only syncs text files (.css, .njk, …).
 * `sellauth-theme push` reads binaries as UTF-8 and corrupts them.
 * Use this script after adding or changing images/fonts.
 *
 * Usage: node scripts/upload-theme-binaries.mjs --theme 156746
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const CLI_ROOT = path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', 'sellauth-theme-cli');
const axios = require(path.join(CLI_ROOT, 'node_modules', 'axios')).default;
const FormData = require(path.join(CLI_ROOT, 'node_modules', 'form-data'));

const BINARY_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'woff', 'woff2', 'ttf', 'otf', 'ico']);
const API_BASE = process.env.SELLAUTH_API_URL || 'https://api-internal-3.sellauth.com/v1';

function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function getConfig() {
  const configPath = path.join(os.homedir(), '.sellauth', 'config.json');
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function authHeaders(apiKey) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  };
}

async function deleteRemoteFile({ apiKey, themeId, folderName, fileName }) {
  try {
    await axios.delete(
      `${API_BASE}/builder/${themeId}/${folderName}/${encodeURIComponent(fileName)}`,
      { headers: authHeaders(apiKey) }
    );
  } catch {
    /* New files may not exist remotely yet — upload still works */
  }
}

async function uploadBinary({ apiKey, themeId, folderName, filePath, fileName }) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), fileName);

  await axios.post(`${API_BASE}/builder/${themeId}/${folderName}/upload`, form, {
    headers: {
      ...form.getHeaders(),
      ...authHeaders(apiKey),
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });
}

function walkBinaries(dir, root, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkBinaries(full, root, out);
      continue;
    }
    const ext = (entry.name.split('.').pop() || '').toLowerCase();
    if (!BINARY_EXT.has(ext)) continue;
    const relative = path.relative(root, full).replace(/\\/g, '/');
    const parts = relative.split('/');
    if (parts.length !== 2) {
      console.warn(`⚠ Skipped (unsupported path): ${relative}`);
      continue;
    }
    out.push({ relative, full, folderName: parts[0], fileName: parts[1] });
  }
  return out;
}

async function main() {
  const themeId = getArg('--theme', '156746');
  const config = getConfig();
  if (!config?.apiKey) {
    console.error('❌ Not logged in. Run: sellauth-theme login');
    process.exit(1);
  }

  const themePath = path.join(process.cwd(), 'themes', themeId);
  if (!fs.existsSync(themePath)) {
    console.error(`❌ Theme folder not found: ${themePath}`);
    process.exit(1);
  }

  const files = walkBinaries(themePath, themePath);
  if (!files.length) {
    console.log('No binary files found.');
    return;
  }

  console.log(`Uploading ${files.length} binary file(s) to theme ${themeId}…\n`);

  for (const file of files) {
    process.stdout.write(`→ ${file.relative} … `);
    try {
      await deleteRemoteFile({
        apiKey: config.apiKey,
        themeId,
        folderName: file.folderName,
        fileName: file.fileName,
      });
      await uploadBinary({
        apiKey: config.apiKey,
        themeId,
        folderName: file.folderName,
        filePath: file.full,
        fileName: file.fileName,
      });
      console.log('✔');
    } catch (err) {
      console.log('✗');
      console.error(`  ${err.response?.data?.message || err.message}`);
      process.exitCode = 1;
    }
  }

  console.log('\nDone. Hard-refresh preview (Ctrl+Shift+R).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
