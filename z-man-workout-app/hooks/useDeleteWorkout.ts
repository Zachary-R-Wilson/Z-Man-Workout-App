import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';


interface UseDeleteWorkoutResponse {
  deleteWorkout: (workoutKey:string) => Promise<void>;
  loadingDelete: boolean;
  errorDelete: string | undefined;
  successDelete: boolean;
}

const useDeleteWorkout = (): UseDeleteWorkoutResponse => {
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [errorDelete, setErrorDelete] = useState<string | undefined>(undefined);
  const [successDelete, setSuccessDelete] = useState<boolean>(false);

  const deleteWorkout = async (workoutKey:string) => {
    setLoadingDelete(true);
    setErrorDelete(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Workout/DeleteWorkout/${workoutKey}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setSuccessDelete(true);
      } 
      else {
        setErrorDelete('Could not delete workout.');
      }
    } catch (err) {
      setErrorDelete('Invalid Workout');
    } finally {
      setLoadingDelete(false);
    }
  };

  return { deleteWorkout, loadingDelete, errorDelete, successDelete };
};

export default useDeleteWorkout;