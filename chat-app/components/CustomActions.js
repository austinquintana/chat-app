import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import { View , StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  userID,
  storage,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose Picture from Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePicture();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const convertFileToBlob = async (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(new Error("XHR request failed"));
      };
      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send();
    });
  };

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!permission.cancelled) {
        const imageURI = result.assets[0].uri;
        const uniqueRefString = generateReference(imageURI);
        const blob = await convertFileToBlob(imageURI)
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
          console.log("File has been uploaded");
          const imageURL = await getDownloadURL(snapshot.ref);
          onSend({ image: imageURL });
        });
      }
    } else Alert.alert("Permissions haven't been granted.");
  };

  const takePicture = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!permission.cancelled) {
        const imageURI = result.assets[0].uri;
        const uniqueRefString = generateReference(imageURI);
        const blob = await convertFileToBlob(imageURI)
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
          console.log("File has been uploaded");
          const imageURL = await getDownloadURL(snapshot.ref);
          onSend({ image: imageURL });
        });
      }
    } else Alert.alert("Permissions haven't been granted.");
  };

  const getLocation = async () => {
    let permission = await Location.requestForegroundPermissionsAsync();

    if (permission?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert("Error occurred while fetching location.");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
