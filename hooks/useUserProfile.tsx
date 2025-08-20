import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useEffect, useState } from 'react';

export const useUserProfile = (userId?: string | null) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const getUsersData = async (userId: string) => {
      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
          setLastName(docSnap.data().lastName);
          setEmail(docSnap.data().email);
        } else {
          console.log('No such user!');
        }
      } catch (err) {
        console.error('Error getting users name: ', err);
      } finally {
        setLoading(false);
      }
    };
    getUsersData(userId).catch((err) => {
      console.error('Error getting users name: ', err);
      setLoading(false);
    });
  }, [userId]);

  return { firstName, lastName, email, loading };
};
