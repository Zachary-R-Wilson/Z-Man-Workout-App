import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text } from "react-native";
import { Separator } from './Separator';
import { Button } from "@/components/Button";

interface Exercise {
  name: string,
  reps: string,
  sets: number,
  order: number
}

export default function NewExercise({ isVisible, createExerciseClick, cancelExerciseClick, exerciseName, setExerciseName, sets, setSets, repRange, setRepRange } : { isVisible:boolean, createExerciseClick: (name:string, reps:string, sets:number) => void, cancelExerciseClick: () => void, exerciseName:string, setExerciseName:React.Dispatch<React.SetStateAction<string>>, sets:string, setSets:React.Dispatch<React.SetStateAction<string>>, repRange:string, setRepRange:React.Dispatch<React.SetStateAction<string>>}) { 


  if (!isVisible) {
    return null;
  }

  const CreateExerciseClick = () => {
    setExerciseName("");
    setSets("");
    setRepRange("");
    createExerciseClick(exerciseName, repRange, Number(sets));
  }

  const CancelExerciseClick = () => {
    setExerciseName("");
    setSets("");
    setRepRange("");
    cancelExerciseClick();
  }

  return (
    <ScrollView>
      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Exercise Name:</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} onChangeText={setExerciseName} value={exerciseName}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>How Many Sets:</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} inputMode='numeric' onChangeText={(value) => {
              if (/^\d*$/.test(value)) setSets(value);
            }} value={sets}></TextInput>
        </View>
      </View>
      
      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Rep Range:</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} onChangeText={setRepRange} value={repRange}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Create Exercise"
            pressFunc={ CreateExerciseClick }
          />
          <Button 
            label="Cancel"
            pressFunc={ CancelExerciseClick }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EB9928",
		borderColor: "#CCF6FF",
		borderWidth: 1,
		borderRadius: 5,
		margin:10,
	},

  maxContainter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent:"center",
		position: 'relative',
		width:"100%"
	},

  inputContainter: {
		width: "90%",
		marginBottom: 10
	},

  subtitle: {
		fontSize: 30,
		fontWeight:"bold",
		color: '#2F4858',
	},

  textInput: {
		borderWidth: 1,
		borderRadius: 5,
    backgroundColor: "#CCF6FF",
		borderColor: "#FFFFFF",
    height: 40,
    textAlign:"center",
    fontSize:25,
    color:"#2F4858",
	},

  editScroll: {
    flex: 1,
    width: "90%",
    marginBottom: 10
  },
});