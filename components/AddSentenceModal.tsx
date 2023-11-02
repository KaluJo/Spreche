import * as React from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

// import "react-native-get-random-values";
// import { v4 as uuidv4 } from 'uuid';

import { AddModalView } from '../styles/BaseStyles';
import NewSentence from './NewSentence';

interface AddSentenceModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSentenceModal: React.FC<AddSentenceModalProps> = ({ showModal, setShowModal, setCheckUpdate }) => {
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
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <AddModalView>
                <NewSentence setShowModal={setShowModal} setCheckUpdate={setCheckUpdate} />
              </AddModalView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddSentenceModal;


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  counter: {
    fontSize: 20,
    marginBottom: 10,
  },
  sentence: {
    fontSize: 18,
    marginBottom: 20,
  },
  transcription: {
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 60,
    padding: 10,
    marginBottom: 20,
  },
});