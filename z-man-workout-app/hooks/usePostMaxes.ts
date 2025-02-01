import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';

interface MaxesResponse {
  squat: number,
  deadlift: number,
  benchpress: number,
}

interface UsePostMaxesResponse {
  postMaxes: (maxes:MaxesResponse) => Promise<void>;
  postLoading: boolean;
  postError: string | undefined;
  postSuccess: boolean;
}

const usePostMaxes = (): UsePostMaxesResponse => {
  const [postLoading, setLoading] = useState<boolean>(false);
  const [postError, setError] = useState<string | undefined>(undefined);
  const [postSuccess, setSuccess] = useState<boolean>(false);

  const postMaxes = async (maxes:MaxesResponse) => {
    setLoading(true);
    setError(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      const response = await fetch(`${Constants.BASE_URL}/Maxes/UpdateMaxes`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          squat: maxes.squat,
          deadlift: maxes.deadlift,
          benchpress: maxes.benchpress,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Update Maxes Failed.');
      }
    } catch (err) {
      setError('Error Updating Maxes.');
    } finally {
      setLoading(false);
    }
  };

  return { postMaxes, postLoading, postError, postSuccess };
};

export default usePostMaxes;