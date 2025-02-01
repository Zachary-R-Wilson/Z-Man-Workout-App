import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from "@/components/Header";
import { Separator } from "@/components/Separator";
import { BottomNav } from "@/components/BottomNav";
import { BottomDrawer } from "@/components/BottomDrawer";
import { Button } from "@/components/Button";
import useBottomDrawer from '@/hooks/useBottomDrawer';
import useGetMaxes from '@/hooks/useGetMaxes';
import usePostMaxes from '@/hooks/usePostMaxes';

export default function Maxes() { 
  const { isVisible, content, openDrawer, closeDrawer, setDrawerContent } = useBottomDrawer();
  const { getMaxes, GetLoading, GetError, GetSuccess, maxes } = useGetMaxes();
  const { postMaxes, postLoading, postError, postSuccess } = usePostMaxes();
  const [bench, setBench] = useState('');
  const [deadlift, setDeadlift] = useState('');
  const [squat, setSquat] = useState('');
  const [title, setTile] = useState('');
 
  useEffect(() => {
    setTile("Set Your PRs");
    getMaxes();
  }, []);

  useEffect(() => {
    getMaxes();
  }, [postSuccess]);

  useEffect(() => {
    if (maxes?.benchpress) setBench(maxes?.benchpress.toString());
    if (maxes?.deadlift) setDeadlift(maxes?.deadlift.toString());
    if (maxes?.squat) setSquat(maxes?.squat.toString());
  }, [maxes]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title = {title} />
      <Separator />     

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Bench Press</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} placeholder={bench} inputMode="numeric"
            onChangeText={(value) => {
              if (/^\d*$/.test(value)) setBench(value);
            }}
             value={bench}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Deadlift</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} placeholder={deadlift} inputMode="numeric"
            onChangeText={(value) => {
              if (/^\d*$/.test(value)) setDeadlift(value);
            }}
             value={deadlift}></TextInput>
        </View>
      </View>

      <View style={styles.subcontainer}>
        <View style={styles.maxContainter}>
          <Text style={styles.subtitle}>Squat</Text>
        </View>
        <Separator />
        <View style={styles.inputContainter}>
          <TextInput style={styles.textInput} placeholder={squat} inputMode="numeric" 
            onChangeText={(value) => {
              if (/^\d*$/.test(value)) setSquat(value);
            }}
            value={squat}>
          </TextInput>
        </View>
      </View>

      <View style={{flex: 1}} />

      <View style={styles.subcontainer}>
        <View style={{ width: "90%", marginVertical: 10}}>
          <Button 
            label="Save PRs"
            pressFunc={() => {
              postMaxes({
                squat: Number(squat) || 0,
                deadlift: Number(deadlift) || 0,
                benchpress: Number(bench) || 0,
              });
              
              if(postSuccess) {
                setTile("Saved");
                setTimeout(() => {setTile("Set Your PRs");}, 1000);
              }
            }}
          />
        </View>
      </View>

      <Separator />
      <BottomNav openDrawer={openDrawer} setDrawerContent={setDrawerContent} />

      <BottomDrawer content={content} isVisible={isVisible} closeDrawer={closeDrawer}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#2F4858",
  },

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
});