import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';

interface Days {
  [key: string]: string;
}

interface WorkoutDetails {
  workoutKey: string;
  days: Days;
}

interface UseGetWorkoutResponse {
  getWorkout: (workoutKey:string) => Promise<void>;
  loading: boolean;
  error: string | undefined;
  success: boolean;
  workout: WorkoutDetails | undefined;
}

const useGetWorkout = (): UseGetWorkoutResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const [workout, setWorkouts] = useState<WorkoutDetails | undefined>(undefined);

  const getWorkout = async (workoutKey:string) => {
    setLoading(true);
    setError(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Workout/GetWorkout/${workoutKey}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data: WorkoutDetails = await response.json();
        setWorkouts(data);
        setSuccess(true);
      } 
      else {
        setError('Could not get workout.');
      }
    } catch (err) {
      setError('Invalid Workout');
    } finally {
      setLoading(false);
    }
  };

  return { getWorkout, loading, error, success, workout };
};

export default useGetWorkout;