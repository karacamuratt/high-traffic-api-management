import { execSync } from 'child_process';

export async function bootstrapDatabase() {
    console.log('Bootstrapping database...');

    execSync('npx prisma migrate deploy', {
        stdio: 'inherit',
        env: {
            ...process.env,
            DATABASE_URL: process.env.DIRECT_URL,
        },
    });

    execSync('npm run seed', {
        stdio: 'inherit',
        env: {
            ...process.env,
            DATABASE_URL: process.env.DIRECT_URL,
        },
    });

    console.log('Database ready!');
}
