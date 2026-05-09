const fs = require('fs');
const path = require('path');

function removeEntry(entryPath) {
  const stat = fs.lstatSync(entryPath);

  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    fs.rmSync(entryPath, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
    return;
  }

  fs.unlinkSync(entryPath);
}

let lockedArtifacts = 0;

for (const directory of ['allure-results', 'allure-report']) {
  const directoryPath = path.resolve(directory);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    continue;
  }

  for (const entry of fs.readdirSync(directoryPath)) {
    const entryPath = path.join(directoryPath, entry);

    try {
      removeEntry(entryPath);
    } catch (error) {
      if (error.code !== 'EPERM' && error.code !== 'EBUSY') {
        throw error;
      }

      lockedArtifacts += 1;
    }
  }
}

if (lockedArtifacts > 0) {
  console.warn(`Could not remove ${lockedArtifacts} locked Allure artifact(s).`);
}
