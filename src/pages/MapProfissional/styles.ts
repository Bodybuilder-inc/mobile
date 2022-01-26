import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Profissional } from './index';

export const Container = styled.View`
  flex: 1;
  padding: 0 30px 30px;
`;
export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 22}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  padding-left: 20px;
  color: #f4ede8;
  font-size: 25px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const WrapperInput = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const ProvidersList = styled(
  FlatList as new () => FlatList<Profissional>,
)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const Providerinfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;
