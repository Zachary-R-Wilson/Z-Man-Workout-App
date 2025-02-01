import { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BottomNav } from "@/components/BottomNav";
import { Separator } from "@/components/Separator";
import { BottomDrawer } from "@/components/BottomDrawer";
import useBottomDrawer from '@/hooks/useBottomDrawer';
import NewWorkout from "@/components/newWorkout";
import NewDay from "@/components/newDay";
import NewExercise from "@/components/newExercise";
import useCreateWorkout from "@/hooks/useCreateWorkout";
import useCreateWorkoutJson from "@/hooks/useCreateWorkoutJson";

enum createStates {
  Workout = 0,
  Day,
  Exercise,
}

interface Exercise {
  name: string,
  reps: string,
  sets: number,
  order: number
}

export default function createWorkout() { 
  const router = useRouter();
  const { isVisible, content, openDrawer, closeDrawer, setDrawerContent } = useBottomDrawer();
  const { createWorkout, loading, error, success } = useCreateWorkout();
  const { createWorkoutJson, addOrUpdateDay, days } = useCreateWorkoutJson();
  const [createState, setCreateState] = useState<createStates>(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>();
  const [selectedExerciseIdx, setSelectedExerciseIdx] = useState<number>();
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [dayName, setDayName ]= useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [repRange, setRepRange] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    if (success) router.push('/workouts');
  }, [success]);
  
  // Add
  const AddDayClick = () => {
    setExerciseList([]);
    setSelectedDayIdx(undefined);
    setDayName("");
    setCreateState(createStates.Day);
  }

  // Edit
  const EditDayClick = (idx: number) => {
    const dayKeys = Object.keys(days);
    
    if (idx >= 0 && idx < dayKeys.length) {
      const dayKey = dayKeys[idx];
      
      setSelectedDayIdx(idx);
      setDayName(dayKey);

      const updatedExercises = days[dayKey].map((exercise, index) => ({
        ...exercise,
        order: index,
      }));
  
      setExerciseList(updatedExercises);
      setCreateState(createStates.Day);
    } else {
      console.error("Invalid day index:", idx);
    }
  };

  const EditExerciseClick = (idx:number) => {
    setSelectedExerciseIdx(idx);
    setExerciseName(exerciseList[idx].name);
    setSets(exerciseList[idx].sets.toString());
    setRepRange(exerciseList[idx].reps);
    setOrder(idx.toString());
    setCreateState(createStates.Exercise);
  }

  const AddExerciseClick = () => {
    setSelectedExerciseIdx(undefined);
    setExerciseName("");
    setSets("");
    setRepRange("");
    setOrder("");
    setCreateState(createStates.Exercise);
  }

  // Create
  const CreateWorkoutClick = (workoutName:string) => {
    createWorkout(createWorkoutJson(workoutName));
  }

  const CreateDayClick = (dayName: string) => {
    addOrUpdateDay(dayName, [...exerciseList]);
    setExerciseList([]);
    setSelectedExerciseIdx(undefined);
    setCreateState(createStates.Workout);
  }

  const CreateExerciseClick = (name:string, reps:string, sets:number) => {  
    const newOrder = exerciseList.length;
    const updatedExercise: Exercise = { name, reps, sets, order: newOrder };

    if (selectedExerciseIdx !== undefined) {
      const updatedExerciseList = [...exerciseList];
      updatedExerciseList[selectedExerciseIdx] = updatedExercise;
      setExerciseList(updatedExerciseList);
    } else {
      setExerciseList([...exerciseList, updatedExercise]);
    }

    setCreateState(createStates.Day);
  }

  // Cancel
  const CancelWorkoutClick = () => {
    router.push('/workouts');
  }

  const CancelDayClick = () => {
    setCreateState(createStates.Workout);
  }

  const CancelExerciseClick = () => {
    setCreateState(createStates.Day);
  }

  return (
    <SafeAreaView style={styles.container}>

      <NewWorkout 
        isVisible={createState == createStates.Workout}
        addDayClick={ AddDayClick }
        createWorkoutClick={ CreateWorkoutClick }
        cancelWorkoutClick={ CancelWorkoutClick }
        editDayClick={ EditDayClick }
        days={ Object.keys(days) }  
      />

      <NewDay 
        isVisible={createState == createStates.Day}
        addExerciseClick={ AddExerciseClick }
        createDayClick={ CreateDayClick }
        cancelDayClick={ CancelDayClick }
        editExerciseClick= { EditExerciseClick }
        exercises={ exerciseList }
        dayName={ dayName }
        setDayName={ setDayName }
      />

      <NewExercise 
        isVisible={createState == createStates.Exercise}
        createExerciseClick={ CreateExerciseClick }
        cancelExerciseClick={ CancelExerciseClick }
        exerciseName={ exerciseName }
        setExerciseName={ setExerciseName }
        sets={ sets }
        setSets={ setSets }
        repRange={ repRange }
        setRepRange={ setRepRange }
      />

      <Separator />
      <BottomNav openDrawer={openDrawer} setDrawerContent={setDrawerContent} />

      <BottomDrawer content={content} isVisible={isVisible} closeDrawer={closeDrawer}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#2F4858",
  },
});