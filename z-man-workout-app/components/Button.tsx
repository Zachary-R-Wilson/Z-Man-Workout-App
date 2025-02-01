import { StyleSheet, Text, Pressable} from "react-native";

export function Button({ label, pressFunc }: { label: string, pressFunc: () => void }) {
	return (
		<Pressable style={styles.buttonContainer}
			onPress={pressFunc}>
			<Text style={styles.buttonText}>{label}</Text>
		</Pressable>
  );
}

const styles = StyleSheet.create({
	buttonContainer:{
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#CCF6FF",
		borderColor: "#FFFFFF",
		borderWidth: 1,
		borderRadius: 5,
		height: 40,
		marginVertical:5
	},

	buttonText: {
		fontSize: 25,
		color: '#2F4858',
	},
});