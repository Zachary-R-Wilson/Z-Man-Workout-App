import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';

interface MaxesResponse {
  squat: number,
  deadlift: number,
  benchpress: number,
}

interface UseGetMaxesResponse {
  getMaxes: () => Promise<void>;
  GetLoading: boolean;
  GetError: string | undefined;
  GetSuccess: boolean;
  maxes: MaxesResponse | undefined;
}

const useGetMaxes = (): UseGetMaxesResponse => {
  const [GetLoading, setLoading] = useState<boolean>(false);
  const [GetError, setError] = useState<string | undefined>(undefined);
  const [GetSuccess, setSuccess] = useState<boolean>(false);
  const [maxes, setMaxes] = useState<MaxesResponse | undefined>(undefined);

  const getMaxes = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Maxes/GetMaxes`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data: MaxesResponse = await response.json();
        setMaxes(data);
        setSuccess(true);
      } 
      else {
        setError('Could not get maxes.');
      }
    } catch (err) {
      setError('Invalid Maxes');
    } finally {
      setLoading(false);
    }
  };

  return { getMaxes, GetLoading, GetError, GetSuccess, maxes };
};

export default useGetMaxes;