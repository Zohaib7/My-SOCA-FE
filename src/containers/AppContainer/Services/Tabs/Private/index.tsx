import {createPayment, privateResult} from '@Api/App';
import {FaqsIcon} from '@Asset/logo';
import ButtonView from '@Component/ButtonView';
import H6 from '@Component/Headings/H6';
import useModal from '@Hook/useModal';
import {Colors} from '@Theme/Colors';
import Fonts from '@Theme/Fonts';
import Metrics from '@Utility/Metrics';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {useMutation} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ServiceModal from '../../ServiceModal';
import usePrivateContainer from './privateContainer';
import {useBoundStore} from '@Store/index';

const Private = ({route}) => {
  const {isGuest} = route?.params || {};
  const [selectedKidAge, setSelectedKidAge] = useState<string | null>(null);
  const [selectedTimeWeek, setSelectedTimeWeek] = useState<string | null>(null);
  const [selectedKidAge2, setSelectedKidAge2] = useState<string | null>(null);
  const [selectedTime2Week, setSelectedTime2Week] = useState<string | null>(
    null,
  );
  const [data, setData] = useState<any>(null);
  const [stripeData, setStripeData] = useState<any>();
  const [sessionType, setSessionType] = useState<string | null>(null);
  const kidAgeModal = useModal();
  const timeWeekModal = useModal();
  const kidAge2Modal = useModal();
  const time2WeekModal = useModal();
  const sessionTypeModal = useModal();
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const [loading, setLoading] = useState<boolean>(false);
  const onKidSelection = (kidAge: string) => {
    setSelectedKidAge(kidAge);
    kidAgeModal.hide();
  };

  const onTimeSelection = (timeWeek: string) => {
    setSelectedTimeWeek(timeWeek);
    timeWeekModal.hide();
  };

  const onKidSelection2 = (kidAge2: string) => {
    setSelectedKidAge2(kidAge2);
    kidAge2Modal.hide();
  };

  const onTimeSelection2 = (time2Week: string) => {
    setSelectedTime2Week(time2Week);
    time2WeekModal.hide();
  };

  const onSessionTypeSelection = (session: string) => {
    setSessionType(session);
    sessionTypeModal.hide();
  };

  const {mutate: privateMutation, isLoading} = useMutation(privateResult, {
    onSuccess: response => {
      if (response?.data) {
        setData(response);
      } else {
        console.warn('Unexpected response structure:', response);
      }
    },
    onError: error => {
      console.error('API call failed:', error);
    },
  });

  const {getSessionTypeData, getKidAgeSessionData, getKidAge} =
    usePrivateContainer();
  const payload = {
    session: sessionType,
    kids: {
      first: {
        age: selectedKidAge ?? 'N/A',
        sessions: selectedTimeWeek ?? 'N/A',
      },
      ...(selectedKidAge2 && selectedTime2Week
        ? {
            second: {
              age: selectedKidAge2,
              sessions: selectedTime2Week,
            },
          }
        : {}),
    },
  };

  useEffect(() => {
    if (
      sessionType &&
      (selectedKidAge ||
        selectedTimeWeek ||
        selectedKidAge2 ||
        selectedTime2Week)
    ) {
      privateMutation(payload);
    }
  }, [
    sessionType,
    selectedKidAge,
    selectedTimeWeek,
    selectedKidAge2,
    selectedTime2Week,
    privateMutation,
  ]);

  const totalAmount = data?.data?.['price'] ?? '00.00';

  const updatedData = JSON.stringify(data?.data);
  const emailZustand = useBoundStore((state: any) => state.emailZustand);
  const body = {
    amount: parseFloat(totalAmount?.replace('$', '')) ?? 0,
    email: emailZustand,
    description: updatedData,
    type: 'SERVICE',
  };

  const {mutate: paymentMutate} = useMutation(createPayment, {
    onSuccess: response => {
      setStripeData(response?.data);
    },
    onError: error => {
      console.error('API call failed:', error);
    },
  });

  const initializePaymentSheet = async () => {
    if (!stripeData) return;

    const {paymentIntent, customer, ephemeralKey, publishableKey} = stripeData;

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (error) {
      console.log('Error initializing payment sheet:', error);
    } else {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    if (!stripeData) return;

    const {error} = await presentPaymentSheet();
    if (error) {
      console.log('Error presenting payment sheet:', error);
      return;
    }

    // Handle the result of the payment
    const {error: confirmError} = await confirmPayment(
      stripeData.paymentIntent,
      {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: 'Test User',
          },
        },
      },
    );
    if (confirmError) {
      console.log('Error confirming payment:', confirmError);
    } else {
      // Payment succeeded
      console.log('Payment successful');
      // Navigate to success page or show success message
    }
  };

  useEffect(() => {
    if (stripeData) {
      initializePaymentSheet().then(() => {
        openPaymentSheet(); // Only open the sheet after initialization is complete
      }).catch((error) => {
        console.error('Error initializing payment sheet:', error);
      });
    }
  }, [stripeData]);
  
  

  const onOpenSheet = () => {
    setLoading(true); // Optional: Show a loading indicator
  
    paymentMutate(body, {
      onSuccess: (response) => {
        if (response?.data) {
          setStripeData(response.data); // Triggers useEffect to handle initialization and opening
        } else {
          console.error('Stripe data is missing or invalid');
          setLoading(false); // Hide loading indicator on failure
        }
      },
      onError: (error) => {
        console.error('Payment mutation error:', error);
        setLoading(false); // Hide loading indicator on error
      },
    });
  };

  return (
    <StripeProvider publishableKey={stripeData?.publishableKey || ''}>
      <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
        <ScrollView>
          <ButtonView
            onPress={() => {
              sessionTypeModal.show();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: Colors.DARK_BLUE,
              padding: 12,
              borderRadius: 20,
              marginBottom: 20,
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6
              text={sessionType ?? 'Select Session Type'}
              style={{color: Colors.WHITE}}
            />
            <FaqsIcon />
          </ButtonView>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Select Kid 1 age" style={{color: Colors.WHITE}} />
            <ButtonView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.DARK_BLUE,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                kidAgeModal.show();
              }}>
              <H6
                text={selectedKidAge ?? 'Select Age'}
                style={{color: Colors.WHITE}}
              />
              <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
            </ButtonView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="No of Sessions" style={{color: Colors.WHITE}} />
            <ButtonView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.DARK_BLUE,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                timeWeekModal.show();
              }}>
              <H6
                text={selectedTimeWeek ?? 'Select'}
                style={{color: Colors.WHITE}}
              />
              <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
            </ButtonView>
          </View>
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              height: 1,
              width: '100%',
              backgroundColor: Colors.WHITE,
              borderWidth: 1,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Select Kid 2 age" style={{color: Colors.WHITE}} />
            <ButtonView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.DARK_BLUE,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                kidAge2Modal.show();
              }}>
              <H6
                text={selectedKidAge2 ?? 'Select Age'}
                style={{color: Colors.WHITE}}
              />
              <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
            </ButtonView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="No of Sessions" style={{color: Colors.WHITE}} />
            <ButtonView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.DARK_BLUE,
                borderRadius: 20,
                padding: 10,
              }}
              onPress={() => {
                time2WeekModal.show();
              }}>
              <H6
                text={selectedTime2Week ?? 'Select'}
                style={{color: Colors.WHITE}}
              />
              <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
            </ButtonView>
            <ServiceModal
              isModalVisible={kidAgeModal.isVisible}
              handleSelection={onKidSelection}
              title={'Select Kid 1 Age'}
              handleDropOffPress={kidAgeModal.hide}
              modalData={getKidAge?.values}
            />
            <ServiceModal
              isModalVisible={timeWeekModal.isVisible}
              handleSelection={onTimeSelection}
              title={'Select No Of Session'}
              handleDropOffPress={timeWeekModal.hide}
              modalData={getKidAgeSessionData?.values}
            />
            <ServiceModal
              isModalVisible={kidAge2Modal.isVisible}
              handleSelection={onKidSelection2}
              title={'Select Kid 2 Age'}
              handleDropOffPress={kidAge2Modal.hide}
              modalData={getKidAge?.values}
            />
            <ServiceModal
              isModalVisible={time2WeekModal.isVisible}
              handleSelection={onTimeSelection2}
              title={'Select No Of Session'}
              handleDropOffPress={time2WeekModal.hide}
              modalData={getKidAgeSessionData?.values}
            />
            <ServiceModal
              isModalVisible={sessionTypeModal.isVisible}
              handleSelection={onSessionTypeSelection}
              title={'Select Session Type'}
              handleDropOffPress={sessionTypeModal.hide}
              modalData={getSessionTypeData?.values}
            />
          </View>
        </ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            marginTop: 'auto',
            flexDirection: 'row',
            marginBottom: Metrics.verticalScale(20),
          }}>
          <View style={{alignItems: 'center'}}>
            <H6 text="Total Amount" style={{color: Colors.TEXT_COLOR}} />
            <H6
              text={`${`$${totalAmount}` ?? '00.00'}`}
              style={{color: Colors.WHITE}}
            />
          </View>
          {!isGuest && (
            <ButtonView
              onPress={onOpenSheet}
              style={{
                backgroundColor: Colors.ICE_BLUE,
                justifyContent: 'center',
                padding: Metrics.baseMargin,
                paddingHorizontal: 40,
                borderRadius: 6,
              }}>
              <H6
                text="Avail Now"
                style={{...Fonts.SemiBold(Fonts.Size.xSmall, Colors.BLACK)}}
              />
            </ButtonView>
          )}
        </View>
      </View>
    </StripeProvider>
  );
};

export default Private;

const styles = StyleSheet.create({});
