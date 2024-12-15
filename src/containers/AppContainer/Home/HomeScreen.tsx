import {
  EarnedSvg,
  ImageBackgroundPNG,
  MisRewardSvg,
  PerformanceButtonSvg,
  RedeemedSvg,
  SavedSvg,
  boy,
  girl,
} from '@Asset/logo';
import ButtonView from '@Component/ButtonView';
import FlatListHandler from '@Component/FlatlistHandler';
import H5 from '@Component/Headings/H5';
import H6 from '@Component/Headings/H6';
import H7 from '@Component/Headings/H7';
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
  View,
} from 'react-native';

import Header from '@Component/AppHeader';
import SpinnerLoader from '@Component/SmallLoader';
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
    parentData,
    summaryData,
  } = useHomeScreenContainer(PlayerID);
  const email = parentData?.map(elem => elem?.Email_id);
  const ParentName = parentData?.map(elem => elem?.Parent_Name);
  const saved_crt_yr = parentData?.map(elem => elem?.saved_crt_yr);
  const earned_crt_yr = parentData?.map(elem => elem?.earned_crt_yr);
  const Avlbl_Redeem = parentData?.map(elem => elem?.Avlbl_Redeem);
  const missed_rwds_crt_yr = parentData?.map(elem => elem?.missed_rwds_crt_yr);
  const lns_usg_crt_mth = parentData?.map(elem => elem?.lns_usg_crt_mth);

  const pndg_inv_amt = parentData?.map(elem => elem?.pndg_inv_amt);
  const packageUsage = summaryData?.data[0]?.['Pkg Hrs Balance'];
  console.log(
    getAllAnnouncements?.data.length,
    'getAllAnnouncements?.data?.[0]getAllAnnouncements?.data?.[0]',
  );
  const handlePressRegisterEvent = () => {
    if (getAllAnnouncements?.data?.[0]?.url_to_show)
      Linking.openURL(getAllAnnouncements?.data?.[0]?.url_to_show);
  };

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
          <Image source={item?.player_gender === 'Female' ? girl : boy} />
          <View style={{marginHorizontal: Metrics.baseMargin}}>
            <H5 text={item?.Player_Name} style={{color: Colors.WHITE}} />
            <View style={{flexDirection: 'row'}}>
              <H7 text="Total Runs: " style={{color: Colors.ICE_BLUE}} />
              <H7 text={item?.Runs} style={{color: Colors.WHITE}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <H7 text="Total Wickets: " style={{color: Colors.ICE_BLUE}} />
              <H7 text={item?.['Total Wkts']} style={{color: Colors.WHITE}} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <H7 text="Total Catches: " style={{color: Colors.ICE_BLUE}} />
              <H7
                text={item?.['Total Catches']}
                style={{color: Colors.WHITE}}
              />
            </View>
            <ButtonView
              onPress={() =>
                navigate(NavigationRoutes.APP_STACK.PERFORMANCE, {
                  playerData: item,
                })
              }
              style={{
                alignSelf: 'flex-end',
                marginTop: Metrics.verticalScale(-20),
                marginRight: -20,
              }}>
              <PerformanceButtonSvg />
            </ButtonView>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{backgroundColor: Colors.APP_BACKGROUND}}>
      <Header
        title="Home"
        backButton={false}
        subText={'Welcome Back'}
        desc={ParentName}
      />
      {getFamilyplayerDataLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.APP_BACKGROUND,
            justifyContent: 'center',
            marginTop: Metrics.verticalScale(250),
          }}>
          <SpinnerLoader size={'large'} color={Colors.WHITE} />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: Colors.APP_BACKGROUND,
            flex: 1,
            paddingHorizontal: Metrics.scale(20),
            paddingTop: Metrics.doubleBaseMargin,
          }}>
          <H6
            text="Players in the family/group"
            style={{color: Colors.TEXT_COLOR}}
          />
          <View>
            <FlatListHandler
              renderItem={renderItem}
              data={getFamilyplayerData?.data || {}}
              keyExtractor={item => item?.id}
              horizontal
            />
          </View>
          <View style={{marginTop: Metrics.baseMargin}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <H6 text="This year you" style={{color: Colors.TEXT_COLOR}} />
              <ButtonView
                onPress={() =>
                  navigate(NavigationRoutes.APP_STACK.ACTIVITY, {
                    getFamilyplayerData,
                    earned_crt_yr,
                    missed_rwds_crt_yr,
                  })
                }>
                <H7
                  text="Show full activity"
                  style={{
                    ...Fonts.SemiBold(Fonts.Size.xxxSmall, Colors.WHITE),
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.WHITE,
                  }}
                />
              </ButtonView>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  // width:"22%",

                  flex: 1,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <SavedSvg />
                    <H6 text={saved_crt_yr} style={{color: Colors.WHITE}} />
                    <H7
                      text="Saved"
                      style={{color: Colors.WHITE, textAlign: 'center'}}
                    />
                  </View>
                  <View style={{marginHorizontal: 10}} />
                  <View style={{alignItems: 'center'}}>
                    <EarnedSvg />
                    <H6 text={earned_crt_yr} style={{color: Colors.WHITE}} />
                    <H7
                      text="Earned"
                      style={{color: Colors.WHITE, textAlign: 'center'}}
                    />
                  </View>
                </View>

                <H7
                  text="Savings"
                  style={{
                    color: Colors.ICE_BLUE,
                    textAlign: 'center',
                    marginTop: Metrics.smallMargin,
                  }}
                />
              </View>
              {/* <View
        style={{
          alignItems: 'center',
          marginTop: Metrics.baseMargin,
          padding: Metrics.baseMargin,
          borderWidth: 1,
          borderColor: Colors.ICE_BLUE,
          marginHorizontal: Metrics.smallMargin,
          borderRadius: 10,
          paddingVertical: Metrics.doubleBaseMargin,
          width:"22%",
          justifyContent:'center'
        }}>
        <View><EarnedSvg /></View>
        <H6 text={earned_crt_yr} style={{color: Colors.WHITE}} />
        <H7 text='Earned' style={{color: Colors.ICE_BLUE,textAlign:'center'}} />
      </View> */}
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
                  // width:"22%",
                  justifyContent: 'center',
                }}>
                <View>
                  <RedeemedSvg />
                </View>
                <H6 text={Avlbl_Redeem} style={{color: Colors.WHITE}} />
                <H7
                  text="To Redeem"
                  style={{color: Colors.ICE_BLUE, textAlign: 'center'}}
                />
              </View>
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
                  // width:"22%",
                  justifyContent: 'center',
                }}>
                <View>
                  <MisRewardSvg />
                </View>
                <H6 text={missed_rwds_crt_yr} style={{color: Colors.WHITE}} />
                <H7
                  text="Mis Rwds"
                  style={{color: Colors.ICE_BLUE, textAlign: 'center'}}
                />
              </View>
            </View>
          </View>
          {/* <ButtonView onPress={() => navigate(NavigationRoutes.APP_STACK.HALL_OF_FAME)}>
        <ImageBackground
          
            source={HallOfFame}
            resizeMode="cover"
            style={{height: 120, marginTop: Metrics.doubleBaseMargin,padding:Metrics.baseMargin}}>
                <H4 text="HALL OF FAME" style={{color: Colors.WHITE}}/>
                <H7 text="Best Players" style={{ ...Fonts.Medium(Fonts.Size.xxxxSmall, Colors.ICE_BLUE),marginTop:Metrics.smallMargin}} />
               <View style={{flexDirection:'row',alignItems:'center',}}>
               <H7 text="Player Name Here" style={{ ...Fonts.Regular(11, Colors.WHITE),}}/>
                <Runs style={{marginLeft:Metrics.scale(6)}}/>
                <H7 text=" 102 Runs" style={{ ...Fonts.Regular(11, Colors.WHITE)}}/>
               </View>
               <View style={{flexDirection:'row',alignItems:'center',}}>
               <H7 text="Player Name Here" style={{ ...Fonts.Regular(11, Colors.WHITE),}}/>
                <Wickets style={{marginLeft:Metrics.scale(6)}}/>
                <H7 text=" 06 Wickets" style={{ ...Fonts.Regular(11, Colors.WHITE)}}/>
               </View>
           </ImageBackground>
        </ButtonView> */}

          <View>
            <ScrollView
              horizontal
              style={{
                flexDirection: 'row',
                marginTop: Metrics.baseMargin,
                marginBottom: Metrics.baseMargin,
              }}>
              <View style={{marginTop: Metrics.baseMargin}}>
                <H6 text="This month you" style={{color: Colors.TEXT_COLOR}} />
                <View
                  style={{
                    backgroundColor: Colors.FAMILY_BACKGROUND,
                    padding: Metrics.baseMargin,
                    borderRadius: 10,
                    marginTop: Metrics.baseMargin,
                  }}>
                  <H6 text="Package Usage" style={{color: Colors.WHITE}} />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Metrics.smallMargin,
                    }}>
                    <H7 text={packageUsage} style={{color: Colors.ICE_BLUE}} />
                    <H7 text=" Hours" style={{color: Colors.WHITE}} />
                  </View>
                  <H5
                    text={lns_usg_crt_mth ? `${lns_usg_crt_mth}` : '$0'}
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
                  <View style={{flexDirection: 'row'}}>
                    <H6
                      text="Pending Payment"
                      style={{
                        color: Colors.WHITE,
                        marginRight: Metrics.baseMargin,
                      }}
                    />
                    <ButtonView
                      onPress={() =>
                        navigate(NavigationRoutes.APP_STACK.PAYMENT_PENDING, {
                          email,
                        })
                      }>
                      <PerformanceButtonSvg />
                    </ButtonView>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Metrics.smallMargin,
                    }}>
                    <H7 text="" style={{color: Colors.ICE_BLUE}} />
                    <H7 text="" style={{color: Colors.WHITE}} />
                  </View>
                  <H5
                    text={pndg_inv_amt ? `${pndg_inv_amt}` : '$0'}
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <H6 text="Announcements" style={{color: Colors.TEXT_COLOR}} />
              {getAllAnnouncements?.data?.length > 0 && (
                <ButtonView
                  onPress={() =>
                    navigate(NavigationRoutes.APP_STACK.ANNOUNCEMENT)
                  }>
                  <H7
                    text="See All"
                    style={{
                      ...Fonts.SemiBold(Fonts.Size.xxxSmall, Colors.WHITE),
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.WHITE,
                    }}
                  />
                </ButtonView>
              )}
            </View>

            <ImageBackground
              source={ImageBackgroundPNG}
              resizeMode="cover"
              style={{
                height: 100,
                marginTop: Metrics.baseMargin,
                padding: Metrics.baseMargin,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <H5
                  style={{color: Colors.WHITE}}
                  text={getAllAnnouncements?.data?.[0]?.Announcement}
                />
                <ButtonView
                  disabled={getAllAnnouncements?.data.length === 0}
                  onPress={() => handlePressRegisterEvent()}
                  style={{
                    backgroundColor: Colors.ICE_BLUE,
                    paddingHorizontal: Metrics.smallMargin,
                    paddingVertical: Metrics.baseMargin,
                    borderRadius: 10,
                  }}>
                  <H6
                    style={{color: Colors.BUTTON_LIGHT_GREY}}
                    text="Register Now"
                  />
                </ButtonView>
              </View>

              <View
                style={{flexDirection: 'row', marginTop: Metrics.baseMargin}}>
                <H7
                  text={getAllAnnouncements?.data?.[0]?.Details}
                  style={{color: Colors.ICE_BLUE}}
                />
                {/* <H7 text="20 Feb, 2024" style={{color: Colors.WHITE,}} /> */}
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
    </ScrollView>
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
