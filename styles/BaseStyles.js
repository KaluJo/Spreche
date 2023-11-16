import styled from 'styled-components';

const primaryColor = "#7743DB";
const backgroundColor = "#F7EFE5";
const textColor = "#4B4453";
const buttonTextColor = "#EEEEEE";
const inputBackgroundColor = "#FFFBF5";
const boxShadow = "0px 0px 4px rgba(0, 0, 0, 0.15)";

export const AppContainer = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
`;

/**
 * ADD SENTENCE STYLES
 */

export const AddModalView = styled.View`
  width: 90%;
  padding: 16px;
  border-radius: 10px;
  background-color: ${backgroundColor};
`;

export const NewSentenceInput = styled.TextInput`
  align-self: center;
  width: 100%;
  border-radius: 6px;
  font-size: 15px;
  background-color: ${inputBackgroundColor};
  padding: 10px;
  margin-bottom: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  align-self: center;
  border-radius: 6px;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${primaryColor};
  margin-top: 5px;
`;

export const AddButtonText = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: Inter_700Bold;
  color: ${buttonTextColor};
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

/**
 * SENTENCE DISPLAY STYLES
 */

export const Sentence = styled.Text`
  flex: 1;
  font-size: 18px;
  font-family: Inter_700Bold;
  color: ${textColor};
`;

export const SentenceButtons = styled.TouchableOpacity`
  margin-left: 6px;
  align-self: center;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const SentenceCounter = styled.Text`
  font-size: 16px;
  margin-right: 4px;
  font-family: Inter_700Bold;
  color: ${textColor};
`;

/**
 * QUIZ STYLES
 */

export const QuizModalView = styled.View`
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  background-color: ${backgroundColor};
`;

export const QuizCounter = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: Inter_700Bold;
  color: ${textColor};
  margin-bottom: 4px;
`;

export const QuizSentence = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: Inter_400Regular;;
  color: ${textColor};
  margin-bottom: 10px;
`;

export const QuizInput = styled.TextInput`
  align-self: center;
  width: 100%;
  border-radius: 6px;
  font-size: 15px;
  background-color: ${inputBackgroundColor};
  padding: 10px;
  margin-bottom: 15px;
`;

export const QuizMicButton = styled.TouchableOpacity`
  align-self: center;
  border-radius: 6px;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${primaryColor};
`;

export const QuizNextButton = styled.TouchableOpacity`
  align-self: center;
  border-radius: 6px;
  width: 100%;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${primaryColor};
  margin-top: 15px;
`;