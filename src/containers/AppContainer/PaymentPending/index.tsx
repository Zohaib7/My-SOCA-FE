import {createPayment, pendingPayments} from '@Api/App';
import Header from '@Component/AppHeader';
import ButtonView from '@Component/ButtonView';
import FlatListHandler from '@Component/FlatlistHandler';
import H6 from '@Component/Headings/H6';
import H7 from '@Component/Headings/H7';
import {STORAGE_KEYS} from '@Constants/queryKeys';
import {Colors} from '@Theme/Colors';
import Fonts from '@Theme/Fonts';
import Metrics from '@Utility/Metrics';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const numberOfEntries = 10; // Example number

// Define the default values for each field
const defaultPlayerData = {
  title: '00/00',
  best: '$00.00',
  year: 'View',
};

// Create an array and fill it with the default player data
const playerDataArray = new Array(numberOfEntries).fill(defaultPlayerData);

const PaymentPending = ({route}) => {
  const [stripeData, setStripeData] = useState<any>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  const email = route?.params?.email[0];

  const {data: pendingPayment} = useQuery(
    [STORAGE_KEYS.PENDING_PAYMENTS],
    () => pendingPayments({email}),
    {cacheTime: 0, staleTime: 0},
  );

  const updatedData = JSON.stringify(pendingPayment);

  const body = {
    amount: pendingPayment?.totalAmount ?? 0,
    email: email,
    description: updatedData,
    type: 'PENDING',
  };

  const {mutate: paymentMutate} = useMutation(createPayment, {
    onSuccess: response => {
      setStripeData(response?.data);
    },
    onError: error => {
      console.error('API call failed:', error);
    },
  });
console.log(stripeData,'stripeDatastripeDatastripeData');

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
    const initializeAndOpenSheet = async () => {
      await initializePaymentSheet(); // Initialize the payment sheet
      await openPaymentSheet(); // Open the sheet only after initialization
    };
  
    if (stripeData) {
      initializeAndOpenSheet();
    }
  }, [stripeData]);
  

  const onOpenSheet = async () => {
    paymentMutate(body); // Start the mutation to get Stripe data
  };
  

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <Text style={[styles.cell]}>{item?.Due_Date}</Text>
      <Text style={styles.cell}>{`$${item?.Amount}`}</Text>

      {/* <ButtonView style={styles.btnCell}>
        <H7
          text={item?.year}
          style={{
            alignSelf: 'center',
            color: Colors.WHITE,
            paddingVertical: 5,
            paddingHorizontal: -5,
          }}
        />
      </ButtonView> */}
    </View>
  );
  return (
    <StripeProvider publishableKey={stripeData?.publishableKey || ''}>
    <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
      <Header title="Payments Pending" />
      <View style={styles.playerWrapper}>
        <FlatListHandler
          data={pendingPayment?.pendingPayments}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Text style={styles.heading}>Due Date</Text>
              <Text style={styles.heading}>Amount</Text>
              {/* <Text style={styles.heading}>Notes</Text> */}
            </View>
          )}
        />
      </View>
      {pendingPayment?.pendingPayments?.length > 0 && (
            <View
            style={{
              justifyContent: 'space-between',
              marginTop: 'auto',
              flexDirection: 'row',
              marginHorizontal: Metrics.scale(20),
              marginBottom: Metrics.verticalScale(20),
            }}>
            <View style={{alignItems: 'center'}}>
              <H6 text="Total Amount" style={{color: Colors.TEXT_COLOR}} />
              <H6
                text={`$${pendingPayment?.totalAmount}` ?? '$000.00'}
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
                text="Pay Now"
                style={{...Fonts.SemiBold(Fonts.Size.xSmall, Colors.BLACK)}}
              />
            </ButtonView>
          </View>
      )}
  
    </View>
    </StripeProvider>
  );
};

export default PaymentPending;

const styles = StyleSheet.create({
  playerWrapper: {
    backgroundColor: Colors.FAMILY_BACKGROUND,
    paddingHorizontal: Metrics.scale(13),
    paddingVertical: Metrics.scale(16),
    borderRadius: 16,
    marginHorizontal: Metrics.scale(20),
    marginTop: Metrics.doubleBaseMargin,
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    paddingVertical: 10,
  },
  heading: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.DARK_BLUE,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: Colors.WHITE,
    height: '150%',
  },
  btnCell: {
    flex: 1,
    marginTop: -5,
    textAlign: 'center',
    color: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.DARK_BLUE,
    backgroundColor: Colors.APP_BACKGROUND,
  },
});
