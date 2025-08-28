import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

export const useUserProfile = (userId?: string | null) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const profileIcon = require('@/assets/images/profile_icon.png');
  const [profilePicture, setProfilePicture] =
    useState<ImageSourcePropType>(profileIcon);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDefaultPicture, setIsDefaultPicture] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'users', userId), (docSnap) => {
      if (docSnap.exists()) {
        setFirstName(docSnap.data().firstName);
        setLastName(docSnap.data().lastName);
        setEmail(docSnap.data().email);

        const picture = docSnap.data().profilePicture;
        if (picture) {
          setProfilePicture({ uri: picture });
          setIsDefaultPicture(false);
        } else {
          setProfilePicture(profileIcon);
          setIsDefaultPicture(true);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profileIcon, profilePicture, userId]);

  return {
    firstName,
    lastName,
    email,
    profilePicture,
    isDefaultPicture,
    loading,
  };
};
