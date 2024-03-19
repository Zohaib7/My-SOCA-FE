import {
  ImageBackgroundPNG,
  PerformanceButtonSvg,
  boy
} from '@Asset/logo';
import ButtonView from '@Component/ButtonView';
import FlatListHandler from '@Component/FlatlistHandler';
import H5 from '@Component/Headings/H5';
import H6 from '@Component/Headings/H6';
import H7 from '@Component/Headings/H7';
import {
  yearData
} from '@Constants/dummyData';
import { Colors } from '@Theme/Colors';
import Fonts from '@Theme/Fonts';
import Metrics from '@Utility/Metrics';
import React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import Header from '@Component/AppHeader';
import NavigationRoutes from '@Navigator/NavigationRoutes';
import { navigate } from '@Service/navigationService';
import useHomeScreenContainer from './HomeScreenContainer';

const HomeScreen = ({route}) => {
  const {player_reg_no: PlayerID, Player_Name} = route?.params?.item || {};

  const {
    playerData, 
    playerLoading,
    getFamilyplayerData,
    getFamilyplayerDataLoading,
    getAllAnnouncements,
    getAllAnnouncementsLoading,
    parentData
  } = useHomeScreenContainer(PlayerID);
const ParentName=parentData?.map((elem)=>elem?.Parent_Name)
console.log(getFamilyplayerData?.data[0]?.player_reg_no,'getFamilyplayerDatagetFamilyplayerDatagetFamilyplayerData');
  const {saved_crt_yr,earned_crt_yr,Avlbl_Redeem,missed_rwds_crt_yr}=parentData||{}
  console.log(getAllAnnouncements, "getAllAnnouncementsgetAllAnnouncementsgetAllAnnouncements")

  const {Tier, RewardPoints, Months, Attendance, Amount, CashRewards} =
    playerData?.data || {};

  const renderYearItem = ({item}: any) => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: Metrics.baseMargin,
          padding: Metrics.baseMargin,
          borderWidth: 1,
          borderColor: Colors.ICE_BLUE,
          marginHorizontal: Metrics.smallMargin,
          borderRadius: 10,
          paddingVertical: Metrics.doubleBaseMargin,
        }}>
        <View>{item?.svg}</View>
        <H6 text={item?.cash} style={{color: Colors.WHITE}} />
        <H7 text={item?.label} style={{color: Colors.ICE_BLUE}} />
      </View>
    );
  };

