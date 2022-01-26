import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import apicep from '../../services/apicep';
import { getBusinessDate } from '../../utils/getBusinessDate';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  birthday: string;
  telephone: string;
  user_type: string;
  street: string;
  number: string;
  district: string;
  city: string;
  uf: string;
  cep: string;
}

interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const telephoneInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);
  const cepInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);
  const streetInputRef = useRef<TextInput>(null);
  const districtInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const ufInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getBusinessDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [streetVar, setStreetVar] = useState('');
  const [districtVar, setDistrictVar] = useState('');
  const [cityVar, setCityVar] = useState('');
  const [ufVar, setUfVar] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

  const hadleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Senha não combina',
          ),
          telephone: Yup.string().required('Número obrigatório'),
          cep: Yup.string().required('CEP é obrigatório'),
          number: Yup.number().required('Número é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const sendData = {
          ...data,
          birthday: selectedDate,
          user_type: 'student',
          street: streetVar,
          district: districtVar,
          city: cityVar,
          uf: ufVar,
        };

        console.log(sendData);

        await api.post('/users', sendData);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação!',
        );

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Error no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente.',
        );
      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1, marginBottom: 50 }}
        >
          <Container>
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCorrect={false}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => telephoneInputRef.current?.focus()}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="phone-pad"
                name="telephone"
                icon="phone"
                placeholder="Telefone"
                returnKeyType="next"
                ref={telephoneInputRef}
                onSubmitEditing={() => birthdayInputRef.current?.focus()}
              />

              <OpenDatePickerButton onPress={hadleToggleDatePicker}>
                <OpenDatePickerButtonText>
                  Data de Nascimento
                </OpenDatePickerButtonText>
              </OpenDatePickerButton>

              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  textColor="#f4ede8"
                  value={selectedDate}
                  onChange={handleDateChanged}
                />
              )}
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                ref={passwordInputRef}
                onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
              />
              <Input
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmação da senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                ref={passwordConfirmInputRef}
                onSubmitEditing={() => cepInputRef.current?.focus()}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="numeric"
                name="cep"
                icon="map-pin"
                placeholder="CEP"
                returnKeyType="next"
                ref={cepInputRef}
                onSubmitEditing={async event => {
                  const resp = await apicep.get(
                    `/${event.nativeEvent.text}/json`,
                  );
                  const address = resp.data as IAddress;
                  setStreetVar(address.logradouro);
                  setDistrictVar(address.bairro);
                  setCityVar(address.localidade);
                  setUfVar(address.uf);
                  numberInputRef.current?.focus();
                }}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                keyboardType="numeric"
                name="number"
                icon="home"
                placeholder="Número"
                returnKeyType="send"
                ref={numberInputRef}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                name="street"
                icon="map"
                placeholder="Rua"
                value={streetVar}
                ref={streetInputRef}
                editable={false}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                name="district"
                icon="map"
                placeholder="Bairro"
                value={districtVar}
                ref={districtInputRef}
                editable={false}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                name="city"
                icon="map"
                placeholder="Cidade"
                value={cityVar}
                ref={cityInputRef}
                editable={false}
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="off"
                name="uf"
                icon="map"
                placeholder="UF"
                value={ufVar}
                ref={ufInputRef}
                editable={false}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!isKeyboardVisible && (
        <BackToSignIn onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={20} color="#dd3434" />
          <BackToSignInText>Voltar para login</BackToSignInText>
        </BackToSignIn>
      )}
    </>
  );
};

export default SignUp;
