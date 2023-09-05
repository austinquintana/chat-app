import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

const Chat = ({ route, navigation, db }) => {
  const { name, color, userID } = route.params;

  const [messages, setMessages] = useState([]);

  const addMessage = async (newMessages) => {
    const newMessageRef = await addDoc(
      collection(db, "messages"),
      newMessages[0]
    );

    if (!newMessageRef.id) {
      Alert.alert("Unable to add. Please try later");
    }
  };

  useEffect(() => {
    const unsubMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "desc")),
      (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      }
    );
  
    if (isConnected) {
      // If isConnected is true, load cached messages
      loadCachedMessages();
    }
  
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#797EF6',
          },
          left: {
            backgroundColor: '#4ADEDE',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    } else {
      return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        onSend={(message) => addMessage(message)}
        user={{
          _id: userID,
          name: name,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
