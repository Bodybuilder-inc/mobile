import React, { useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import imageUserAvatarUrl from '../../utils/imageUserAvatarUrl';

import {
  Container,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Title,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string | any[]) => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 dígitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string | any[]) => !!val.length,
              then: Yup.string()
                .min(6, 'No mínimo 6 dígitos')
                .required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Senha não combina'),
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        await schema.validate(data, {
          abortEarly: false,
        });

        const res = await api.put('/profile', formData);
        updateUser(res.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Error na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation],
  );

  const handleUpdateAvatar = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) {
          return;
        }
        if (resp.errorCode) {
          Alert.alert('Error ao atualizar seu avatar', resp.errorMessage);
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: resp.uri,
        });

        api.patch('users/avatar', data).then(response => {
          updateUser(response.data);
        });
      },
    );
  }, [user.id, updateUser]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={imageUserAvatarUrl('')} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleProfile}>
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
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />
              <Input
                name="old_password"
                icon="lock"
                containerStyle={{ marginTop: 16 }}
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                ref={oldPasswordInputRef}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Nova senha"
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
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button>

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Confirmar mudanças
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default Profile;
