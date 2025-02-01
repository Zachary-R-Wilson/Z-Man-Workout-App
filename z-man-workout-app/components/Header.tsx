import { StyleSheet, Text, View } from "react-native";

export function Header({title} : {title:string}) {
  return (
    <View style={{alignItems: "center"}}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
		fontWeight: 'bold',
		color: '#EB9928',
		
		shadowOffset: {width:1, height:1},
    shadowColor: '#CCF6FF',
    shadowOpacity: .5, 
    shadowRadius: 1,
  }
});