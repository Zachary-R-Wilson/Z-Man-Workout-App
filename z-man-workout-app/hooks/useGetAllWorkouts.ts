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

interface Workouts {
  [key: string]: WorkoutDetails;
}

interface WorkoutResponse {
  workouts: Workouts;
}

interface UseGetAllWorkoutsResponse {
  getAllWorkouts: () => Promise<void>;
  loading: boolean;
  error: string | undefined;
  success: boolean;
  workouts: Workouts | undefined;
}

const useGetAllWorkouts = (): UseGetAllWorkoutsResponse => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);
  const [workouts, setWorkouts] = useState<Workouts | undefined>(undefined);

  const getAllWorkouts = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Workout/GetAllWorkouts`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data: WorkoutResponse = await response.json();
        setWorkouts(data.workouts);
        setSuccess(true);
      } 
      else {
        setError('Could not get workouts.');
      }
    } catch (err) {
      setError('Invalid Workout');
    } finally {
      setLoading(false);
    }
  };

  return { getAllWorkouts, loading, error, success, workouts };
};

export default useGetAllWorkouts;