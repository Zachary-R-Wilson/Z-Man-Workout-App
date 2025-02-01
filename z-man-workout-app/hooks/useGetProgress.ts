import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../constants/constants';

interface TrackingProgress {
  dayKey: string;
  dayName: string;
  exerciseKey: string;
  exerciseName: string;
  reps: string;
  sets: number;
  weight?: string;
  completedReps?: number;
  rpe?: number;
  date: Date;
}

interface TrackingProgressModel {
  exercises: { [exerciseName: string]: TrackingProgress };
}

interface UseGetProgress {
  getProgress: (dayKey:string) => Promise<void>;
  loadingProgress: boolean;
  errorProgress: string | undefined;
  successProgress: boolean;
  progress: TrackingProgressModel | undefined;
}

const useGetProgress = (): UseGetProgress => {
  const [loadingProgress, setLoadingProgress] = useState<boolean>(false);
  const [errorProgress, setErrorProgress] = useState<string | undefined>(undefined);
  const [successProgress, setSuccessProgress] = useState<boolean>(false);
  const [progress, setProgress] = useState<TrackingProgressModel | undefined>(undefined);

  const getProgress = async (dayKey:string) => {
    setLoadingProgress(true);
    setErrorProgress(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Tracking/GetProgress/${dayKey}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data: TrackingProgressModel = await response.json();
        setProgress(data);
        setSuccessProgress(true);
      } 
      else {
        setErrorProgress('Could not get progress for the day.');
      }
    } catch (err) {
      setErrorProgress('Invalid Day');
    } finally {
      setLoadingProgress(false);
    }
  };

  return { getProgress, loadingProgress, errorProgress, successProgress, progress };
};

export default useGetProgress;