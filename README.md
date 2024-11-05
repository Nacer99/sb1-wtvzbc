## Firebase Setup Guide for Farm Booking Platform

### Prerequisites
1. Node.js installed on your machine
2. A Firebase account (free tier is sufficient)

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Name your project (e.g., "farm-booking-platform")
4. Follow the setup wizard (disable Google Analytics if not needed)

### Step 2: Set Up Firebase in Your App
1. In Firebase Console, click the gear icon ⚙️ and select "Project settings"
2. Scroll down to "Your apps" and click the web icon (</>)
3. Register your app with a nickname
4. Copy the firebaseConfig object
5. Replace the config in `src/lib/firebase.ts` with your copied config

### Step 3: Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" authentication
4. Add your first test user in the "Users" tab

### Step 4: Set Up Firestore Database
1. Go to "Firestore Database"
2. Click "Create Database"
3. Start in production mode
4. Choose a location closest to your users
5. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /farms/{farmId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
                 request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

### Step 5: Initialize the Database
1. Update `src/lib/firebase.ts` with your Firebase config
2. Run the seeding script:
```bash
npm run seed
```

### Step 6: Test the Setup
1. Start the development server:
```bash
npm run dev
```
2. Try creating an account and logging in
3. Search for farms and create a booking
4. Check Firebase Console to see the created documents

### Common Issues

#### Seeding Script Errors
If you encounter errors when running `npm run seed`:

1. Ensure you have the correct Firebase config
2. Check if you're logged in to Firebase:
```bash
firebase login
```
3. Verify your Firestore rules allow write access
4. Check your internet connection

#### Authentication Errors
- Enable the authentication providers you want to use in Firebase Console
- Ensure your Firebase config is correct
- Check if your app's domain is authorized in Firebase Console

#### Database Access Errors
- Verify your Firestore rules
- Check if the user is properly authenticated
- Ensure you're using the correct collection names

### Database Structure

```
/farms
  - farmId
    - name: string
    - location: string
    - description: string
    - image: string
    - images: string[]
    - rating: number
    - priceRange: string
    - availableDates: string[]
    - meals: array
      - id: string
      - name: string
      - description: string
      - price: number
      - available: number

/bookings
  - bookingId
    - farmId: string
    - userId: string
    - date: string
    - guests: object
      - adults: number
      - children: number
    - meals: array
      - id: string
      - name: string
      - quantity: number
      - price: number
    - totalAmount: number
    - status: string
    - createdAt: string
```

### Security Best Practices
1. Never commit Firebase config with real credentials
2. Use environment variables for sensitive data
3. Implement proper security rules
4. Regular backup of Firestore data
5. Monitor usage and set up billing alerts