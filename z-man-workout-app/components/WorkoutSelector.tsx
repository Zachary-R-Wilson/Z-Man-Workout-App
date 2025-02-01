import { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Button } from "@/components/Button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Separator } from "@/components/Separator";
import { useRouter } from 'expo-router';
import useDeleteWorkout from "@/hooks/useDeleteWorkout";

interface Days {
  [key: string]: string;
}

export function WorkoutSelector({ workoutName, workoutKey, dayName, days, openDrawer, setDrawerContent } : { workoutName: string, workoutKey:string, dayName: string, days:Days,
openDrawer: () => void, setDrawerContent: (element: JSX.Element) => void }) {
	const router = useRouter();
	const {deleteWorkout, loadingDelete, errorDelete, successDelete} = useDeleteWorkout();

	useEffect(() => {
    if(successDelete) {
			router.push('/workouts');
		}
  }, [successDelete]);

	const selectDayContent: JSX.Element = 
	(<ScrollView style={{width: "90%"}}>
		{days && Object.entries(days).map(([dayName, dayKey]) => (
			<Button
				key={dayKey}
				label={dayName}
				pressFunc={() => {
					router.push({ pathname:'/tracking', params: { workoutName:workoutName, dayKey:dayKey }});
				}}
			/>
		))}
	</ScrollView>);

const analyzeDayContent: JSX.Element = 
(<ScrollView style={{width: "90%"}}>
	{days && Object.entries(days).map(([dayName, dayKey]) => (
		<Button
			key={dayKey}
			label={dayName}
			pressFunc={() => {
				router.push({ pathname:'/analysis', params: { workoutName:workoutName, dayKey:dayKey }});
			}}
		/>
	))}
</ScrollView>);

	const editWorkoutContent: JSX.Element = 
	(<View style={{width: "90%"}}>
		{/* The Share feature button */}
		{/* <Pressable style={styles.drawerView}
			onPress={() => {
				// router.push('/');
			}}>
			<MaterialIcons name="share" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Share</Text>
		</Pressable> */}
		<Pressable style={styles.drawerView}
			onPress={() => {
				setDrawerContent(analyzeDayContent);
			}}>
			<MaterialIcons name="analytics" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Analyze Workout</Text>
		</Pressable>
		<Pressable style={styles.drawerView}
			onPress={() => {
				// router.push('/');
			}}>
			<MaterialIcons name="edit" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Edit</Text>
		</Pressable>
		<Pressable style={styles.drawerView}
			onPress={() => {
				deleteWorkout(workoutKey);
			}}>
			<MaterialIcons name="delete" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Delete</Text>
		</Pressable>
	</View>);
	
	const handleSelectDayOpenDrawer = () => {
		setDrawerContent(selectDayContent);
		openDrawer();
	};

	const handleEditWorkoutOpenDrawer = () => {
		setDrawerContent(editWorkoutContent);
		openDrawer();
	};

  return (
		<View style={styles.container}>
			<View style={styles.workoutContainter}>
				<Text style={styles.workoutTitle}>{workoutName}</Text>
				<Pressable style={styles.icon}
					onPress={handleEditWorkoutOpenDrawer}
				>
					<MaterialIcons name="more-horiz" size={37} color="#CCF6FF" />
				</Pressable>
			</View>

      		<Separator />

			<View style={styles.dayContainter}>
				<Text style={styles.text}>{dayName}</Text>

				<Button
					label="Step Into It"
					pressFunc={() => {
						router.push({ pathname:'/tracking', params: { workoutName:workoutName, dayKey:days[dayName] }});
					}}
				/>

				<Button
					label="Select Day"
					pressFunc={handleSelectDayOpenDrawer}
				/>

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
		margin:10
	},

	workoutContainter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent:"center",
		position: 'relative',
		width:"100%"
	},

	dayContainter: {
		justifyContent: "space-between",
		width: "90%",
		marginBottom: 10,
	},

	workoutTitle: {
		fontSize: 30,
		fontWeight:"bold",
		color: '#2F4858',
	},

	icon: {
		position: 'absolute',
		right: 0,
		margin:10,
	},

	text: {
		fontSize: 30,
		color: '#2F4858',
		alignSelf: "center",
	},

	drawerView: {
		flexDirection:"row",
		alignItems:"center",
    width: "100%",
		height:60,
		marginBottom:10
	},

	drawerText:{
		color:"#CCF6FF",
		fontSize:30
	}
});