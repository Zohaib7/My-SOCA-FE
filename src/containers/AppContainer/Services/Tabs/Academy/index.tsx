import { academyResult, createPayment } from '@Api/App';
import { FaqsIcon } from '@Asset/logo';
import ButtonView from '@Component/ButtonView';
import H6 from '@Component/Headings/H6';
import useModal from '@Hook/useModal';
import { useBoundStore } from '@Store/index';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useMutation } from '@tanstack/react-query';
import { Colors } from '@Theme/Colors';
import Fonts from '@Theme/Fonts';
import Metrics from '@Utility/Metrics';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ServiceModal from '../../ServiceModal';
import useAcademyContainer from './academyContainer';

const Academy = ({route}) => {
  const {isGuest}=route?.params || {}
  const locationZustand = useBoundStore((state: any) => state.locationZustand);
  const [selectedKidAge, setSelectedKidAge] = useState<string | null>(null);
  const [selectedTimeWeek, setSelectedTimeWeek] = useState<string | null>(null);
  const [selectedKidAge2, setSelectedKidAge2] = useState<string | null>(null);
  const [selectedTime2Week, setSelectedTime2Week] = useState<string | null>(null);
  const [stripeData, setStripeData] = useState<any>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { initPaymentSheet, presentPaymentSheet, confirmPayment } = useStripe();
  const kidAgeModal = useModal();
  const timeWeekModal = useModal();
  const kidAge2Modal = useModal();
  const time2WeekModal = useModal();
  const { getKidAge, getTimesPerWeek } = useAcademyContainer();
  const emailZustand = useBoundStore(
    (state: any) => state.emailZustand,
  );
  
  const { mutate: signupMutation } = useMutation(academyResult, {
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

  const payload = {
    location: locationZustand,
    kids: {
      first: {
        age: selectedKidAge ?? 'N/A',
        perWeek: selectedTimeWeek ?? 'N/A',
      },
      ...(selectedKidAge2 && selectedTime2Week
        ? {
            second: {
              age: selectedKidAge2,
              perWeek: selectedTime2Week,
            },
          }
        : {}),
    },
  };

  const totalAmount = data?.data?.['Net Price'];
  
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

  useEffect(() => {
    if (
      locationZustand &&
      (selectedKidAge || selectedTimeWeek || selectedKidAge2 || selectedTime2Week)
    ) {
      signupMutation(payload);
    }
  }, [
    locationZustand,
    selectedKidAge,
    selectedTimeWeek,
    selectedKidAge2,
    selectedTime2Week,
    signupMutation,
  ]);

  const updatedData = JSON.stringify(data?.data);

  const body = {
    amount: parseFloat(totalAmount?.replace('$', '')) ?? 0,
    email: emailZustand,
    description: updatedData,
    type: 'SERVICE',
  };

  const { mutate: paymentMutate } = useMutation(createPayment, {
    onSuccess: response => {
      setStripeData(response?.data);
    },
    onError: error => {
      console.error('API call failed:', error);
    },
  });

  const initializePaymentSheet = async () => {
    if (!stripeData) return;
    
    const { paymentIntent, customer, ephemeralKey, publishableKey } = stripeData;
    
    const { error } = await initPaymentSheet({
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

    const { error } = await presentPaymentSheet();
    if (error) {
      console.log('Error presenting payment sheet:', error);
      return;
    }

    // Handle the result of the payment
    const { error: confirmError } = await confirmPayment(stripeData.paymentIntent, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          name: 'Test User',
        },
      }
    });
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
      <View style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
        <ScrollView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Select Kid 1 age" style={{ color: Colors.WHITE }} />
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
                style={{ color: Colors.WHITE }}
              />
              <FaqsIcon style={{ marginHorizontal: Metrics.smallMargin }} />
            </ButtonView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Times/week" style={{ color: Colors.WHITE }} />
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
                style={{ color: Colors.WHITE }}
              />
              <FaqsIcon style={{ marginHorizontal: Metrics.smallMargin }} />
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
            <H6 text="Select Kid 2 age" style={{ color: Colors.WHITE }} />
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
                style={{ color: Colors.WHITE }}
              />
              <FaqsIcon style={{ marginHorizontal: Metrics.smallMargin }} />
            </ButtonView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Times/week" style={{ color: Colors.WHITE }} />
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
                style={{ color: Colors.WHITE }}
              />
              <FaqsIcon style={{ marginHorizontal: Metrics.smallMargin }} />
            </ButtonView>
          </View>
          {/* <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              width: '100%',
              backgroundColor: Colors.WHITE,
              borderWidth: 1,
              height: 2.1,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
            }}>
            <H6 text="Kids cost" style={{ color: Colors.WHITE }} />
            <H6 text="2x $00.00" style={{ color: Colors.WHITE }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: Metrics.verticalScale(16),
              marginBottom: Metrics.baseMargin,
            }}>
            <H6 text="Monthly Cost" style={{ color: Colors.WHITE }} />
            <H6 text="$00.00" style={{ color: Colors.WHITE }} />
          </View> */}
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
            title={'Select Times/Week'}
            handleDropOffPress={timeWeekModal.hide}
            modalData={getTimesPerWeek?.values}
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
            title={'Select Times/Week'}
            handleDropOffPress={time2WeekModal.hide}
            modalData={getTimesPerWeek?.values}
          />
        </ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            marginTop: 'auto',
            flexDirection: 'row',
            marginBottom: Metrics.verticalScale(20),
          }}>
          <View style={{ alignItems: 'center' }}>
            <H6 text="Total Amount" style={{ color: Colors.TEXT_COLOR }} />
            <H6
              text={`${totalAmount ?? '00.00'}`}
              style={{ color: Colors.WHITE }}
            />
          </View>
          {
            !isGuest && (
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
                style={{ ...Fonts.SemiBold(Fonts.Size.xSmall, Colors.BLACK) }}
              />
            </ButtonView>
            )
          }
      
        </View>
      </View>
    </StripeProvider>
  );
};

export default Academy;

const styles = StyleSheet.create({});
