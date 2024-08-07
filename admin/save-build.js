import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { rimraf } from 'rimraf';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildType = process.argv[2];
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').substring(0, 8);

function getBuildPrefix(type) {
    switch (type) {
        case 'current':
            return '01-';
        case 'last':
            return '02-';
        case 'two-commits-ago':
            return '03-';
        default:
            throw new Error('Invalid build type');
    }
}

function runCommand(command) {
    execSync(command, { stdio: 'inherit' });
}

function getCommitHash(commitSpec) {
    return execSync(`git rev-parse ${commitSpec}`).toString().trim();
}

function checkoutBranch(branch) {
    runCommand(`git checkout ${branch}`);
}

function buildAndSave(commitHash) {
    const buildPrefix = getBuildPrefix(buildType);
    const buildDir = join(__dirname, '..', 'builds', `${buildPrefix}${timestamp}${commitHash ? '-' + commitHash : ''}`);
    const distDir = join(__dirname, '..', 'dist');

    if (fs.existsSync(buildDir)) {
        rimraf.sync(buildDir);
    }

    runCommand('npm run build');

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

function isDetached() {
    return execSync('git symbolic-ref --short HEAD 2>/dev/null || echo "detached"').toString().trim() === 'detached';
}

(async () => {
    let originalBranch = null;
    let hasStash = false;
    let uncommittedChanges = '';

    try {
        // Save the current state
        if (isDetached()) {
            originalBranch = 'main';
            uncommittedChanges = getUncommittedChanges();
            if (uncommittedChanges) {
                runCommand('git stash');
                hasStash = true;
            }
            // Check out the main branch
            checkoutBranch('main');
        } else {
            originalBranch = getCurrentBranch();
            if (originalBranch !== 'main') {
                checkoutBranch('main');
            }
        }

        let commitHash;
        if (buildType === 'current') {
            commitHash = '';
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
            // Restore the original branch
            if (originalBranch) {
                checkoutBranch(originalBranch);
            }

            // Apply stashed changes if any
            if (hasStash) {
                runCommand('git stash pop');
            }
        } catch (error) {
            console.error('Failed to restore original state:', error.message);
        }
    }
})();
