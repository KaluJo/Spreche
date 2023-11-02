import * as React from 'react';
import { useEffect } from 'react';
import { View, FlatList, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import { Sentence, SentenceButtons } from '../styles/BaseStyles';
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
    setSentences(data ? JSON.parse(data) : []);
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
        data={sentences}
        keyExtractor={(item) => item.audioId}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
            <Sentence onPress={() => handlePlay(item.audioFilePath)}>
              {item.text}
            </Sentence>
            <SentenceButtons onPress={() => handleDelete(item.audioId)}>
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