import * as React from 'react';
import { useEffect } from 'react';
import { View, FlatList, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import { Sentence, SentenceButtons, SentenceCounter } from '../styles/BaseStyles';
import { Ionicons } from '@expo/vector-icons';

import purple_grad from '../assets/purple_grad.jpg';
import { handlePlay } from '../utils';

interface Sentence {
  word: string;
  text: string;
  audioId: string;
  audioFilePath: string;
  counter: number;
}

interface SentenceListProps {
  sentences: Sentence[];
  setSentences: React.Dispatch<React.SetStateAction<any[]>>;
}

const SentenceList: React.FC<SentenceListProps> = ({ sentences, setSentences }) => {
  const fetchData = async () => {
    const data = await AsyncStorage.getItem('sentences');
    const parsedData = data ? JSON.parse(data) : [];
    const sortedData = parsedData.sort((a: Sentence, b: Sentence) => a.counter - b.counter);
    setSentences(sortedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (audioId: string) => {
    try {
      const updatedSentences = sentences.filter(sentence => sentence.audioId !== audioId);
      setSentences(updatedSentences);
      await AsyncStorage.setItem('sentences', JSON.stringify(updatedSentences));

      const audioFilePath = FileSystem.documentDirectory + audioId + '.mp3';
      await FileSystem.deleteAsync(audioFilePath);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <View style={{ padding: 12, flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sentences}
        keyExtractor={(item) => item.audioId}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
            <Sentence onPress={() => handlePlay(item.audioFilePath)}>
              {item.text}
            </Sentence>
            <SentenceButtons style={{ flexDirection: 'row' }} onPress={() => handleDelete(item.audioId)}>
              <SentenceCounter>{item.counter}</SentenceCounter>
              <ImageBackground source={purple_grad} style={{ width: 22, height: 22, borderRadius: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                <Ionicons name="trash" size={14} style={{ left: 0.5, top: 0.2 }} color="#fff" />
              </ImageBackground>
            </SentenceButtons>
          </View>
        )}
      />
    </View>
  );
};

export default SentenceList;