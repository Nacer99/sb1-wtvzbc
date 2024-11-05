import { seedDatabase } from '../lib/seedDatabase';

const main = async () => {
  try {
    await seedDatabase();
    // Add a delay before exiting to ensure all operations complete
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

main();