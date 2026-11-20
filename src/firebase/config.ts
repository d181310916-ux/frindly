import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// CRITICAL: Specifying firestoreDatabaseId ensures the correct database instance is connected.
// Using experimentalForceLongPolling avoids WebChannel 10s timeouts in proxied/iframe networks.
let dbInstance: Firestore;
try {
  dbInstance = initializeFirestore(
    app,
    {
      experimentalForceLongPolling: true,
      ignoreUndefinedProperties: true,
    },
    firebaseConfig.firestoreDatabaseId
  );
} catch {
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = dbInstance;
export const auth = getAuth(app);

// Test connection on boot per Firebase skill guidelines
export async function testFirebaseConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    const code = (error as { code?: string })?.code;
    const message = error instanceof Error ? error.message : String(error);
    if (
      code === 'unavailable' ||
      message.includes('the client is offline') ||
      message.includes('Could not reach Cloud Firestore')
    ) {
      console.warn('Firebase client is offline or network restricted:', message);
      return false;
    }
    // Any other response means backend responded
    return true;
  }
}
