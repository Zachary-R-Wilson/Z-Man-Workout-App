import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="workouts" />
      <Stack.Screen name="createWorkout" />
      <Stack.Screen name="maxes" />
      <Stack.Screen name="tracking" />
      <Stack.Screen name="analysis" />
    </Stack>
  );
}
