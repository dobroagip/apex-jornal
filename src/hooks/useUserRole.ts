import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type UserRole = 'user' | 'editor' | 'admin' | null;

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Проверка SUPERADMIN (hardcoded email)
          if (user.email === 'milleniumtraffy@gmail.com' && user.emailVerified) {
            setRole('admin');
            setLoading(false);
            return;
          }

          // Проверка роли в Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role || 'user');
          } else {
            setRole('user');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setRole('user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    role,
    loading,
    isAdmin: role === 'admin',
    isEditor: role === 'editor' || role === 'admin',
    isSuperAdmin: auth.currentUser?.email === 'milleniumtraffy@gmail.com' && auth.currentUser?.emailVerified
  };
}
