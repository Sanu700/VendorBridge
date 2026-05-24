import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
  googleProvider,
} from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [role, setRole] = useState(null);

  const [loading, setLoading] = useState(true);

  // GOOGLE LOGIN
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      return result.user;

    } catch (error) {
      console.error(
        "Google Sign In Error:",
        error
      );

      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);

      setRole(null);

    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // SAVE ROLE
  const saveRole = async (selectedRole) => {
    try {
      if (!user) return;

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: selectedRole,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setRole(selectedRole);

    } catch (error) {
      console.error(
        "Save Role Error:",
        error
      );
    }
  };

  // SESSION LISTENER
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {

        try {

          if (firebaseUser) {

            setUser(firebaseUser);

            const userRef = doc(
              db,
              "users",
              firebaseUser.uid
            );

            const userSnap = await getDoc(userRef);

            // EXISTING USER
            if (userSnap.exists()) {

              const userData = userSnap.data();

              setRole(userData.role || null);

            } else {

              // CREATE NEW USER
              await setDoc(userRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName:
                  firebaseUser.displayName,
                role: null,
                createdAt: serverTimestamp(),
              });

              setRole(null);
            }

          } else {

            setUser(null);

            setRole(null);
          }

        } catch (error) {

          console.error(
            "Auth State Error:",
            error
          );

        } finally {

          setLoading(false);
        }
      }
    );

    return () => unsubscribe();

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signInWithGoogle,
        logout,
        saveRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);