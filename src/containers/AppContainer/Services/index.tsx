import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@Theme/Colors';
import Header from '@Component/AppHeader';
import H6 from '@Component/Headings/H6';
import ButtonView from '@Component/ButtonView';
import Fonts from '@Theme/Fonts';
import Metrics from '@Utility/Metrics';
import {FaqsIcon} from '@Asset/logo';
import {useQuery} from '@tanstack/react-query';
import {getAcademyLocation, getLocation} from '@Api/App';
import {STORAGE_KEYS} from '@Constants/queryKeys';
import useModal from '@Hook/useModal';
import CustomSelectionModal from '@Component/CustomSelectionModal';
import HallofFameTabs from '@Component/HallofFameTabs';
import {onlyRentalTab, servicesTabs} from '@Constants/dummyData';
import ServiceModal from './ServiceModal';
import {setItem} from '@Service/storageService';
import {useBoundStore} from '@Store/index';
import EmailModal from './EmailModal';

const ServicesScreen = ({route}) => {
  const {isEmail,isGuest}=route?.params || {}
  
  const [selectedLocation, setSelectedLocation] = useState<string>(null);
  const locationModal = useModal();
  const emailModal = useModal();
  const [data,setData]=useState(null)
  const {data: getLocationList} = useQuery(
    [STORAGE_KEYS.GET_ACADEMY_LOCATION],
    getAcademyLocation,
    {cacheTime: 0, staleTime: 0},
  );

  const setLocationZustand = useBoundStore(
    (state: any) => state.setLocationZustand,
  );

  const onLocationSelect = (location: React.SetStateAction<string>) => {
    setSelectedLocation(location);
    setLocationZustand(location);
    locationModal.hide();
  };

  // useEffect(() => {
  //   if(!isEmail){
  //     emailModal.show();
  //   }
  // }, []);

  const onEmailSubmit = (email) => {
    setData(email)
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
      <Header title={'Services'} />
      <View
        style={{
          marginHorizontal: Metrics.scale(20),
          marginTop: Metrics.doubleBaseMargin,
          flex: 1,
        }}>
        <ButtonView
          onPress={() => locationModal.show()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: Colors.DARK_BLUE,
            padding: 12,
            borderRadius: 20,
            marginBottom: 20,
          }}>
          <H6
            text={selectedLocation ?? 'Select Location'}
            style={{color: Colors.WHITE}}
          />
          <FaqsIcon />
        </ButtonView>
        <HallofFameTabs component={servicesTabs} data={data} isGuest={isGuest}/>
      </View>

      {/* <View
        style={{
          justifyContent: 'space-between',
          marginTop: 'auto',
          flexDirection: 'row',
          marginHorizontal: Metrics.scale(20),
          marginBottom: Metrics.verticalScale(20),
        }}>
        <View style={{alignItems: 'center'}}>
          <H6 text="Total Amount" style={{color: Colors.TEXT_COLOR}} />
          <H6 text="$000.00" style={{color: Colors.WHITE}} />
        </View>
        <ButtonView
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
      </View> */}
      <ServiceModal
        isModalVisible={locationModal.isVisible}
        handleSelection={onLocationSelect}
        title={'Select Location'}
        handleDropOffPress={locationModal.hide}
        modalData={getLocationList?.values}
      />
      <EmailModal
        isModalVisible={emailModal.isVisible}
        handleSelection={onEmailSubmit}
        title={'Enter Your Email'}
        handleDropOffPress={emailModal.hide}
      />
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({});
