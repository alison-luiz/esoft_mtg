const { exec } = require('child_process');
const axios = require('axios');

require('dotenv').config();

async function run() {
  try {
    const baseURL = process.env.BASE_URL || 'http://localhost:3000';
    const loginURL = `${baseURL}/login`;
    const cardsURL = `${baseURL}/cards/autocannon`;

    const body = {
      email: 'test@user.com',
      password: 'test@123',
    };

    const loginResponse = await axios.post(loginURL, body);
    const token = loginResponse.data.access_token;

    const autocannonCommand = `autocannon -c 10 -d 10 --renderStatusCodes --latency --debug --warmup [ -c 1 -d 2] -H "Authorization: Bearer ${token}" ${cardsURL}`;

    exec(autocannonCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Erro durante a execução do Autocannon: ${error.message}`,
        );
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (error) {
    console.error('Erro durante a execução:', error);
  }
}

run();
