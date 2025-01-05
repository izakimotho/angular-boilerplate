// Create the local npm runtime configuration (.npmrc) for the workspace
const fs = require('fs');
const path = require('path');

const rootDirectory = path.resolve(`${__dirname}/..`); //__dirname => directory for the script 
const npmrcFile = '.npmrc';

fs.access(`${rootDirectory}/${npmrcFile}`, fs.constants.F_OK, (err) => {
    if (err) {
        // If the file doesn't exist, create it
        const content = `
//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}
@kish:registry=https://npm.pkg.github.com
        `.trim() + '\n';

        fs.writeFile(`${rootDirectory}/${npmrcFile}`, content, (err) => {
            if (err) throw err;
            console.log('Generated .npmrc file.');
        });
    } else {
        // If the file already exists, log an error
        console.error('.npmrc file already exists. Aborting file creation.');
    }
});

const configDirectory = 'src/assets/config';
const sourceConfigFile = 'config.prod.json';
const destinationConfigFile = 'config.dev.json';

fs.access(`${configDirectory}/${destinationConfigFile}`, fs.constants.F_OK, (err) => {
    if (err) {
      // If the destination file doesn't exist, copy the template file
      fs.copyFile(`${configDirectory}/${sourceConfigFile}`, `${configDirectory}/${destinationConfigFile}`, (err) => {
        if (err) throw err;
        console.log('Generated development configuration file from production.');
      });
    } else {
      // If the destination file exists, log an error message
      console.error('File already exists. Aborting copy operation.');
    }
  });

  

// Function to run OpenSSL command
function runOpenSSLCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running OpenSSL command: ${error.message}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Directory where we'll store our certificates
const certDir = path.join(__dirname, 'SSL');

// Create certificate directory if it doesn't exist
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Generate private key
const privateKeyPath = path.join(certDir, 'private.key');
runOpenSSLCommand(`openssl genrsa -out ${privateKeyPath} 2048`);

// Create CSR
const csrPath = path.join(certDir, 'csr.pem');
runOpenSSLCommand(`openssl req -new -key ${privateKeyPath} -out ${csrPath}`);

// Generate SSL certificate
const certPath = path.join(certDir, 'certificate.pem');
runOpenSSLCommand(`openssl x509 -req -days 365 -in ${csrPath} -signkey ${privateKeyPath} -out ${certPath}`);

console.log('SSL certificate generated successfully!');