import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { QuizCounter, QuizInput, QuizMicButton, QuizModalView, QuizNextButton, QuizSentence } from '../styles/BaseStyles';
import { handlePlay, levenshteinDistance } from '../utils';
import purple_grad from '../assets/purple_grad.jpg';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Sentence {
  word: string;
  text: string;
  audioId: string;
  audioFilePath: string;
  counter: number;
}

interface QuizModalProps {
  sentences: Sentence[];
  showQuizModal: boolean;
  setShowQuizModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizModal: React.FC<QuizModalProps> = ({ sentences, showQuizModal, setShowQuizModal }) => {
  const filteredSentences = sentences.filter(sentence => sentence.counter < 15);

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [revealSentence, setRevealSentence] = useState<boolean>(false);

  useEffect(() => {
    const onSpeechResults = (event: SpeechResultsEvent) => {
      if (event && event.value) {
        setTranscribedText(event.value[0] || "");
      }
    };

    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    setTranscribedText("");
    await Voice.start("de-DE"); // CHANGE THIS TO YOUR RESPECTIVE LANGUAGE CODE
    setIsRecording(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setIsRecording(false);
  };

  const checkAccuracy = (): boolean => {
    const originalSentence = sentences[currentSentenceIndex].text.toLowerCase();
    const transcribedSentence = transcribedText.toLowerCase();

    const originalWords = originalSentence.split(" ");
    const transcribedWords = transcribedSentence.split(" ");

    let totalEdits = 0;
    const maxLength = Math.max(originalWords.length, transcribedWords.length);

    for (let i = 0; i < maxLength; i++) {
      const originalWord = originalWords[i] || "";
      const transcribedWord = transcribedWords[i] || "";

      totalEdits += levenshteinDistance(originalWord, transcribedWord);
    }

    const averageEditsPerWord = totalEdits / maxLength;
    return averageEditsPerWord <= 1;
  };

  const handleNextSentence = (): void => {
    if (checkAccuracy()) {
      const updatedSentences = sentences.map((sentence, index) => {
        if (index === currentSentenceIndex) {
          return { ...sentence, counter: sentence.counter + 1 };
        }
        return sentence;
      });

      AsyncStorage.setItem('sentences', JSON.stringify(updatedSentences));

      if (currentSentenceIndex + 1 < filteredSentences.length) {
        handlePlay(filteredSentences[currentSentenceIndex].audioFilePath);
        setCurrentSentenceIndex(currentSentenceIndex + 1);
        setTranscribedText("");
        setRevealSentence(false);
      } else {
        handlePlay(filteredSentences[currentSentenceIndex].audioFilePath);
        setShowQuizModal(false);
        setCurrentSentenceIndex(0);
        setRevealSentence(false);
      }
    } else {
      alert("Bitte versuchen Sie es erneut.");
    }
  };

  if (currentSentenceIndex >= filteredSentences.length) {
    setShowQuizModal(false);
    setCurrentSentenceIndex(0);
    return null;
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showQuizModal}
      >
        <View style={styles.modalOverlay}>
          <QuizModalView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <QuizCounter>{`${currentSentenceIndex + 1}/${filteredSentences.length}`}</QuizCounter>
              <TouchableOpacity style={{ left: 2 }} onPress={() => setShowQuizModal(false)}>
                <Ionicons name="close" color={"#4B4453"} size={21} />
              </TouchableOpacity>
            </View>

            {revealSentence ?
              <QuizSentence onPress={() => setRevealSentence(!revealSentence)}>
                {filteredSentences[currentSentenceIndex].text}
              </QuizSentence>
              :
              <QuizSentence onPress={() => setRevealSentence(!revealSentence)}>
                {filteredSentences[currentSentenceIndex].word}
              </QuizSentence>
            }

            <QuizInput multiline value={transcribedText} editable={false} />

            {!isRecording ? (
              <QuizMicButton onPress={startSpeechToText}>
                <ImageBackground source={purple_grad} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                  <Ionicons name="mic" size={28} style={{ left: 1 }} color="#fff" />
                </ImageBackground>
              </QuizMicButton>
            ) : (
              <QuizMicButton onPress={stopSpeechToText}>
                <ImageBackground source={purple_grad} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                  <Ionicons name="mic-off" size={28} style={{ left: 1 }} color="#fff" />
                </ImageBackground>
              </QuizMicButton>
            )}

            {(transcribedText !== "") ?
              <QuizNextButton onPress={handleNextSentence}>
                <ImageBackground source={purple_grad} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                  <Ionicons name="arrow-redo" size={22} style={{ left: 1 }} color="#fff" />
                </ImageBackground>
              </QuizNextButton> :
              null}
          </QuizModalView>
        </View>
      </Modal>
    </View>
  );
};

export default QuizModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});