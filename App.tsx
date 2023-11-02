import * as React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import NewSentence from './components/NewSentence';
import SentenceList from './components/SentenceList';
import AddSentenceModal from './components/AddSentenceModal';
import { AddButton, AddButtonBottomRight, AddButtonText, AppContainer } from './styles/BaseStyles';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';

import purple_grad from './assets/purple_grad.jpg';

export default function App() {
  const [sentences, setSentences] = useState<any[]>([]);
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  return (
    <AppContainer style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AddSentenceModal showModal={showModal} setShowModal={setShowModal} setCheckUpdate={setCheckUpdate} />
        <SentenceList sentences={sentences} setSentences={setSentences} />
      </SafeAreaView>
      <AddButtonBottomRight onPress={() => setShowModal(!showModal)}>
          <ImageBackground source={purple_grad} style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
            <Ionicons name="add" size={32} style={{ left: 1 }} color="#fff" />
          </ImageBackground>
      </AddButtonBottomRight>
    </AppContainer>
  );
};
