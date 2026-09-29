require('dotenv/config');
const RunwayML = require('@runwayml/sdk').default;

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
});

async function main() {
  console.log('Checking connection (organization.retrieve)...');
  const org = await client.organization.retrieve();
  console.log('Connected. Credit balance:', org.creditBalance);

  console.log('\nStarting text-to-image generation...');
  const task = await client.textToImage
    .create({
      model: 'gen4_image',
      promptText: 'A small red boat floating on a calm blue lake at sunrise',
      ratio: '1024:1024',
    })
    .waitForTaskOutput();

  console.log('Generation succeeded:', task.output);
}

main().catch((err) => {
  console.error('Runway test failed:', err);
  process.exit(1);
});
