#!/usr/bin/env node

// Script created for Websites deployed with a Homepage tag in package.json
// which doesn´t allow serve to perform correctly
// You need serve installed in your project or globally
// npm install -g serve


const fs = require('fs');
const { spawn } = require("child_process");
let packageJsonData = null;

removeHomepage()
 .then(() => startBuilding());

process.on('SIGINT', () => {
    process.exitCode = 0;

    if (packageJsonData) {
        console.log('\nWAIT to Package.json is restored');
        fs.writeFile('./package.json', packageJsonData, 'utf-8', (err) => {

            packageJsonData = null;
            handleResponse(err, 'Package.json restored');
        });
    }

});

function removeHomepage() {

    return new Promise((resolve) => {

        fs.readFile('./package.json', 'utf-8', (err, data) => {
            handleResponse(err);

            packageJsonData = data;
        
            const idOfHomepageInPackage = data.indexOf("homepage");
        
            if (idOfHomepageInPackage !== -1) {
        
                const end = data.indexOf("\",", idOfHomepageInPackage);
                const homePageString = data.substring(idOfHomepageInPackage - 1, end + 2)
            
                const noHomepage = data.replace(homePageString, '');
                
                fs.writeFile('./package.json', noHomepage, 'utf-8', (err, data) => handleResponse(err, 'Homepage removed succesfully from Package.json\n'));
                
                return resolve();
            }
        
            console.log('No Homepage removed. Package.json was not modified');
            return resolve();
        });
    });
}

function startBuilding() {
    const build = spawn('npm', ['run', 'build']);

    spawnChildrenConsumers(build);
    build.on('close', startServing);
}

function startServing() {
    const serve = spawn('serve', ['-s', 'build', '-l', '5000']);

    spawnChildrenConsumers(serve);
    
    serve.on('close', (code) => {
        console.log(`Process exit with code ${code}`);
    });
}

function spawnChildrenConsumers(child) {

    child.stdout.on("data", data => {
        console.log(data.toString());
    });
    
    child.stderr.on("data", data => {
        console.log(`stderr: ${data.toString()}`);
    });
    
    child.on('error', (error) => {
        console.error(`error: ${error.message}`);
    });
}

const handleResponse = (err, success) => {
    if (err) console.error(err);

    if (success) console.log(success);
}
