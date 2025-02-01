import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Separator } from "@/components/Separator";

const { width } = Dimensions.get('window');

// Define responsive font sizes and dimensions
const fontSizeScale = width / 375;
const containerPadding = Math.min(width * 0.04, 10);
const containerWidth = Math.max(width * 0.7, 150);

export function AnalysisBody({ exerciseName, sets, repRange, lastReps, lastWeight, lastRpe, Analysis } : { exerciseName: string, sets: number, repRange: string, lastReps: string, lastWeight: string, lastRpe: string, Analysis: String }) {
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
				<Text style={styles.workoutTitle}>Analysis</Text>
				<Separator />

				<View style={styles.infoContainter}>
					<Text style={styles.text}>{ Analysis }</Text>
				</View>
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		width: containerWidth,
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
		width: containerWidth,
		justifyContent: "space-between",
		alignSelf: "flex-start",
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
});