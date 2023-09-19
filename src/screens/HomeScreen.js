import React from "react";
import { SliderBox } from "react-native-image-slider-box";

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categoryList, imageSlider } from "../../data/Data";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen-hooks";

const HomeScreen = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.mainContainer}>
      <SliderBox images={imageSlider} autoplay={true} circleLoop={true} sliderBoxHeight={hp('30%')} />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>
          Categories
        </Text>
      </View>
      <FlatList
        data={categoryList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.button}
                              onPress={() => navigation.navigate("ShowProduct", { categoryId: item.id })}>
              <Image source={{ uri: item.icon }} style={styles.icon} />
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        key={3}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  text: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: "black",
  },
  flatListContainer: {
    padding: 8,
  },
  button: {
    height: hp("17%"),
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: "#7CAF58",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: wp('20%'),
    height: hp('12%'),
    resizeMode: "contain",
  },
  itemName: {
    color: "black",
  },
});

export default HomeScreen;
