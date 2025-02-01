import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from "@/components/Header";
import { Separator } from "@/components/Separator";
import { useRouter } from 'expo-router';
import useSignup from '@/hooks/useSignup';

type Errors = {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  serverError?:string;
};

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signup, loading, error, success } = useSignup();
  const [isSignupValid, setIsSignupValid] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSignup = async () => {
    if(isSignupValid) await signup(email, password);
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

    if (!passwordConfirm) errors.passwordConfirm = 'Confirm Password is required.';

    if (password != passwordConfirm) errors.passwordConfirm = 'Passwords must match.';

    setErrors(errors);
    setIsSignupValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [email, password, passwordConfirm]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Workout App!"/>
      <Separator />     

      <View style={{flex:1}}>
        <Text style={styles.title}>New Account</Text>
        <Text style={styles.text}>Sign up and workout.</Text>
      </View>

      <View style={{flex:2}}>
        <Text style={styles.text}>Email:</Text>
        <TextInput style={styles.textInput} inputMode="email" autoCapitalize="none" onChangeText={setEmail} value={email}></TextInput>
        <Text style={styles.text}>Password:</Text>
        <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPassword} value={password}></TextInput>
        <Text style={styles.text}>Confirm Password:</Text>
        <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={setPasswordConfirm} value={passwordConfirm}></TextInput>
      </View>

      <View style={{flex:2}}>
        <TouchableOpacity
            style={[styles.buttonContainer, { opacity: isSignupValid ? 1 : 0.5 }]}
            disabled={!isSignupValid}
            onPress={() => { handleSignup() }}>
            <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        {Object.keys(errors).map((key, index) => (
          <Text key={index} style={{ color: '#EB9928' }}>
              {errors[key as keyof Errors]}
          </Text>
        ))}
      </View>

      <SafeAreaView style={styles.bottom}>
        <Text style={{fontSize:25, color:"#CCF6FF", textAlign:"center" }}>Have an account?</Text>
        <Pressable
          onPress={() => {
            router.push('/');
          }}>
            <Text style={{fontSize:25, color:"#EB9928", textAlign:"center", marginLeft:4 }}>Sign in</Text>
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