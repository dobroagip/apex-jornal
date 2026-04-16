#!/usr/bin/env node

/**
 * Script to manage user roles
 * Usage:
 *   node scripts/make-admin.js <email> [role]
 *   node scripts/make-admin.js --list
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '../firebase-admin-key.json');

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log('✅ Firebase Admin initialized');
} catch (error) {
  console.error('❌ Error: firebase-admin-key.json not found!');
  console.error('Please download it from Firebase Console → Project Settings → Service Accounts');
  process.exit(1);
}

const db = admin.firestore();

async function setUserRole(email, role = 'editor') {
  const validRoles = ['user', 'editor', 'admin'];

  if (!validRoles.includes(role)) {
    console.error(`❌ Invalid role: ${role}`);
    console.error(`Valid roles: ${validRoles.join(', ')}`);
    process.exit(1);
  }

  try {
    console.log(`\n🔍 Looking for user: ${email}...`);

    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);
    console.log(`✅ User found: ${userRecord.displayName || 'No name'} (${userRecord.uid})`);

    // Check if user document already exists
    const userDoc = await db.collection('users').doc(userRecord.uid).get();

    if (userDoc.exists()) {
      const currentRole = userDoc.data().role;
      console.log(`ℹ️  Current role: ${currentRole}`);

      if (currentRole === role) {
        console.log(`⚠️  User already has role: ${role}`);
        return;
      }
    }

    // Create or update user document
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || 'User',
      photoURL: userRecord.photoURL || null,
      role: role,
      createdAt: userDoc.exists() ? userDoc.data().createdAt : admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    const roleEmoji = role === 'admin' ? '👑' : role === 'editor' ? '✏️' : '👤';
    console.log(`\n✅ SUCCESS! ${email} is now a ${roleEmoji} ${role}!`);
    console.log('\n📋 User details:');
    console.log(`   UID: ${userRecord.uid}`);
    console.log(`   Email: ${userRecord.email}`);
    console.log(`   Name: ${userRecord.displayName || 'N/A'}`);
    console.log(`   Role: ${roleEmoji} ${role}`);

    if (role === 'editor') {
      console.log('\n📝 Editor permissions:');
      console.log('   ✅ Can create articles (as drafts)');
      console.log('   ✅ Can edit own articles');
      console.log('   ✅ Can delete own unpublished articles');
      console.log('   ❌ Cannot publish articles directly');
      console.log('   ❌ Cannot edit other users articles');
      console.log('   ❌ Cannot manage users');
    } else if (role === 'admin') {
      console.log('\n👑 Admin permissions:');
      console.log('   ✅ Can create and publish articles immediately');
      console.log('   ✅ Can edit any article');
      console.log('   ✅ Can delete any article');
      console.log('   ✅ Can moderate drafts');
      console.log('   ⚠️  Cannot change user roles (only superadmin)');
    }

    console.log('\n💡 The user needs to refresh the page to see the changes.');

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`\n❌ Error: User with email ${email} not found!`);
      console.error('Make sure the user has logged in at least once.');
    } else {
      console.error('\n❌ Error:', error.message);
    }
    process.exit(1);
  }
}

async function listUsers() {
  try {
    console.log('\n👥 Users by role:\n');

    // Admins
    const adminsSnapshot = await db.collection('users')
      .where('role', '==', 'admin')
      .get();

    console.log('👑 ADMINS:');
    if (adminsSnapshot.empty) {
      console.log('   (none in Firestore)');
    } else {
      adminsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   • ${data.email} (${data.displayName || 'No name'})`);
      });
    }
    console.log('   • milleniumtraffy@gmail.com (hardcoded superadmin)');

    // Editors
    const editorsSnapshot = await db.collection('users')
      .where('role', '==', 'editor')
      .get();

    console.log('\n✏️  EDITORS:');
    if (editorsSnapshot.empty) {
      console.log('   (none)');
    } else {
      editorsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   • ${data.email} (${data.displayName || 'No name'})`);
      });
    }

    // Regular users
    const usersSnapshot = await db.collection('users')
      .where('role', '==', 'user')
      .get();

    console.log('\n👤 USERS:');
    if (usersSnapshot.empty) {
      console.log('   (none)');
    } else {
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`   • ${data.email} (${data.displayName || 'No name'})`);
      });
    }

  } catch (error) {
    console.error('❌ Error listing users:', error.message);
  }
}

// Main
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('\n📝 Usage:');
  console.log('   node scripts/make-admin.js <email> [role]     - Set user role');
  console.log('   node scripts/make-admin.js --list              - List all users');
  console.log('\n🎭 Available roles:');
  console.log('   user    - Regular user (default)');
  console.log('   editor  - Can create articles (drafts only)');
  console.log('   admin   - Can publish articles and moderate');
  console.log('\n📖 Examples:');
  console.log('   node scripts/make-admin.js user@example.com editor');
  console.log('   node scripts/make-admin.js user@example.com admin');
  console.log('   node scripts/make-admin.js --list');
  process.exit(0);
}

if (args[0] === '--list' || args[0] === '-l') {
  listUsers().then(() => process.exit(0));
} else {
  const email = args[0];
  const role = args[1] || 'editor';

  if (!email.includes('@')) {
    console.error('❌ Error: Invalid email format');
    process.exit(1);
  }

  setUserRole(email, role).then(() => process.exit(0));
}
