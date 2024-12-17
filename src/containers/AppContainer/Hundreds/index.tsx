import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@Theme/Colors'
import FlatListHandler from '@Component/FlatlistHandler';
import Metrics from '@Utility/Metrics';
import { useQuery } from '@tanstack/react-query';
import { STORAGE_KEYS } from '@Constants/queryKeys';
import { HallOfFame } from '@Api/App';
import useHallOfFameContainer from '@Component/HallofFameTabs/HallOfFameContainer';
import SpinnerLoader from '@Component/SmallLoader';


const numberOfEntries = 10; // Example number

// Define the default values for each field
const defaultPlayerData = {
    title: "Player Name",
    best: "0000",
    year: "0000"
};

// Create an array and fill it with the default player data
const playerDataArray = new Array(numberOfEntries).fill(defaultPlayerData);

const Hundreds = () => {
  const type="100_RUNS"
const {hallOfFameData,hallOfFameLoading}=useHallOfFameContainer(type)
  const renderItem = ({item}: any) => {
    
    return(
      <View style={styles.row}>
      <Text style={styles.cells}>
       {item?.Player_Name}
      </Text>
      <Text style={styles.cell}>{item?.Best}</Text>
      <Text style={styles.cell}>{item?.Year}</Text>
 
    </View>
    )
 
}

return (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: Colors.APP_BACKGROUND,
    }}>
    {hallOfFameLoading ? (
      <SpinnerLoader size={'large'} color={Colors.WHITE} />
    ) : (
      <View style={{flex: 1, backgroundColor: Colors.APP_BACKGROUND}}>
        <FlatListHandler
          data={hallOfFameData?.data}
          contentContainerStyle={{
            color: Colors.FAMILY_BACKGROUND,
            marginTop: 20,
          }}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.row}>
              <Text style={[styles.headings,{marginLeft:10}]}>Players</Text>
              <Text style={[styles.heading,{marginLeft:65}]}>Best</Text>
              <Text style={[styles.heading,{marginRight:15}]}>Year</Text>
            </View>
          )}
        />
      </View>
    )}
  </ScrollView>
);
}

export default Hundreds

const styles = StyleSheet.create({

  row:{
    flexDirection: 'row',
    flex:1,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    paddingVertical: 10,
    backgroundColor:Colors.FAMILY_BACKGROUND,
  },
  heading: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    color: Colors.DARK_BLUE,
    fontSize:12
  },
  headings:{
    fontWeight: 'bold',
    textAlign: 'right',
    color: Colors.DARK_BLUE,
    fontSize:12
  },
  cell: {
    flex: 1,
    textAlign: 'right',
    color: Colors.WHITE,
    height: '150%',
    fontSize:12,
    marginRight:10
  },
  cells: {
    flex: 1,
    // textAlign: 'center',
    marginLeft:10,
    color: Colors.ICE_BLUE,
    height: '150%',
    fontSize:12
  },
})