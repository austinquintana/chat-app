import React from "react";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./components/Start";
import Chat from "./components/Chat";

import { LogBox } from "react-native";
// Create the navigator
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const App = () => {
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
  // initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
