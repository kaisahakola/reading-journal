export const getAuthErrorMessages = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/wrong-password':
      return 'Wrong password';
    case 'auth/weak-password':
      return 'Password is too weak. Try a stronger one';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'Something went wrong.';
  }
};
