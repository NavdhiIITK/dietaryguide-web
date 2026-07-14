import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  linkWithCredential,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { ensureUserDoc } from '@/services/storeService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  phoneVerified: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  sendPhoneOtp: (phoneNumber: string, recaptchaContainerId: string) => Promise<void>;
  verifyPhoneOtp: (otp: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      // Check if phone is already linked
      if (u) {
        const hasPhone = u.providerData.some((p) => p.providerId === 'phone');
        setPhoneVerified(hasPhone);
        // Ensure Firestore user document exists
        ensureUserDoc(u.uid, { name: u.displayName, email: u.email, photoURL: u.photoURL });
      } else {
        setPhoneVerified(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.code === 'auth/invalid-credential' ? 'Invalid email or password.' : error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await fbUpdateProfile(cred.user, { displayName });
    } catch (error: any) {
      console.error('Error signing up:', error);
      const msg =
        error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : error.code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : error.message;
      toast({ variant: 'destructive', title: 'Sign Up Error', description: msg });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') return;
      console.error('Google sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign In Error',
        description: error.message,
      });
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setPhoneVerified(false);
      setConfirmationResult(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({ variant: 'destructive', title: 'Sign Out Error', description: error.message });
      throw error;
    }
  };

  /** Send OTP to phone number. Creates invisible reCAPTCHA on the given container. */
  const sendPhoneOtp = async (phoneNumber: string, recaptchaContainerId: string) => {
    try {
      // Normalize to E.164 (Firebase rejects spaces/dashes and requires a country code).
      // Users naturally type spaces since the input's placeholder shows "+91 XXXXX XXXXX".
      const cleaned = phoneNumber.trim().replace(/[^\d+]/g, '');
      const e164 = cleaned.startsWith('+')
        ? cleaned
        : cleaned.length === 10
        ? `+91${cleaned}`
        : `+${cleaned}`;

      // Clean up previous verifier
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
      const verifier = new RecaptchaVerifier(auth, recaptchaContainerId, { size: 'invisible' });
      setRecaptchaVerifier(verifier);

      const result = await signInWithPhoneNumber(auth, e164, verifier);
      setConfirmationResult(result);
      toast({ title: 'OTP Sent', description: `A verification code was sent to ${e164}` });
    } catch (error: any) {
      console.error('Phone OTP error:', error);
      const msg =
        error.code === 'auth/invalid-phone-number'
          ? 'Invalid phone number. Use format: +91XXXXXXXXXX'
          : error.code === 'auth/too-many-requests'
          ? 'Too many requests. Please try again later.'
          : error.message;
      toast({ variant: 'destructive', title: 'OTP Error', description: msg });
      throw error;
    }
  };

  /** Verify the OTP code and link phone to current user */
  const verifyPhoneOtp = async (otp: string) => {
    if (!confirmationResult) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please request OTP first.' });
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, otp);
      if (user) {
        // Link phone to existing account
        await linkWithCredential(user, credential);
      }
      setPhoneVerified(true);
      setConfirmationResult(null);
      toast({ title: 'Verified', description: 'Phone number verified successfully!' });
    } catch (error: any) {
      console.error('OTP verify error:', error);
      const msg =
        error.code === 'auth/invalid-verification-code'
          ? 'Invalid OTP code. Please try again.'
          : error.code === 'auth/credential-already-in-use'
          ? 'This phone number is already linked to another account.'
          : error.message;
      toast({ variant: 'destructive', title: 'Verification Failed', description: msg });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    phoneVerified,
    signIn,
    signUp,
    signInWithGoogle,
    signOutUser,
    sendPhoneOtp,
    verifyPhoneOtp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
