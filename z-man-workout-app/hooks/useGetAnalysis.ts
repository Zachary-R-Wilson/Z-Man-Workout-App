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

interface AnalysisModel {
  model: TrackingProgress,
  analysis: String,
}

interface UseGetAnalysis {
  getAnalysis: (dayKey:string) => Promise<void>;
  loadingAnalysis: boolean;
  errorAnalysis: string | undefined;
  successAnalysis: boolean;
  analysis:AnalysisModel[] | undefined;
}

const useGetAnalysis = (): UseGetAnalysis => {
  const [loadingAnalysis, setLoadingAnalysis] = useState<boolean>(false);
  const [errorAnalysis, setErrorAnalysis] = useState<string | undefined>(undefined);
  const [successAnalysis, setSuccessAnalysis] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<AnalysisModel[] | undefined>(undefined);

  const getAnalysis = async (dayKey:string) => {
    setLoadingAnalysis(true);
    setErrorAnalysis(undefined);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');

      const response = await fetch(`${Constants.BASE_URL}/Tracking/GetAnalysis/${dayKey}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data: AnalysisModel[] = await response.json();
        setAnalysis(data);
        setSuccessAnalysis(true);
      } 
      else {
        setErrorAnalysis('Could not get Analysis for the day.');
      }
    } catch (err) {
      setErrorAnalysis('Invalid Day');
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return { getAnalysis, loadingAnalysis, errorAnalysis, successAnalysis, analysis };
};

export default useGetAnalysis;