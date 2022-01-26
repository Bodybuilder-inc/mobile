import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import imageUserAvatarUrl from '../../utils/imageUserAvatarUrl';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  Providerinfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  WrapperSearch,
  BoxButtonSearch,
  SearchIcon,
} from './styles';
import SearchBar from '../../components/SearchBar';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(resp => {
      setProviders(resp.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToSearch = useCallback(() => {
    navigate('MapProfissional');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={imageUserAvatarUrl('')} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<ProvidersListTitle>Dieta</ProvidersListTitle>}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={imageUserAvatarUrl(provider.avatar_url)} />

            <Providerinfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </Providerinfo>
          </ProviderContainer>
        )}
      />

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={<ProvidersListTitle>Treino</ProvidersListTitle>}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={imageUserAvatarUrl(provider.avatar_url)} />

            <Providerinfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </Providerinfo>
          </ProviderContainer>
        )}
      />
      <WrapperSearch>
        <BoxButtonSearch onPress={navigateToSearch}>
          <SearchIcon />
        </BoxButtonSearch>
      </WrapperSearch>
    </Container>
  );
};

export default Dashboard;
