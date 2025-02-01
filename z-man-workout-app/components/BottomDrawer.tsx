import React, { useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, Animated, PanResponder } from "react-native";
import { Separator } from "./Separator";

export function BottomDrawer({ isVisible, content, closeDrawer  } : { isVisible:boolean,  content: JSX.Element | null, closeDrawer: () => void }) {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  // PanResponder to handle swipe down gesture
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 0;
      },
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.timing(translateY, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            closeDrawer();
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      // Open drawer
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Close drawer
      Animated.timing(translateY, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}
    {...panResponder.panHandlers}>
      <SafeAreaView style={styles.container}>
        <View style={{width:45}}>
          <Separator />
        </View>

          {content}

      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf:"center",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EB9928",
		borderColor: "#CCF6FF",
		borderWidth: 1,
		borderRadius: 5,
    paddingVertical:10,
    
    width:"100%",
    position:"absolute",
    bottom:0,
    zIndex:2
	}
});