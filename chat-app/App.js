import React from "react";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { useEffect } from "react";
import { Alert } from "react-native";

import { LogBox } from "react-native";
// Create the navigator
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

//importing useNetInfo for keeping track of the network's connectivity and updating in real time
import { useNetInfo } from "@react-native-community/netinfo";

const App = () => {
  const connectionStatus = useNetInfo();
  const firebaseConfig = {
    apiKey: "AIzaSyDNWYp0Lf0A32eyfoBsJ-0_d-bH_nPDlig",
    authDomain: "chat-app-6ce28.firebaseapp.com",
    projectId: "chat-app-6ce28",
    storageBucket: "chat-app-6ce28.appspot.com",
    messagingSenderId: "85621989107",
    appId: "1:85621989107:web:f794aaf398b600390c6186",
  };
  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  // throwing an error if no internet
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("No internet connection")
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
