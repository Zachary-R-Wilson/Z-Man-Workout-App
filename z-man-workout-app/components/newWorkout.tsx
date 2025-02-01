import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text } from "react-native";
import { Separator } from "@/components/Separator";
import { Button } from "@/components/Button";

export default function NewWorkout({ isVisible, addDayClick, createWorkoutClick, cancelWorkoutClick, editDayClick, days } : { isVisible:boolean, addDayClick: () => void, createWorkoutClick: (workoutName:string) => void, cancelWorkoutClick: () => void, editDayClick: (selectedIdx:number) => void, days:string[] }) { 
  const [workoutName, setWorkoutName ]= useState('');

  if (!isVisible) {
    return null;
  }

  const CreateWorkout = () => {
    if(workoutName != "") createWorkoutClick(workoutName);
  }

  return (
    <ScrollView>
      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Name Workout:</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} onChangeText={setWorkoutName} value={workoutName}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Add Day"
            pressFunc={ addDayClick }
          />
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Edit Day:</Text>
        </View>
        <Separator />
        <ScrollView style={styles.editScroll}>
          {days.map((dayName, index) => (
            <Button 
              key={index}
              label={dayName}
              pressFunc={() => { editDayClick(index); } }
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Create Workout"
            pressFunc={ CreateWorkout }
          />
          <Button 
            label="Cancel"
            pressFunc={ cancelWorkoutClick }
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

  workoutView: {
    width: "100%",
  },
});