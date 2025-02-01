import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';

interface UseSignupResponse {
  signup: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const useSignup = (): UseSignupResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(`${Constants.BASE_URL}/Auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          "Email": email,
          "Password": password,
        }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        await AsyncStorage.setItem('accessToken', accessToken);
        setSuccess(true);
      } else {
        setError('Sign up Failed.');
      }
    } catch (err) {
      setError('Error Signing up');
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, success };
};

export default useSignup;