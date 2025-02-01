import { StyleSheet, View, Text, Pressable} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function BottomNav({ openDrawer, setDrawerContent } : { openDrawer: () => void, setDrawerContent: (element: JSX.Element) => void }) {
  const router = useRouter();

  const userSettingsContent: JSX.Element = 
	(<View style={{width: "90%"}}>
		<Pressable style={styles.drawerView}
			onPress={ async () => {
        await AsyncStorage.removeItem('accessToken');
				router.push('/');
			}}>
			<MaterialIcons name="logout" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Logout</Text>
		</Pressable>
		<Pressable style={styles.drawerView}
			onPress={() => {
				router.push('/maxes');
			}}>
			<MaterialIcons name="track-changes" size={58} color="#CCF6FF" />
			<Text style={styles.drawerText}>Personal Records</Text>
		</Pressable>
	</View>);

  const handleUserSettingsOpenDrawer = () => {
    setDrawerContent(userSettingsContent);
    openDrawer();
  };

  return (
    <View style={styles.container}>
        <Pressable
          onPress={() => {
            router.push('/workouts');
          }}>
            <MaterialIcons name="fitness-center" size={58} color="#CCF6FF" />
        </Pressable>

        <Pressable
          onPress={() => {
            router.push('/createWorkout');
          }}>
            <MaterialIcons name="add-circle-outline" size={58} color="#CCF6FF" />
        </Pressable>

        <Pressable
          onPress={handleUserSettingsOpenDrawer}>
          <MaterialIcons name="manage-accounts" size={58} color="#CCF6FF" />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
	container:{
    width: "100%",
		justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
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