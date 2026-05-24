import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup, signOut, onAuthStateChanged
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, serverTimestamp
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

// Demo mode: simulate auth without real Firebase
const DEMO_MODE = true;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'vendor' | 'supplier'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      // Check local storage for persisted demo session
      const savedUser = localStorage.getItem('vb_user');
      const savedRole = localStorage.getItem('vb_role');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setRole(savedRole);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          }
        } catch (e) {
          console.log('Firestore not configured, using demo mode');
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (DEMO_MODE) {
      const demoUser = {
        uid: 'demo-user-' + Date.now(),
        displayName: 'Demo User',
        email: 'demo@vendorbridge.in',
        photoURL: null,
      };
      setUser(demoUser);
      localStorage.setItem('vb_user', JSON.stringify(demoUser));
      return demoUser;
    }
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  };

  const logout = async () => {
    if (DEMO_MODE) {
      setUser(null);
      setRole(null);
      localStorage.removeItem('vb_user');
      localStorage.removeItem('vb_role');
      return;
    }
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  const saveRole = async (selectedRole) => {
    setRole(selectedRole);
    if (DEMO_MODE) {
      localStorage.setItem('vb_role', selectedRole);
      return;
    }
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        role: selectedRole,
        email: user.email,
        displayName: user.displayName,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signInWithGoogle, logout, saveRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
