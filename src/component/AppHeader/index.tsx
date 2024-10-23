import React from 'react';
import {Text, StyleSheet, View, Pressable, Image} from 'react-native';
import {Colors, Fonts} from '../../themes';
import Metrics from '../../utility/Metrics';
import ImageViewer from '../ImageView/Index';
import {useNavigation} from '@react-navigation/native';
import {
  AppLogo,
  BackIconSvg,
  LOGOSVG,
  LogoSvg,
  SOCASvg,
  SocaLogo,
  mySocaLogo,
} from '@Asset/logo';
import H7 from '@Component/Headings/H7';
import H6 from '@Component/Headings/H6';
import H4 from '@Component/Headings/H4';
import H3 from '@Component/Headings/H3';
import H5 from '@Component/Headings/H5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from '../Icon/Icon';

type IHeaderProps = {
  title?: string | null;
  actionButton?: JSX.Element;
  containerStyle?: object;
  backButton?: boolean;
  subText?: string | null;
  desc?: string | null;
  isLogo?: boolean;
};

export default function Header(props: IHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {
    title = '',
    actionButton,
    containerStyle,
    backButton = true,
    subText,
    desc,
    isLogo = false,
  } = props;

  return (
    <View style={[styles.container, containerStyle, insets.top ? {paddingTop: insets.top} : null]}>
      {isLogo && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Metrics.baseMargin,
          }}>
          <View style={styles.backWrapper}>
            {/* <LOGOSVG height={Metrics.verticalScale(70)} /> */}
            <Image source={mySocaLogo} style={{width: 50, height: 50}} />
          </View>
          <View style={{marginHorizontal: 6}}>
            <H5
              text="SOCA"
              style={{...Fonts.Medium(Fonts.Size.large, Colors.Colors.WHITE)}}
            />
            <H5
              text="Superover Cricket Academy"
              style={{
                ...Fonts.Medium(Fonts.Size.xSmall, Colors.Colors.ICE_BLUE),
              }}
            />
          </View>
        </View>
      )}

      <View style={styles.innerContainer}>
        {backButton && (
          <>
            <Pressable
              style={styles.backWrapper}
              onPress={() => navigation.goBack()}>
              <BackIconSvg />
            </Pressable>
            <Text style={styles.textStyle}>{title}</Text>
          </>
        )}

        <View style={{flexDirection: 'column', marginTop: Metrics.baseMargin}}>
          <H6 text={subText} style={{color: Colors.Colors.ICE_BLUE}} />
          <H3 text={desc} style={{color: Colors.Colors.WHITE}} />
        </View>
      </View>
      <View style={styles.iconStyle}>{actionButton}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Metrics.scale(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A182C',
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backWrapper: {
    backgroundColor: Colors.Colors.TRANSPARENT,
    height: Metrics.scale(48),
    width: Metrics.scale(48),
    borderRadius: Metrics.scale(8),
    justifyContent: 'center',
    marginRight: Metrics.scale(10),
    alignItems: 'center',
  },
  textStyle: {
    ...Fonts.Bold(16, Colors.Colors.WHITE),
    textAlign: 'left',
    marginVertical: Metrics.verticalScale(5),
    letterSpacing: 0,
  },
  iconStyle: {
    flexDirection: 'row',
    marginTop: Metrics.doubleBaseMargin,
  },
});
