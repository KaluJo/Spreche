import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, Button, ImageBackground } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import { AddButton, AddButtonText, NewSentenceInput } from '../styles/BaseStyles';

import purple_grad from '../assets/purple_grad.jpg';

interface NewSentenceProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCheckUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewSentence: React.FC<NewSentenceProps> = ({ setShowModal, setCheckUpdate }) => {
    const [text, setText] = useState('');

    const handleAddSentence = async () => {
        try {
            const apiUrl = 'https://api.elevenlabs.io/v1/text-to-speech/XrExE9yKIg1WjnnlVkGX';
            const xiApiKey = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY;
            const headers = {
                'Accept': 'audio/mpeg',
                'xi-api-key': xiApiKey,
                'Content-Type': 'application/json'
            };
            const data = {
                text,
                model_id: 'eleven_multilingual_v2',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.5,
                    use_speaker_boost: true
                }
            };

            console.log("Fetching audio clip...");
            const response = await axios.post(apiUrl, data, { headers, responseType: 'arraybuffer' });
            console.log("Fetched audio clip!");

            const audioId = uuidv4();
            const audioFilePath = FileSystem.documentDirectory + audioId + '.mp3';

            await FileSystem.writeAsStringAsync(audioFilePath, response.request._response, { encoding: FileSystem.EncodingType.Base64 });

            const newEntry = { text, audioId, audioFilePath };
            const existingDataJSON = await AsyncStorage.getItem('sentences');
            const existingData: { text: string, audioId: string, audioFilePath: string }[] = existingDataJSON ? JSON.parse(existingDataJSON) : [];

            existingData.push(newEntry);
            await AsyncStorage.setItem('sentences', JSON.stringify(existingData));

            setText('');
            setCheckUpdate(prev => !prev);
            setShowModal(false);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <NewSentenceInput
                autoFocus={true}
                value={text}
                onChangeText={setText}
                placeholder="Enter a sentence in German"
            />
            <AddButton onPress={handleAddSentence}>
                <ImageBackground source={purple_grad} style={{ width: '100%', height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                    <AddButtonText>
                        Add
                    </AddButtonText>
                </ImageBackground>
            </AddButton>
        </View>
    );
};

export default NewSentence;