const handlePressRegisterEvent = () => {
  Linking.openURL(getAllAnnouncements?.data?.[0]?.url_to_show)
}

  const renderItem = ({item}: any) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            padding: Metrics.baseMargin,
            backgroundColor: Colors.FAMILY_BACKGROUND,
            marginRight: Metrics.baseMargin,
            borderRadius: 10,
            marginTop: Metrics.baseMargin,
          }}>
          <Image source={boy} />
          <View style={{marginHorizontal: Metrics.baseMargin}}>
            <H5 text={item?.Player_Name} style={{color: Colors.WHITE}} />
            <View style={{flexDirection: 'row'}}>
              <H7 text="Championships " style={{color: Colors.ICE_BLUE}} />
              <H7 text={"02"} style={{color: Colors.WHITE}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <H7 text="Leagues " style={{color: Colors.ICE_BLUE}} />
              <H7 text={"15"} style={{color: Colors.WHITE}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <H7 text="Tourneys " style={{color: Colors.ICE_BLUE}} />
              <H7 text={"22"} style={{color: Colors.WHITE}} />
            </View>
            <ButtonView
            onPress={()=>navigate(NavigationRoutes.APP_STACK.PERFORMANCE,{playerData: item})}
              style={{
                alignSelf: 'flex-end',
                marginTop: Metrics.verticalScale(-20),
              }}>
              <PerformanceButtonSvg />
            </ButtonView>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView>
      <Header
        title="Home"
        backButton={false}
        subText={'Welcome Back'}
        desc={ParentName}
      />
      <View
        style={{
          backgroundColor: Colors.APP_BACKGROUND,
          flex: 1,
          paddingHorizontal: Metrics.scale(20),
          paddingTop: Metrics.doubleBaseMargin,
        }}>
        <H6 text="Players in the family" style={{color: Colors.TEXT_COLOR}} />
        <View>
          <FlatListHandler
            renderItem={renderItem}
            data={getFamilyplayerData?.data || {}}
            keyExtractor={item => item?.id}
            horizontal
          />
        </View>
        <View style={{marginTop: Metrics.baseMargin}}>
          <View style={{flexDirection:"row",justifyContent:'space-between'}}>
          <H6 text="This year you" style={{color: Colors.TEXT_COLOR}} />
     <ButtonView onPress={()=>navigate(NavigationRoutes.APP_STACK.ACTIVITY)}>

          <H7 text='Show full activity' style={{...Fonts.SemiBold(Fonts.Size.xxxSmall, Colors.WHITE),
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE}}/>
     </ButtonView>
          </View>

          <FlatListHandler
            renderItem={renderYearItem}
            data={yearData}
            keyExtractor={item => item?.id}
            horizontal
          />
     
        </View>
        <View>
          <ScrollView horizontal style={{flexDirection: 'row'}}>
            <View style={{marginTop: Metrics.baseMargin}}>
              <H6 text="This month you" style={{color: Colors.TEXT_COLOR}} />
              <View
                style={{
                  backgroundColor: Colors.FAMILY_BACKGROUND,
                  padding: Metrics.baseMargin,
                  borderRadius: 10,
                  marginTop: Metrics.baseMargin,
                }}>
                <H6 text="Lane Usage" style={{color: Colors.WHITE}} />
                <View style={{flexDirection: 'row'}}>
                  <H7
                    text="for the month of: "
                    style={{color: Colors.ICE_BLUE}}
                  />
                  <H7 text="Feb, 2024" style={{color: Colors.WHITE}} />
                </View>
                <H5
                  text="300.00"
                  style={{
                    color: Colors.WHITE,
                    marginTop: Metrics.doubleBaseMargin,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: Metrics.baseMargin,
                marginHorizontal: Metrics.baseMargin,
              }}>
              <H6 text="Pending Items" style={{color: Colors.TEXT_COLOR}} />
              <View
                style={{
                  backgroundColor: Colors.FAMILY_BACKGROUND,
                  padding: Metrics.baseMargin,
                  borderRadius: 10,
                  marginTop: Metrics.baseMargin,
                }}>
                <H6 text="Lane Usage" style={{color: Colors.WHITE}} />
                <View style={{flexDirection: 'row'}}>
                  <H7
                    text="for the month of: "
                    style={{color: Colors.ICE_BLUE}}
                  />
                  <H7 text="Feb, 2024" style={{color: Colors.WHITE}} />
                </View>
                <H5
                  text="300.00"
                  style={{
                    color: Colors.WHITE,
                    marginTop: Metrics.doubleBaseMargin,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            marginTop: Metrics.baseMargin,
            marginBottom: Metrics.baseMargin,
          }}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              
         
       <H6 text="Announcements" style={{color: Colors.TEXT_COLOR}} />
       <ButtonView onPress={()=>navigate(NavigationRoutes.APP_STACK.ANNOUNCEMENT)}>
        <H7 text='See All' style={{   ...Fonts.SemiBold(Fonts.Size.xxxSmall, Colors.WHITE),
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE}}/>
      </ButtonView>
            </View>
   
          <ImageBackground
            source={ImageBackgroundPNG}
            resizeMode="cover"
            style={{height: 100, marginTop: Metrics.baseMargin,padding:Metrics.baseMargin}}>
           <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
           <H5
            style={{color: Colors.WHITE}}
              text={getAllAnnouncements?.data?.[0]?.Announcement}
            />
            <ButtonView 
            onPress={() => handlePressRegisterEvent()}
            style={{backgroundColor:Colors.ICE_BLUE,paddingHorizontal:Metrics.smallMargin,paddingVertical:Metrics.baseMargin,borderRadius:10}}>
            <H6
            style={{color: Colors.BUTTON_LIGHT_GREY}}
              text="Register Now"
          />
            </ButtonView>
           </View>

             <View style={{flexDirection: 'row',marginTop:Metrics.baseMargin}}>
                  <H7
                    text={getAllAnnouncements?.data?.[0]?.Details}
                    style={{color: Colors.ICE_BLUE,}}
                  />
                  {/* <H7 text="20 Feb, 2024" style={{color: Colors.WHITE,}} /> */}
                </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
    // <SafeAreaView>
    //   <LinearGradient
    //     colors={['#09203F', '#537895']}
    //     start={{x: 0, y: 0}}
    //     end={{x: 1, y: 0}}
    //     style={{
    //       backgroundColor: '#374051',
    //       alignItems: 'center',
    //       // paddingBottom: Metrics.scale(20),
    //       paddingTop: Metrics.verticalScale(30),
    //       // height: '75%',
    //       // borderBottomLeftRadius: Metrics.scale(30),
    //       // borderBottomRightRadius: Metrics.scale(30),
    //     }}>
    //     <Image
    //       source={SOCAPng}
    //       style={{
    //         height: 80,
    //         width: 80,
    //         marginBottom: Metrics.verticalScale(5),
    //       }}
    //     />

    //     {playerLoading ? (
    //       <SpinnerLoader size={'large'} />
    //     ) : (
    //       <>
    //         <H2
    //           text={`${Player_Name}`}
    //           style={{
    //             // ...Fonts.SemiBold(Fonts.Size.medium, Colors.WHITE),
    //             alignSelf: 'flex-start',
    //             color: Colors.WHITE,
    //             marginHorizontal: Metrics.scale(20),
    //             marginTop: Metrics.verticalScale(20),
    //           }}
    //         />
    //         <H2
    //           text={`${Tier}`}
    //           style={{
    //             // ...Fonts.SemiBold(Fonts.Size.medium, Colors.WHITE),
    //             alignSelf: 'flex-start',
    //             color: Colors.WHITE,
    //             marginHorizontal: Metrics.scale(20),
    //           }}
    //         />

    //         <View
    //           style={{
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             marginTop: Metrics.verticalScale(10),
    //           }}>
    //           <SemiCircleProgress
    //             progress={Months}
    //             strokeWidth={5}
    //             radius={100}
    //           />
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             marginTop: Metrics.verticalScale(40),
    //             justifyContent: 'space-between',
    //             width: '100%',
    //             paddingHorizontal: 15,
    //           }}>
    //           <View>
    //             <H5
    //               text={`TOTAL POINTS`}
    //               style={{
    //                 color: 'white',
    //               }}
    //             />

    //             <H2
    //               text={`${RewardPoints}`}
    //               style={{
    //                 color: Colors.WHITE,
    //                 alignSelf: 'center',
    //               }}
    //             />
    //           </View>
    //           <View>
    //             <View style={{alignSelf: 'flex-end'}}>
    //               <H5
    //                 text={`CASH REWARDS`}
    //                 style={{
    //                   color: 'white',
    //                 }}
    //               />

    //               <H2
    //                 text={`${CashRewards}`}
    //                 style={{
    //                   color: Colors.WHITE,
    //                   alignSelf: 'center',
    //                 }}
    //               />
    //             </View>
    //             <ButtonView
    //               onPress={() =>
    //                 navigate(NavigationRoutes.APP_STACK.ACTIVITY, {
    //                   PlayerID,
    //                   RewardPoints,
    //                   Months,
    //                 })
    //               }
    //               style={{
    //                 flexDirection: 'row',
    //                 alignItems: 'center',
    //                 alignSelf: 'flex-end',
    //                 marginRight: Metrics.scale(-15),
    //                 // marginTop: Metrics.baseMargin,
    //                 marginBottom: Metrics.baseMargin,
    //               }}>
    //               <H5
    //                 text={`Account Activity`}
    //                 style={{
    //                   color: 'white',
    //                 }}
    //               />
    //               <ChevronSvg style={{marginHorizontal: Metrics.smallMargin}} />
    //             </ButtonView>
    //           </View>
    //         </View>
    //         <Image
    //           source={HomeJpeg}
    //           resizeMode="stretch"
    //           style={{height: 200, width: '100%'}}
    //         />
    //       </>
    //     )}
    //   </LinearGradient>
    // </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    paddingVertical: 20,
    padding: 20,
    // borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomLeftRadius: Metrics.scale(20),
    borderBottomRightRadius: Metrics.scale(20),
  },
  gradientContainers: {
    width: '100%',
    padding: 40,
    paddingVertical: Metrics.verticalScale(50),
    // borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  container: {
    marginTop: Metrics.verticalScale(60),
    alignItems: 'center',
    flex: 1,
    // marginHorizontal: Metrics.scale(20),
  },
  buttonWrapper: {
    width: '45%',
    paddingVertical: 20,
    marginHorizontal: Metrics.baseMargin,
    padding: 20,
    alignItems: 'center',
    // alignSelf: 'center',
    // borderRadius: 30,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
});
