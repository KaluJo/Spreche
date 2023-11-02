import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, Button, Modal, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';
import { ModalCenteredView } from '../styles/BaseStyles';
import NewSentence from './NewSentence';

interface AddSentenceModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setCheckUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSentenceModal: React.FC<AddSentenceModalProps> = ({ showModal, setShowModal, setCheckUpdate }) => {
    const [text, setText] = useState('');

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setShowModal(!showModal); }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <TouchableWithoutFeedback>
                            <ModalCenteredView>
                                <NewSentence setShowModal={setShowModal} setCheckUpdate={setCheckUpdate} />
                            </ModalCenteredView>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default AddSentenceModal;