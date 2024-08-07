import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { rimraf } from 'rimraf';
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

(async () => {
    let originalBranch = null;
    let hasStash = false;

    try {
        // Check if we are in a detached HEAD state
        const status = execSync('git symbolic-ref --short HEAD 2>/dev/null || echo "detached"').toString().trim();

        if (status === 'detached') {
            // Stash uncommitted changes
            if (execSync('git status --porcelain').toString().trim()) {
                execSync('git stash', { stdio: 'inherit' });
                hasStash = true;
            }

            // Store the current commit hash to return to later
            originalBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

            // Checkout the main branch
            checkoutCommit('main');
        } else {
            originalBranch = status;
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
    } finally {
        // Switch back to the original branch
        if (originalBranch) {
            checkoutCommit(originalBranch);
        }

        // Pop stashed changes
        if (hasStash) {
            execSync('git stash pop', { stdio: 'inherit' });
        }
    }
})();
