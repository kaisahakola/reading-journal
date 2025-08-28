import { Alert } from 'react-native';

export const TriggerAlert = (
  title: string,
  question: string,
  errMsg: string,
  btnText: string,
  onPress: () => void,
  extraBtn: boolean,
  extraBtnText?: string,
  extraBtnOnPress?: () => void,
) => {
  try {
    Alert.alert(title, question, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: btnText,
        onPress: onPress,
      },
      extraBtn
        ? {
            text: extraBtnText,
            onPress: extraBtnOnPress,
          }
        : {},
    ]);
  } catch (err) {
    console.error(errMsg, err);
  }
};
