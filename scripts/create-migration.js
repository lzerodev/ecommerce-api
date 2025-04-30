import { execSync } from 'child_process';

const args = process.argv.slice(2);
const name = args[0];

if (!name) {
  console.error('❌ You must provide a migration name.');
  console.error('Usage: npm run migration:create MigrationName');
  process.exit(1);
}

const command = `npm run typeorm -- migration:create src/db/migrations/${name}`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to create migration:', error.message);
  process.exit(1);
}
