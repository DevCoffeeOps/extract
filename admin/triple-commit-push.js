import { execSync } from 'child_process';

function runCommand(command) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to run command "${command}":`, error.message);
        process.exit(1);
    }
}

function commitAndPush() {
    // Add all changes (this will be empty since we are not making any actual changes)
    runCommand('git add --all');

    // Create three empty commits
    for (let i = 1; i <= 3; i++) {
        const commitMessage = `Empty commit ${i}`;
        runCommand(`git commit --allow-empty -m '${commitMessage}'`);
    }

    // Push the commits
    runCommand('git push');
}

commitAndPush();
