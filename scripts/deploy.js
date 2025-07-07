const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const changelogPath = path.join(__dirname, '../app/docs/changelog/page.tsx');

try {
  // Run tests
  try {
    execSync('pnpm test', { stdio: 'inherit' });
  } catch (error) {
    // Ignore error if no tests are found
    if (!error.message.includes('No tests found')) {
      throw error;
    }
  }

  // If tests pass, update the changelog
  const changelogContent = fs.readFileSync(changelogPath, 'utf-8');
  const newEntry = `
    <div className="p-4 mb-4 border rounded-lg">
      <p className="text-lg font-semibold">Test Pass</p>
      <p className="text-sm text-gray-500">${new Date().toLocaleString()}</p>
    </div>
  `;
  const updatedContent = changelogContent.replace(
    '<div id="changelog-content">',
    `<div id="changelog-content">${newEntry}`
  );
  fs.writeFileSync(changelogPath, updatedContent);

  console.log('Changelog updated successfully.');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
}
