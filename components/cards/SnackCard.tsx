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

interface SnackCardProps {
  item: SnackItem;
  onPress?: (item: SnackItem) => void;
}

export default function SnackCard({ item, onPress }: SnackCardProps) {
  const handlePress = () => {
    onPress?.(item);
  };

  return (
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
