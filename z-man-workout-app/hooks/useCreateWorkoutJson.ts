import { useState } from 'react';

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

interface UseCreateWorkoutJson {
  createWorkoutJson: (workoutName:string) => CreateWorkout;
  addOrUpdateDay: (dayName: string, newExercises: Exercise[]) => void;
  days: { [key: string]: Exercise[]; };
}

const useCreateWorkoutJson = (): UseCreateWorkoutJson => {
  const [days, setDays] = useState<{ [key: string]: Exercise[]; }>({});
  const [exercises, setExercises] = useState<{ [key: string]: Exercise; }>({});

  const createWorkoutJson = (workoutName:string) => {
    var newWorkout: CreateWorkout = {
      name: workoutName,
      days: days
    }
    return newWorkout;
  };

  const addOrUpdateDay = (dayName: string, newExercises: Exercise[]) => {
    setDays(prevDays => ({
      ...prevDays,
      [dayName]: newExercises
    }));
  };

  return { createWorkoutJson, addOrUpdateDay, days };
};

export default useCreateWorkoutJson;