import { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, FlatList, ScrollView, Dimensions, ViewToken } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrackingBody } from "@/components/TrackingBody";
import { BottomNav } from "@/components/BottomNav";
import { Separator } from "@/components/Separator";
import { BottomDrawer } from "@/components/BottomDrawer";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import useBottomDrawer from '@/hooks/useBottomDrawer';
import useGetProgress from "@/hooks/useGetProgress";
import useInsertTracking from "@/hooks/useInsertTracking";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * .9;

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

interface TrackingModel {
  exercises: { [key: string]: TrackingInfo };
}

interface TrackingInfo {
  date: string;
  weight?: string;
  completedReps?: number;
  rpe?: number;
  exerciseKey: string;
}

export default function Tracking()  { 
  const router = useRouter();
  const {workoutName, dayKey } = useLocalSearchParams();
  const { isVisible, content, openDrawer, closeDrawer, setDrawerContent } = useBottomDrawer();
  const { getProgress, loadingProgress, errorProgress, successProgress, progress } = useGetProgress();
  const { insertTracking, loading, error, success } = useInsertTracking();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exercises, setExercises] = useState<TrackingProgress[]>([]);
  const [trackingModel, setTrackingModel] = useState<TrackingModel>({ exercises: {} });

  useEffect(() => {
    // @ts-ignore:next-line /dayKey: string | string[] is only passed as string.
    getProgress(dayKey);
  }, []);

  useEffect(() => {
    if (progress && progress.exercises) {
      setExercises(Object.values(progress.exercises));
    }
  }, [progress]);


  const updateTrackingModel = (exerciseName: string, updatedInfo: TrackingInfo) => {
    setTrackingModel(prevModel => ({
      ...prevModel,
      exercises: {
        ...prevModel.exercises,
        [exerciseName]: updatedInfo
      }
    }));
  };

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        setCurrentIndex(index !== null ? index : 0);
      }
    },
    []
  );

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* @ts-ignore:next-line /dayKey: string | string[] is only passed as string. */}
      <Header title = {workoutName} />
      <Separator />

      <ScrollView style={{width: "90%", alignSelf: "center", flex: 2 }}>
        <FlatList
          data={exercises}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TrackingBody
                exerciseKey={item.exerciseKey}
                exerciseName={item.exerciseName}
                sets={item.sets}
                repRange={item.reps}
                lastReps={item.completedReps?.toString() ?? "Untracked"}
                lastWeight={item.weight ?? "Untracked"}
                lastRpe={item.rpe?.toString() ?? "Untracked"}
                trackingInfo={trackingModel.exercises[item.exerciseName]}
                updateTrackingModel={updateTrackingModel}
              />
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 5}}>
          <Button 
            label="Complete Workout"
            pressFunc={() => {
              insertTracking(trackingModel);
              router.push('/workouts');
            }}
          />
        </View>
      </View>
      
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

  subcontainer: {
    width: "90%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EB9928",
		borderColor: "#CCF6FF",
		borderWidth: 1,
		borderRadius: 5,
    alignSelf:"center",
	},

  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  workoutView: {
    width: "100%",
  },
});