import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { Separator } from "@/components/Separator";

interface TrackingInfo {
  date: string;
  weight?: string;
  completedReps?: number;
  rpe?: number;
  exerciseKey: string;
}

const { width } = Dimensions.get('window');

// Define responsive font sizes and dimensions
const fontSizeScale = width / 375;
const containerPadding = Math.min(width * 0.04, 10);
const inputWidth = Math.max(width * 0.4, 150);

export function TrackingBody({ exerciseKey, exerciseName, sets, repRange, lastReps, lastWeight, lastRpe, trackingInfo, updateTrackingModel } : { exerciseKey:string, exerciseName: string, sets: number, repRange: string, lastReps: string, lastWeight: string, lastRpe: string, trackingInfo:TrackingInfo, updateTrackingModel:(exerciseName: string, updatedInfo: TrackingInfo)=>void }) {
	const handleRepsChange = (value: string) => {
		if (/^\d*$/.test(value)) {
			const newReps = value ? parseInt(value, 10) : undefined;
			updateTrackingModel(exerciseName, { ...trackingInfo, completedReps: newReps });
		}
  };

  const handleWeightChange = (value: string) => {
    updateTrackingModel(exerciseName, { ...trackingInfo, weight: value });
  };

  const handleRpeChange = (value: string) => {
		if (/^\d*$/.test(value)) {
			const newRpe = value ? parseInt(value, 10) : undefined;
			updateTrackingModel(exerciseName, { ...trackingInfo, rpe: newRpe });
		}
  };

	useEffect(() => {
		updateTrackingModel(exerciseName, { 
			date: new Date().toISOString(), 
			weight: lastWeight,
			completedReps: parseInt(lastReps, 10),
			rpe: parseInt(lastRpe, 10),
			exerciseKey:exerciseKey 
		});
	}, []);

  return (
		<View style={styles.workoutScroll}>
 			<View style={styles.container} >
				<Text style={styles.workoutTitle}>{exerciseName}</Text>
				<Separator />
				
				<View style={styles.infoContainter}>
					<Text style={styles.text}>{`For: ${sets} sets`}</Text>
					<Text style={styles.text}>{`Rep Range: ${repRange}`}</Text>
				</View>
			</View>

			<View style={styles.container} >
				<Text style={styles.workoutTitle}>Last Week</Text>
				<Separator />

				<View style={styles.infoContainter}>
					<Text style={styles.text}>{`Total Reps: ${lastReps}`}</Text>
					<Text style={styles.text}>{`Weight: ${lastWeight}`}</Text>
					<Text style={styles.text}>{`RPE: ${lastRpe}`}</Text>
				</View>
			</View>

			<View style={styles.container} >
				<Text style={styles.workoutTitle}>Today</Text>
				<Separator />

				<View style={styles.DataContainter}>
					<View style={{justifyContent: "space-around"}}>
						<Text style={styles.text}>{"Total Reps:"}</Text>
						<Text style={styles.text}>{"Weight:"}</Text>
						<Text style={styles.text}>{"RPE:"}</Text>
					</View>
					<View style={{ marginLeft: 15}}>
						<TextInput style={styles.textInput} inputMode="numeric"  
							onChangeText={handleRepsChange}>
						</TextInput>

						<TextInput style={styles.textInput}
							onChangeText={handleWeightChange}>
						</TextInput>

						<TextInput style={styles.textInput} inputMode="numeric" 
							onChangeText={handleRpeChange}>
						</TextInput>
					</View>					
				</View>
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EB9928",
		borderColor: "#CCF6FF",
		borderWidth: 1,
		borderRadius: 5,
		margin: containerPadding,
	},

  workoutScroll: {
    flex: 1,
  },

	infoContainter: {
		justifyContent: "space-between",
		alignSelf: "flex-start",
		marginBottom: 10,
		padding:5
	},

	DataContainter: {
		flexDirection: "row",
		marginBottom: 10,
		padding:5
	},

	workoutTitle: {
		fontSize: 30 * fontSizeScale,
		fontWeight:"bold",
		color: '#2F4858',
	},

	text: {
		fontSize: 20 * fontSizeScale,
		color: '#2F4858',
	},

	textInput: {
		width: inputWidth,
		borderWidth: 1,
		borderRadius: 5,
    backgroundColor: "#CCF6FF",
		borderColor: "#FFFFFF",
    height: 35,
    textAlign:"center",
    fontSize:25,
    color:"#2F4858",
		marginVertical:5,
	},
});