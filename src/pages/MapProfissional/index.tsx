import React, { useCallback, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import SearchBar from '../../components/SearchBar';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  WrapperInput,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  Providerinfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Profissional {
  id: string;
  user: {
    name: string;
    telephone: string;
    address: {
      street: string;
      number: string;
    };
  };
}

const MapProfissional: React.FC = () => {
  const [personals, setPersonals] = useState<Profissional[]>([]);
  const [nutricionistas, setNutricionistas] = useState<Profissional[]>([]);
  const [searchNameProfissional, setSearchNameProfissional] = useState('');
  const { navigate, goBack } = useNavigation();

  const searchProfissional = useCallback(async () => {
    const response = await api.get(`/students/search/professional`, {
      params: {
        district: searchNameProfissional,
      },
    });

    setPersonals(response.data.personals);
    setNutricionistas(response.data.nutritionists);
  }, [searchNameProfissional]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={32} color="#999591" />
          </BackButton>

          <HeaderTitle>Buscar Profissionais</HeaderTitle>
        </Header>
        <Container>
          <ProvidersList
            data={personals}
            keyExtractor={personal => personal.id}
            ListHeaderComponent={
              <ProvidersListTitle>Personal</ProvidersListTitle>
            }
            renderItem={({ item: personal }) => (
              <ProviderContainer onPress={() => {}}>
                <Providerinfo>
                  <ProviderName>{personal.user.name}</ProviderName>

                  <ProviderMeta>
                    <ProviderMetaText>
                      {personal.user.telephone}
                    </ProviderMetaText>
                  </ProviderMeta>
                </Providerinfo>
              </ProviderContainer>
            )}
          />

          <ProvidersList
            data={nutricionistas}
            keyExtractor={provider => provider.id}
            ListHeaderComponent={
              <ProvidersListTitle>Nutricionista</ProvidersListTitle>
            }
            renderItem={({ item: provider }) => (
              <ProviderContainer onPress={() => {}}>
                <Providerinfo>
                  <ProviderName>{provider.user.name}</ProviderName>

                  <ProviderMeta>
                    <ProviderMetaText>
                      {provider.user.telephone}
                    </ProviderMetaText>
                  </ProviderMeta>
                </Providerinfo>
              </ProviderContainer>
            )}
          />

          <WrapperInput>
            <SearchBar
              placeholder="Busque por bairro"
              value={searchNameProfissional}
              onChangeText={text => {
                setSearchNameProfissional(text);
              }}
              onPress={searchProfissional}
            />
          </WrapperInput>
        </Container>
      </>
    </TouchableWithoutFeedback>
  );
};

export default MapProfissional;
