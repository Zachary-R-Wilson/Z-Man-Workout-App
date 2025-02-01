import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from "../constants/constants";

interface Exercise {
  name: string,
  reps: string,
  sets: number
}

interface CreateWorkout {
  name: string,
  days: {
    [key: string]: Exercise[];
  } 
}

interface UseCreateWorkout {
  createWorkout: (workout:CreateWorkout) => Promise<void>;
  loading: boolean;
  error: string | undefined;
  success: boolean;
}

const useCreateWorkout = (): UseCreateWorkout => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const createWorkout = async (workout:CreateWorkout) => {
    setLoading(true);
    setError(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      
      const response = await fetch(`${Constants.BASE_URL}/Workout/CreateWorkout`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(workout),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Create Workout Failed.');
      }
    } catch (err) {
      setError('Error Creating Workout.');
    } finally {
      setLoading(false);
    }
  };

  return { createWorkout, loading, error, success };
};

export default useCreateWorkout;