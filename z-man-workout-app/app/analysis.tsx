import { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, FlatList, ScrollView, Dimensions, ViewToken } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnalysisBody } from "@/components/AnalysisBody";
import { BottomNav } from "@/components/BottomNav";
import { Separator } from "@/components/Separator";
import { BottomDrawer } from "@/components/BottomDrawer";
import { Header } from "@/components/Header";
import useBottomDrawer from '@/hooks/useBottomDrawer';
import useGetAnalysis from "@/hooks/useGetAnalysis";

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

interface AnalysisModel {
  model: TrackingProgress,
  analysis: String,
}

export default function Tracking()  { 
  const router = useRouter();
  const {workoutName, dayKey } = useLocalSearchParams();
  const { isVisible, content, openDrawer, closeDrawer, setDrawerContent } = useBottomDrawer();
  const { getAnalysis, loadingAnalysis, errorAnalysis, successAnalysis, analysis } = useGetAnalysis();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [analysisModel, setAnalysisModel] = useState<AnalysisModel[]>([]);

  useEffect(() => {
    // @ts-ignore:next-line /dayKey: string | string[] is only passed as string.
    getAnalysis(dayKey);
  }, []);

  useEffect(() => {
    if (analysis) {
      setAnalysisModel(analysis);
    }
  }, [analysis]);

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
          data={analysisModel}
          horizontal
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <AnalysisBody
                exerciseName={item.model.exerciseName}
                sets={item.model.sets}
                repRange={item.model.reps}
                lastReps={item.model.completedReps?.toString() ?? "Untracked"}
                lastWeight={item.model.weight ?? "Untracked"}
                lastRpe={item.model.rpe?.toString() ?? "Untracked"}
                Analysis={item.analysis}
              />
            </View>
          )}
        />
      </ScrollView>

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