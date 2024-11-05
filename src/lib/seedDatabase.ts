import { collection, getDocs, addDoc, query, connectFirestoreEmulator } from 'firebase/firestore';
import { db, authenticateAnonymously } from './firebase';

const sampleFarms = [
  {
    name: 'Green Valley Farm',
    location: 'Tuscany, Italy',
    description: 'Experience authentic Italian farm life with stunning vineyard views. Our family-run estate offers traditional cuisine made with ingredients grown right here on our property.',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1595275320712-c0b7c97f4c24?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80'
    ],
    rating: 4.8,
    priceRange: '€30-€75',
    availableDates: [
      '2024-03-15',
      '2024-03-16',
      '2024-03-17',
      '2024-03-18',
      '2024-03-19'
    ],
    meals: [
      {
        id: 'meal1',
        name: 'Traditional Farm Breakfast',
        description: 'Fresh eggs, homemade bread, local cheese, and seasonal fruits',
        price: 25,
        available: 20
      },
      {
        id: 'meal2',
        name: 'Harvest Lunch Special',
        description: 'Farm-to-table vegetables, grilled meats, and homemade pasta',
        price: 35,
        available: 15
      },
      {
        id: 'meal3',
        name: 'Sunset Dinner Experience',
        description: 'Five-course dinner featuring seasonal specialties and wine pairing',
        price: 55,
        available: 10
      }
    ]
  },
  {
    name: 'Alpine Meadows',
    location: 'Swiss Alps',
    description: 'Traditional Swiss farm offering cheese-making experiences and mountain views. Join us for authentic Alpine cuisine and breathtaking scenery.',
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548600916-dc8492f8e845?auto=format&fit=crop&q=80'
    ],
    rating: 4.9,
    priceRange: '€45-€90',
    availableDates: [
      '2024-03-15',
      '2024-03-16',
      '2024-03-17',
      '2024-03-18'
    ],
    meals: [
      {
        id: 'meal4',
        name: 'Alpine Breakfast',
        description: 'Mountain herbs tea, fresh milk, local cheese, and homemade bread',
        price: 30,
        available: 25
      },
      {
        id: 'meal5',
        name: 'Cheese Making Experience & Lunch',
        description: 'Learn to make traditional Swiss cheese followed by a hearty lunch',
        price: 75,
        available: 8
      }
    ]
  },
  {
    name: 'Lavender Fields Estate',
    location: 'Provence, France',
    description: 'Immerse yourself in the beauty of lavender fields and French cuisine. Our historic estate offers an unforgettable Provençal experience.',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595274459742-4a41d35784ee?auto=format&fit=crop&q=80'
    ],
    rating: 4.7,
    priceRange: '€35-€80',
    availableDates: [
      '2024-03-16',
      '2024-03-17',
      '2024-03-18',
      '2024-03-19'
    ],
    meals: [
      {
        id: 'meal6',
        name: 'Provençal Breakfast',
        description: 'Croissants, local honey, lavender tea, and fresh fruits',
        price: 28,
        available: 30
      },
      {
        id: 'meal7',
        name: 'Mediterranean Lunch',
        description: 'Fresh seafood, local vegetables, and Provençal herbs',
        price: 45,
        available: 20
      },
      {
        id: 'meal8',
        name: 'French Country Dinner',
        description: 'Traditional French cuisine with wine pairing',
        price: 65,
        available: 15
      }
    ]
  }
];

export async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  try {
    // Authenticate anonymously
    console.log('👤 Authenticating...');
    await authenticateAnonymously();
    console.log('✅ Authentication successful');

    // Initialize Firestore collection
    console.log('🏗️ Initializing Firestore collection...');
    const farmsRef = collection(db, 'farms');
    
    // Check if farms collection exists and has documents
    console.log('🔍 Checking for existing farms...');
    try {
      const existingFarms = await getDocs(query(farmsRef));
      
      if (!existingFarms.empty) {
        console.log(`ℹ️ Found ${existingFarms.size} existing farms. Skipping seeding.`);
        return;
      }
    } catch (error) {
      console.log('No existing farms found or error checking:', error);
    }

    console.log('📝 Starting to seed farms...');
    
    // Add farms in sequence with delay between attempts
    for (const farm of sampleFarms) {
      console.log(`➕ Adding farm: ${farm.name}`);
      try {
        const docRef = await addDoc(farmsRef, farm);
        console.log(`✅ Added farm with ID: ${docRef.id}`);
        // Add a small delay between operations
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Error adding farm ${farm.name}:`, error);
        // Add a longer delay if there was an error
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('✨ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}