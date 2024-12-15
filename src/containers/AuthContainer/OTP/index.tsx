import {LOGOSVG, mySocaLogo, SOCAPng} from '@Asset/logo';
import AuthDefaultHeading from '@Component/AuthDefaultHeading';
import {Colors} from '@Theme/Colors';
import Metrics from '@Utility/Metrics';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import OTP from './components/OTP';

const AuthOTP = ({route}) => {
  console.log(
    route?.params?.payload?.parentId,
    'This is email from otp screen',
  );
  const {parentId} = route?.params?.payload || {};
  const [value, setValue] = React.useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Metrics.scale(20),
        backgroundColor: Colors.APP_BACKGROUND,
      }}>
      {/* <LOGOSVG style={{alignSelf: 'center', marginTop: -60}} /> */}
      <Image source={mySocaLogo}  style={{width: 90, height: 90,alignSelf: 'center'}}/>
      <AuthDefaultHeading
        isOtp={true}
        title="OTP Code Verfication"
        desc={`We have sent an OTP code to your email ${parentId}. Enter the OTP code below to verify.`}
      />
      <View style={{marginTop: Metrics.verticalScale(20)}} />
      <OTP value={value} setValue={setValue} email={parentId} />
    </View>
  );
};

export default AuthOTP;

const styles = StyleSheet.create({});
