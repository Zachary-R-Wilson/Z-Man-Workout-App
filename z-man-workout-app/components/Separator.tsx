import { StyleSheet, View} from "react-native";

export function Separator() {
  return (
    <View style={styles.separator} />
  );
}

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: '#CCF6FF',
		borderBottomWidth: 1,
		width: "100%",
		marginVertical: 10,
	}
});