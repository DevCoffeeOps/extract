import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildType = process.argv[2];
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').substring(0, 8);

function getCommitHash(commitSpec) {
  return execSync(`git rev-parse ${commitSpec}`).toString().trim();
}

function checkoutCommit(commitHash) {
  execSync(`git checkout ${commitHash}`, { stdio: 'inherit' });
}

function buildAndSave(commitHash) {
  const buildDir = join(__dirname, '..', 'builds', `${timestamp}-${commitHash}`);
  const distDir = join(__dirname, '..', 'dist');

  if (fs.existsSync(buildDir)) {
    rimraf.sync(buildDir);
  }

  execSync('npm run build', { stdio: 'inherit' });

  fs.mkdirSync(buildDir, { recursive: true });
  fs.renameSync(distDir, join(buildDir, 'dist'));

  console.log(`Build saved to ${buildDir}`);
}

function getCurrentBranch() {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}

function getUncommittedChanges() {
  return execSync('git diff --name-only').toString().trim();
}

function getCurrentCommit() {
  return execSync('git rev-parse HEAD').toString().trim();
}

function isDetached() {
  return execSync('git symbolic-ref --short HEAD 2>/dev/null || echo "detached"').toString().trim() === 'detached';
}

(async () => {
  let originalBranch = null;
  let hasStash = false;
  let uncommittedChanges = '';
  let currentCommit = '';

  try {
    // Record the current state
    if (isDetached()) {
      originalBranch = null;
      uncommittedChanges = getUncommittedChanges();
      if (uncommittedChanges) {
        execSync('git stash', { stdio: 'inherit' });
        hasStash = true;
      }
      // Switch to main branch
      checkoutCommit('main');
    } else {
      originalBranch = getCurrentBranch();
      currentCommit = getCurrentCommit();
      if (currentCommit !== getCurrentCommit()) {
        checkoutCommit('main');
      }
    }

    let commitHash;
    if (buildType === 'current') {
      commitHash = 'current';
    } else if (buildType === 'last') {
      commitHash = getCommitHash('HEAD');
    } else if (buildType === 'two-commits-ago') {
      commitHash = getCommitHash('HEAD~1');
    } else {
      throw new Error('Invalid build type');
    }

    buildAndSave(commitHash);
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    try {
      if (isDetached()) {
        if (originalBranch) {
          checkoutCommit(originalBranch);
        }
      } else if (originalBranch) {
        checkoutCommit(originalBranch);
      }

      if (hasStash) {
        execSync('git stash pop', { stdio: 'inherit' });
      }
    } catch (error) {
      console.error('Failed to restore original state:', error.message);
    }
  }
})();
