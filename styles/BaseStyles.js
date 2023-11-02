import styled from 'styled-components';

const primaryColor = "#7743DB"; 
const hoverColor = "#C3ACD0"; 
const backgroundColor = "#F7EFE5";
const fontColor = "#EEEEEE"; 
const borderColor = "#FFAFCC"; 
const boxShadow = "0px 0px 4px rgba(0, 0, 0, 0.15)"; 
const inputBackgroundColor = "#BEE3DB"; 

export const AppContainer = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

export const ModalCenteredView = styled.View`
  height: 120px;
  width: 90%;
  border-radius: 10px;
  background-color: #F7EFE5;
`;

export const NewSentenceInput = styled.TextInput`
  align-self: center;
  width: 90%;
  border-radius: 6px;
  font-size: 15px;
  background-color: #FFFBF5;
  padding: 10px;
  margin-bottom: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  align-self: center;
  border-radius: 6px;
  width: 90%;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${primaryColor};
`;

export const AddButtonText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: Inter_700Bold;
  color: ${fontColor};
`;

export const AddButtonBottomRight = styled.TouchableOpacity`
  background-color: orange;
  position: absolute;
  right: 20px;
  bottom: 40px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
`;

export const Sentence = styled.Text`
  flex: 1;
  font-size: 18px;
  font-family: Inter_700Bold;
  color: #4B4453;
`;

export const SentenceButtons = styled.TouchableOpacity`
  align-self: center;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;