import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@Theme/Colors';
import H6 from '@Component/Headings/H6';
import Metrics from '@Utility/Metrics';
import {FaqsIcon} from '@Asset/logo';
import ButtonView from '@Component/ButtonView';
import Fonts from '@Theme/Fonts';
import useRentalContainer from './rentalContainer';
import ServiceModal from '../../ServiceModal';
import useModal from '@Hook/useModal';
import {useBoundStore} from '@Store/index';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {useMutation} from '@tanstack/react-query';
import {createPayment} from '@Api/App';
import EmailModal from '../../EmailModal';

const Rentals = ({route}) => {
  const {isGuest} = route?.params || {};
  const locationZustand = useBoundStore((state: any) => state.locationZustand);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [selectedHours, setSelectedHours] = useState<any>(null);
  const [data, setData] = useState(null);
  const [stripeData, setStripeData] = useState<any>();
  const gameModal = useModal();
  const hoursModal = useModal();
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const [loading, setLoading] = useState<boolean>(false);
  const {getGamesData, getHoursData, rentalData} = useRentalContainer(
    locationZustand,
    selectedGame,
    selectedHours,
  );

  const onHoursSelection = (hour: React.SetStateAction<string>) => {
    setSelectedHours(hour);
    hoursModal.hide();
  };
  const onEmailSubmit = email => {
    setData(email);
  };

  const onSelectedGame = (game: React.SetStateAction<string>) => {
    setSelectedGame(game);
    gameModal.hide();
  };
  const emailZustand = useBoundStore((state: any) => state.emailZustand);
  const updatedData = JSON.stringify(rentalData?.data);

  const body = {
    amount: parseFloat(rentalData?.data?.Price?.replace('$', '')) ?? 0,
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
  const emailModal = useModal();
  useEffect(() => {
    if (stripeData) {
      (async () => {
        await initializePaymentSheet();
        openPaymentSheet();
      })();
    }
  }, [stripeData]);

  const onOpenSheet = () => {
    if (isGuest && !emailZustand) {
      emailModal.show();
      return;
    }
  
    paymentMutate(body);
  };

  return (
    <StripeProvider publishableKey={stripeData?.publishableKey || ''}>
      <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: Metrics.verticalScale(16),
          }}>
          <H6 text="Type of Lane" style={{color: Colors.WHITE}} />
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
              gameModal.show();
            }}>
            <H6
              text={selectedGame ?? 'Select Lane'}
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
          <H6 text="No of Hours" style={{color: Colors.WHITE}} />
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
              hoursModal.show();
            }}>
            <H6
              text={selectedHours ?? 'Select'}
              style={{color: Colors.WHITE}}
            />
            <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
          </ButtonView>
        </View>
{
  emailZustand && isGuest &&
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: Metrics.verticalScale(16),
        }}>
        <H6 text={emailZustand} style={{color: Colors.WHITE}} />
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
            emailModal.show();
          }}>
          <H6
            text={'Edit'}
            style={{color: Colors.WHITE}}
          />
          <FaqsIcon style={{marginHorizontal: Metrics.smallMargin}} />
        </ButtonView>
      </View>
}


        {/* <View
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
        <H6 text="Rental cost" style={{color: Colors.WHITE}} />
        <H6 text="2hrs x $00.00" style={{color: Colors.WHITE}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: Metrics.verticalScale(16),
        }}>
        <H6 text="Monthly Cost" style={{color: Colors.WHITE}} />
        <H6 text="$00.00" style={{color: Colors.WHITE}} />
      </View> */}
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
              text={rentalData?.data?.Price ?? '00.00'}
              style={{color: Colors.WHITE}}
            />
          </View>
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
              text={emailZustand === null ? 'Enter email' : 'Avail Now'}
              style={{...Fonts.SemiBold(Fonts.Size.xSmall, Colors.BLACK)}}
            />
          </ButtonView>
        </View>
        <ServiceModal
          isModalVisible={gameModal.isVisible}
          handleSelection={onSelectedGame}
          title={'Select Lane'}
          handleDropOffPress={gameModal.hide}
          modalData={getGamesData?.values}
        />
        <ServiceModal
          isModalVisible={hoursModal.isVisible}
          handleSelection={onHoursSelection}
          title={'No Of Hours'}
          handleDropOffPress={hoursModal.hide}
          modalData={getHoursData?.values}
        />
      </View>
      <EmailModal
        isModalVisible={emailModal.isVisible}
        handleSelection={onEmailSubmit}
        title={'Enter Your Email'}
        handleDropOffPress={emailModal.hide}
        email={emailZustand}
      />
    </StripeProvider>
  );
};

export default Rentals;

const styles = StyleSheet.create({});
