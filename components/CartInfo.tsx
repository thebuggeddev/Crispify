import { IMAGES } from "#/constants/images";
import { COLOR, FONT, SPACING } from "#/theme";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { HexagonRounded } from "./Hexagon";

const CartInfo = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        backgroundColor: COLOR.black,
        justifyContent: "space-between",
        alignItems: "center",
        padding: SPACING[7],
        gap: SPACING[7],
        flexDirection: "row",
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
      }}
    >
      <HexagonRounded
        width={70}
        height={170}
        color="#FFF"
        cornerRadius={12}
        style={{
          position: "absolute",
          top: -105,
          left: Dimensions.get("screen").width / 2 - 35,
          transform: [{ rotate: "90deg" }],
        }}
      >
        <View
          style={{
            position: "relative",
            left: 15,
            width: "70%",
            height: 5,
            borderRadius: 10,
            backgroundColor: COLOR.light[100],
            transform: [{ rotate: "90deg" }],
          }}
        />
      </HexagonRounded>

      <View
        style={{
          backgroundColor: COLOR.primary,
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.families.medium,
            color: COLOR.black,
            fontSize: FONT.sizes.lg,
          }}
        >
          2
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          gap: SPACING[1],
        }}
      >
        <Text
          style={{
            fontFamily: FONT.families.bold,
            fontSize: FONT.sizes["xl"],
            color: COLOR.white,
          }}
        >
          Cart
        </Text>
        <Text
          style={{
            fontFamily: FONT.families.regular,
            fontSize: FONT.sizes.sm,
            color: COLOR.light[200],
          }}
        >
          1 Item
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR.white,
          }}
        >
          <Image
            source={IMAGES.chip1}
            style={{
              width: "65%",
              height: "65%",
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR.white,
            marginLeft: -SPACING[7],
            zIndex: 1,
          }}
        >
          <Image
            source={IMAGES.chip2}
            style={{
              width: "65%",
              height: "65%",
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOR.white,
            marginLeft: -SPACING[7],
            zIndex: 1,
          }}
        >
          <Image
            source={IMAGES.chip4}
            style={{
              width: "65%",
              height: "65%",
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default CartInfo;

const styles = StyleSheet.create({});
