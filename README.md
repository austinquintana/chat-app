# Cool Chat

A chat app built with React Native and GiftedChat, connected to a Firebase backend

## Features

Cool Chat allows you to send and recieve text messages, images, and location data in the form of a map. Cool Chat also offers customizable UI color options.

## Set up instructions

- Clone the repository

- Install Expo in your repository

    *If you are using a more recent version of Node, downgrade to and use Node version 16.19.0 or lower (Expo only supports up to 16.19.0)*
    
    - In the cloned repository, check the version with:  
        `node -v`  
    - If higher than 16.19.0, downgrade with:  
        `nvm install 16.19.0`  
        `nvm use 16.19.0`   
        *for mac only*  
        `nvm alias default 16.19.0`  
    - Then install Expo with:  
        `npm install -g expo-cli`  
        If prompted, follow with:  
        `npm audit fix`  

- Set up your Expo account

    [Create Expo account](https://expo.dev/signup), then login in your repository with:      
    `expo login`

- Download the Expo Go app

    Cool chat works on both iOS and Android devices, both physical and emulators.

- Set up Firebase

    - Create a Firestore database
    - In the "Rules" tab, change "allow read, write: if false;" to "allow read, write: if true;"
    - Paste your Firebase configuration code into the designated spot in the App.js file

- Run the code from your terminal
    `npm start`

- Open the app

    - On your device, connect to the same network as the device that is running the code.
    - Open the Expo Go app and select the cool-chat app
    
## Libraries used

### Dependencies

@react-native-async-storage/async-storage ^1.19.3  
@react-native-community/netinfo ^9.4.1  
@react-navigation/native ^6.1.7  
@react-navigation/native-stack ^6.9.13  
expo ^49.0.7  
expo-font ~11.4.0  
expo-image-picker ^14.3.2  
expo-location ^16.1.0  
expo-media-library ^15.4.1  
expo-status-bar ~1.6.0  
firebase ^9.13.0  
react 18.2.0  
react-native 0.72.3  
react-native-gifted-chat ^2.4.0  
react-native-maps ^1.7.1  
react-native-safe-area-context 4.6.3  
react-native-screens ~3.22.0  

### devDependencies 

@babel/core ^7.20.0