import { SnackItem } from "#/data/snacks";
import { COLOR, FONT, RADIUS, SHADOW, SPACING } from "#/theme";
import { BlurView } from "expo-blur";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const CARD_WIDTH = 336;
const CARD_SPACING = 16;

interface SnackCardProps {
  item: SnackItem;
  index: number;
  scrollX: SharedValue<number>;
  onPress?: (item: SnackItem) => void;
}

export default function SnackCard({
  item,
  index,
  scrollX,
  onPress,
}: SnackCardProps) {
  const handlePress = () => {
    onPress?.(item);
  };

  // Calculate the input range for this card
  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_SPACING),
    index * (CARD_WIDTH + CARD_SPACING),
    (index + 1) * (CARD_WIDTH + CARD_SPACING),
  ];

  // Animated style for the card container
  const animatedStyle = useAnimatedStyle(() => {
    // Rotation animation - cards start tilted and straighten when centered
    const rotation = interpolate(
      scrollX.value,
      inputRange,
      [index === 0 ? 0 : -15, 0, 15], // First card doesn't tilt initially
      Extrapolation.CLAMP
    );

    // Scale animation - cards scale up slightly when centered
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.95, 1, 0.95],
      Extrapolation.CLAMP
    );

    // Translation animation for overlapping effect
    const translateX = interpolate(
      scrollX.value,
      inputRange,
      [index === 0 ? 0 : -60, 0, -60], // First card doesn't translate initially
      Extrapolation.CLAMP
    );

    // Z-index effect using elevation simulation
    const elevation = interpolate(
      scrollX.value,
      inputRange,
      [1, 5, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: withSpring(translateX, { damping: 20, stiffness: 90 }) },
        { scale: withSpring(scale, { damping: 15, stiffness: 100 }) },
        {
          rotateZ: withSpring(`${rotation}deg`, {
            damping: 105,
            stiffness: 80,
          }),
        },
      ],
      elevation,
      zIndex: Math.round(elevation),
    };
  }, [index]);

  return (
    <Animated.View
      style={[animatedStyle, { marginRight: index === 0 ? CARD_SPACING : 0 }]}
    >
      <TouchableOpacity
        style={[styles.card, { backgroundColor: item.backgroundColor }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>

          <View style={styles.categoryTag}>
            <Text
              style={styles.categoryTagText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.category}
            </Text>
          </View>
        </View>

        <ImageBackground source={item.image} style={styles.productImage} />

        <BlurView style={styles.priceContainer} intensity={100}>
          <Text style={styles.priceText}>$ {item.price.toFixed(2)}</Text>
          <View></View>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 336,
    height: 422,
    borderRadius: 40,
    overflow: "hidden",
    position: "relative",
    marginRight: SPACING[4],
  },
  cardContent: {
    padding: SPACING[7],
  },
  cardTitle: {
    fontFamily: FONT.families.extraBold,
    lineHeight: 40,
    fontSize: FONT.sizes["4xl"],
    color: COLOR.black,
    zIndex: 1,
    maxWidth: "70%",
  },
  categoryTag: {
    backgroundColor: COLOR.white,
    paddingVertical: SPACING[2],
    paddingHorizontal: SPACING[4],
    borderRadius: RADIUS["2xl"],
    marginTop: SPACING[2],
    zIndex: 1,
    alignSelf: "flex-start",
  },
  categoryTagText: {
    fontSize: FONT.sizes.sm,
    color: COLOR.dark[100],
    textAlign: "center",
    fontFamily: FONT.families.medium,
  },
  productImage: {
    width: "100%",
    height: "90%",
    transform: [{ rotate: "25deg" }],
    bottom: -25,
    right: -100,
    position: "absolute",
    ...SHADOW.md,
  },
  priceContainer: {
    overflow: "hidden",
    padding: SPACING[5],
    borderWidth: 2,
    borderColor: COLOR.light[100],
    borderRadius: RADIUS["3xl"] * 2,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: SPACING[5],
  },
  priceText: {
    fontFamily: FONT.families.extraBold,
    fontSize: FONT.sizes.lg,
    color: COLOR.black,
  },
});
