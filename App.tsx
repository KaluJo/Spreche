import * as React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, SafeAreaView } from 'react-native';

import SentenceList from './components/SentenceList';
import AddSentenceModal from './components/AddSentenceModal';
import QuizModal from './components/QuizModal';

import { AddButtonBottomRight, AppContainer } from './styles/BaseStyles';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { Ionicons } from '@expo/vector-icons';

import * as Notifications from 'expo-notifications';

import purple_grad from './assets/purple_grad.jpg';

interface Sentence {
  word: string;
  text: string;
  audioId: string;
  audioFilePath: string;
  counter: number;
}

export default function App() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('sentences');
      setSentences(data ? JSON.parse(data) : []);
    };

    fetchData();
  }, [checkUpdate]);

  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {

    async function scheduleNotification() {
      const { status } = await Notifications.getPermissionsAsync();

      await Notifications.cancelAllScheduledNotificationsAsync();

      if (status !== 'granted') {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Zeit für ein Quiz!",
          body: "Es ist eine Stunde vergangen. Lass uns üben",
        },
        trigger: { seconds: 3600 },
      });
    }

    scheduleNotification();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      setShowQuizModal(true);
    });

    return () => subscription.remove();
  }, []);

  return (
    <AppContainer style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AddSentenceModal showModal={showModal} setShowModal={setShowModal} setCheckUpdate={setCheckUpdate} />
        <QuizModal sentences={sentences} showQuizModal={showQuizModal} setShowQuizModal={setShowQuizModal} />
        <SentenceList sentences={sentences} setSentences={setSentences} />
      </SafeAreaView>
      <AddButtonBottomRight style={{ right: 80 }} onPress={() => setShowQuizModal(!showQuizModal)}>
        <ImageBackground source={purple_grad} style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
          <Ionicons name="star" size={20} style={{ left: 0.5 }} color="#fff" />
        </ImageBackground>
      </AddButtonBottomRight>
      <AddButtonBottomRight onPress={() => setShowModal(!showModal)}>
        <ImageBackground source={purple_grad} style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
          <Ionicons name="add" size={32} style={{ left: 1 }} color="#fff" />
        </ImageBackground>
      </AddButtonBottomRight>
    </AppContainer>
  );
};
