import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import useLogin from '@/hooks/useLogin';
import { Header } from "@/components/Header";
import { Separator } from "@/components/Separator";
import { useRouter } from 'expo-router';

type Errors = {
  email?: string;
  password?: string;
  serverError?:string;
};

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, success } = useLogin();
  const [isLoginValid, setisLoginValid] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleLogin = async () => {
    if(isLoginValid) await login(email, password); 
  };

  useEffect(() => {
    if (success) {
      router.push('/workouts');
    }
    else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        serverError: error,
      }));
    }
  }, [success, error]);

  const validateForm = () => {
    let errors: Errors = {};

    if (!email) errors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid.';

    if (!password) errors.password = 'Password is required.';

    setErrors(errors);
    setisLoginValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Workout App!"/>
      <Separator />     

      <View style={{flex:1}}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.text}>Sign in and workout.</Text>
      </View>

      <View style={{flex:1}}>
        <Text style={styles.text}>Email:</Text>
        <TextInput style={styles.textInput} inputMode="email" autoCapitalize="none" onChangeText={setEmail} value={email}></TextInput>
        <Text style={styles.text}>Password:</Text>
        <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} value={password}></TextInput>
      </View>

      <View style={{flex:2}}>
        <TouchableOpacity
            style={[styles.buttonContainer, { opacity: isLoginValid ? 1 : 0.5 }]}
            disabled={!isLoginValid}
            onPress={() => { handleLogin() }}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {Object.keys(errors).map((key, index) => (
          <Text key={index} style={{ color: '#EB9928' }}>
              {errors[key as keyof Errors]}
          </Text>
        ))}
      </View>
      
      <SafeAreaView style={styles.bottom}>
        <Text style={{fontSize:25, color:"#CCF6FF", textAlign:"center" }}>Need an account?</Text>
        <Pressable
          onPress={() => {
            router.push('/signup');
          }}>
            <Text style={{fontSize:25, color:"#EB9928", textAlign:"center", marginLeft:4 }}>Sign up</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#2F4858",
  },

  text: {
    fontSize:25,
    color:'#CCF6FF',
  },

  title: {
    fontSize:50,
    fontWeight:"bold",
    color:'#CCF6FF',
  },

  bottom:{
    flexDirection:"row",
    justifyContent: "center",
    width: "100%",
    position:"absolute",
    bottom:0
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
    marginVertical:5,
	},

  buttonContainer: {
    borderWidth: 1,
		borderRadius: 5,
    backgroundColor: "#EB9928",
		borderColor: "#FFFFFF",
    height: 40,
    marginVertical:20,
  },

  buttonText: {
		fontSize: 30,
		color: "#2F4858",
    textAlign: 'center',
    fontWeight:"bold"
	},
});