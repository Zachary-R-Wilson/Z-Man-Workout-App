import { StyleSheet, ScrollView, View, TextInput, Text } from "react-native";
import { Separator } from "@/components/Separator";
import { Button } from "@/components/Button";

interface Exercise {
  name: string,
  reps: string,
  sets: number,
  order: number
}

export default function NewDay({ isVisible, addExerciseClick, createDayClick, cancelDayClick, editExerciseClick, exercises, dayName, setDayName } : { isVisible:boolean, addExerciseClick: () => void, createDayClick: (dayName: string) => void, cancelDayClick: () => void, editExerciseClick: (idx:number) => void, exercises: Exercise[], dayName:string, setDayName:React.Dispatch<React.SetStateAction<string>> }) { 
  const CreateDayClick = () => {
    if(dayName != "") createDayClick(dayName);
  }

  const CancelDayClick = () => {
      setDayName("");
      cancelDayClick();
  }

  if (!isVisible) {
    return null;
  }

  return (
    <ScrollView>
      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Name Day:</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} onChangeText={setDayName} value={dayName}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Add Exercise"
            pressFunc={ addExerciseClick }
          />
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Edit Exercise:</Text>
        </View>
        <Separator />
        <ScrollView style={styles.editScroll}>
        {(exercises.map((exercise: Exercise, index) => (
            <Button 
              key={`${dayName}-${index}`}
              label={exercise.name}
              pressFunc={() => { editExerciseClick(index) } }
            />
          ))
        )}
        </ScrollView>
      </View>

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Create Day"
            pressFunc={ CreateDayClick }
          />
          <Button 
            label="Cancel"
            pressFunc={ CancelDayClick }
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