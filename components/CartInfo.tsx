import { IMAGES } from "#/constants/images";
import { COLOR, FONT, SPACING } from "#/theme";
import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HexagonRounded } from "./Hexagon";

interface CartItem {
  id: string;
  image: ImageSourcePropType;
  name: string;
}

interface CartInfoProps {
  itemCount?: number;
  items?: CartItem[];
  maxVisibleImages?: number;
  cartTitle?: string;
  itemText?: string;
}

const CartInfo: React.FC<CartInfoProps> = ({
  itemCount = 2,
  items = [
    { id: "1", image: IMAGES.chip1, name: "Chip 1" },
    { id: "2", image: IMAGES.chip2, name: "Chip 2" },
    { id: "3", image: IMAGES.chip4, name: "Chip 4" },
  ],
  maxVisibleImages = 3,
  cartTitle = "Cart",
  itemText = "1 Item",
}) => {
  const visibleItems = items.slice(0, maxVisibleImages);
  const hasMoreItems = items.length > maxVisibleImages;
  const extraItemsCount = items.length - maxVisibleImages;

  const renderCartImage = (item: CartItem, index: number) => {
    const isFirst = index === 0;

    return (
      <View
        key={item.id}
        style={[
          styles.cartImageContainer,
          !isFirst && styles.cartImageOverlapped,
        ]}
      >
        <Image
          source={item.image}
          style={styles.cartImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderMoreItemsIndicator = () => {
    if (!hasMoreItems) return null;

    return (
      <View
        style={[
          styles.cartImageContainer,
          styles.cartImageOverlapped,
          styles.moreItemsContainer,
        ]}
      >
        <Text style={styles.moreItemsText}>+{extraItemsCount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HexagonRounded
        width={70}
        height={170}
        color="#FFF"
        cornerRadius={12}
        style={styles.handleContainer}
      >
        <View style={styles.handle} />
      </HexagonRounded>

      <View style={styles.itemCountBadge}>
        <Text style={styles.itemCountText}>{itemCount}</Text>
      </View>

      <View style={styles.cartInfoSection}>
        <Text style={styles.cartTitle}>{cartTitle}</Text>
        <Text style={styles.itemText}>{itemText}</Text>
      </View>

      <View style={styles.cartImagesContainer}>
        {visibleItems.map((item, index) => renderCartImage(item, index))}
        {renderMoreItemsIndicator()}
      </View>
    </View>
  );
};

export default CartInfo;

const styles = StyleSheet.create({
  // Main container
  container: {
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
  },

  // Handle/drag indicator
  handleContainer: {
    position: "absolute",
    top: -105,
    left: Dimensions.get("screen").width / 2 - 35,
    transform: [{ rotate: "90deg" }],
  },
  handle: {
    position: "relative",
    left: 15,
    width: "70%",
    height: 5,
    borderRadius: 10,
    backgroundColor: COLOR.light[100],
    transform: [{ rotate: "90deg" }],
  },

  // Item count badge
  itemCountBadge: {
    backgroundColor: COLOR.primary,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  itemCountText: {
    fontFamily: FONT.families.medium,
    color: COLOR.black,
    fontSize: FONT.sizes.lg,
  },

  // Cart info section
  cartInfoSection: {
    flex: 1,
    gap: SPACING[1],
  },
  cartTitle: {
    fontFamily: FONT.families.bold,
    fontSize: FONT.sizes.xl,
    color: COLOR.white,
  },
  itemText: {
    fontFamily: FONT.families.regular,
    fontSize: FONT.sizes.sm,
    color: COLOR.light[200],
  },

  // Cart images section
  cartImagesContainer: {
    flexDirection: "row",
  },
  cartImageContainer: {
    width: 58,
    height: 58,
    borderRadius: 34, // 100% equivalent
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.white,
  },
  cartImageOverlapped: {
    marginLeft: -SPACING[5],
    zIndex: 1,
  },
  cartImage: {
    width: "65%",
    height: "65%",
  },

  // More items indicator
  moreItemsContainer: {
    backgroundColor: COLOR.light[100],
    borderWidth: 2,
    borderColor: COLOR.white,
  },
  moreItemsText: {
    fontFamily: FONT.families.medium,
    fontSize: FONT.sizes.sm,
    color: COLOR.black,
  },
});
