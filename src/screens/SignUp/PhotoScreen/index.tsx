import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActionSheetIOS,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { SCREENS } from '@/constants/navigation';
import CameraIcon from '@assets/buttons/camera.svg';

const SignUpPhotoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const [photo, setPhoto] = useState<string>('');
  const [photoError, setPhotoError] = useState('');

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Povolenie',
        'Aby ste mohli vybrať fotku z galérie, musíte povoliť prístup k fotkám.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto(asset.uri);
      setPhotoError('');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Povolenie',
        'Aby ste mohli odfotiť fotku, musíte povoliť prístup k fotoaparátu.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPhoto(asset.uri);
      setPhotoError('');
    }
  };

  const handleCameraButtonClick = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Zrušiť', 'Vybrať z galérie', 'Odfotiť sa'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            await pickFromLibrary();
          } else if (buttonIndex === 2) {
            await takePhoto();
          }
        },
      );
    } else {
      Alert.alert('Fotka', 'Vyber si možnosť', [
        { text: 'Vybrať z galérie', onPress: pickFromLibrary },
        { text: 'Odfotiť sa', onPress: takePhoto },
        { text: 'Zrušiť', style: 'cancel' },
      ]);
    }
  };

  const handleContinue = () => {
    if (!photo) {
      setPhotoError('Musíte vybrať fotografiu');
      return;
    }

    setPhotoError('');
    onContinue();
  };

  const onContinue = () => {
    // TODO: uložiť `photo` (URI) do store / backend podľa tvojej logiky
    navigation.navigate(SCREENS.EmailConfirmationScreen, {
      title: 'E-mail odoslaný na adresu:',
      email: 'example@gmail.com',
    });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={64}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingHorizontal: 24 }}>
            <Header
              title="Registrácia"
              onBackPress={() => navigation.goBack()}
              containerStyle={{ marginBottom: 8 }}
            />

            <StepIndicator currentStep={6} />
          </View>

          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>Fotka</Text>
            <Text style={styles.sectionSubTitle}>Usmej sa a ukáž, kto si 😄</Text>
            <Text style={styles.sectionSubTitle}>
              Vyber dobre osvetlené miesto a odfoť sa tak, aby bolo vidieť tvoju tvár.
            </Text>
          </View>

          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={handleCameraButtonClick}>
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={{ width: '100%', height: '100%', borderRadius: 16 }}
                  resizeMode="cover"
                />
              ) : (
                <CameraIcon />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {photoError ? <Text style={styles.errorMessage}>{photoError}</Text> : null}

            <PrimaryButton
              onPress={handleContinue}
              title="Dokončiť registráciu"
              style={{ marginTop: 44, marginBottom: 24 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpPhotoScreen;
