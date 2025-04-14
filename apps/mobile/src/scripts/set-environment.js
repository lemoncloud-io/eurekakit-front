#!/bin/node
const fs = require('fs');
const path = require('path');

function setEnvironment(env) {
    if (!['local', 'dev', 'stage', 'prod'].includes(env)) {
        console.error('Error: Environment must be one of: local, dev, stage, prod');
        process.exit(1);
    }

    const envPath = path.join(__dirname, '..', 'envs');
    const sourceEnvPath = path.join(envPath, `${env}.json`);
    const targetEnvPath = path.join(envPath, 'env.json');

    try {
        // Check if source env file exists
        if (!fs.existsSync(sourceEnvPath)) {
            console.error(`Error: Environment file not found: ${sourceEnvPath}`);
            process.exit(1);
        }

        // Read source env file
        const envConfig = fs.readFileSync(sourceEnvPath, 'utf8');

        // Write to target env.json
        fs.writeFileSync(targetEnvPath, envConfig);

        console.log(`Successfully set environment to: ${env}`);
    } catch (error) {
        console.error('Error setting environment:', error);
        process.exit(1);
    }
}

// Get environment from command line argument
const env = process.argv[2];
setEnvironment(env);
