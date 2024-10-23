import LottieWrapper from '@Component/LottieWrapper';
import Spinner from '@Component/Spinner/Spinner';
import {toastConfig} from '@Constants/toastUtils';
import {Colors} from '@Theme/Colors';
import Utils from '@Utility/Utils';
import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import Toast from 'react-native-toast-message';
import ApiClientProvider from './APIServices/Client';
import AuthNavigator from './AuthNavigator';
import ErrorBoundary from './component/ErrorBoundries/ErrorBoundries';
import LoginProvider from './contexts/loginContext/loginProvider';
import NetInfo from '@react-native-community/netinfo';
import CustomModal from '@Component/CustomModal/CustomModal';
import {FirebaseNotification} from '@Service/NotificationServices/NotificationServices';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(
    () => false,
  );
  const [isConnected, setIsConnected] = React.useState(true);
  const [isDeleteAccountVisible, setisDeleteAccountVisible] =
    React.useState(isConnected);

  const handleSubmit = React.useCallback(() => {
    setIsAnimationFinished(true);
  }, [setIsAnimationFinished]);
  const keyboardHandler = () => {
    KeyboardManager.setEnable(true);
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    KeyboardManager.setToolbarTintColor(Colors.TRANSPARENT);
  };

  React.useEffect(() => {
    if (Utils.isPlatformIOS()) {
      keyboardHandler();
    }
  }, []);

  // Internet Connection popup
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state?.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  const changeDeleteModalVisible = isLogout => {
    if (isLogout == true) {
      handleRetry();
    } else {
    }
  };

  React.useEffect(() => {
    // varss
    FirebaseNotification.requestPermission();
    if (!FirebaseNotification.initiated) {
      FirebaseNotification.createNotificationListeners();
    }
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ApiClientProvider>
          <StatusBar
            translucent={true}
            backgroundColor={Colors.TRANSPARENT}
            barStyle="dark-content"
          />
          <LoginProvider>
            {/* {!isAnimationFinished ? (
            <LottieWrapper handleSubmit={handleSubmit} />
          ) : (
      
          )} */}
            <AuthNavigator />
          </LoginProvider>
          <Toast config={toastConfig} />
          {isConnected ? (
            <></>
          ) : (
            <CustomModal
              changeDeleteModalVisible={changeDeleteModalVisible}
              setisDeleteAccountVisible={setisDeleteAccountVisible}
              isDeleteAccountVisible={isDeleteAccountVisible}
              title={'Internet Unavailable'}
              desc={'Internet connection lost. Please connect again.'}
              isNetConnection={isConnected}
              primaryBtnTxt="Retry"
            />
          )}
          <Spinner />
        </ApiClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
