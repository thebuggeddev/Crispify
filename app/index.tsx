import { SnackCard } from "#/components";
import { ICONS } from "#/constants/icons";
import { SNACK_DATA, SnackItem } from "#/data/snacks";
import { COLOR, FONT, SPACING } from "#/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  // Shared value to track scroll position
  const scrollX = useSharedValue(0);

  // Animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleSnackPress = (item: SnackItem) => {
    console.log("Snack pressed:", item.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Order From the Best of {""}
          <Text style={styles.headerTitleAccent}>Snacks</Text>
        </Text>

        <TouchableOpacity style={styles.menuButton}>
          <Image source={ICONS.menu} />
        </TouchableOpacity>
      </View>

      <View style={styles.snackSection}>
        {/* <Text style={styles.sectionTitle}>
          Choco <Text style={styles.sectionTitleAccent}>Collections</Text>
        </Text> */}

        <Animated.FlatList
          data={SNACK_DATA}
          renderItem={({ item, index }) => (
            <SnackCard
              item={item}
              index={index}
              scrollX={scrollX}
              onPress={handleSnackPress}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.snackList}
          style={styles.snackListContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={336 + 16} // Card width + spacing
          snapToAlignment="start"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    padding: SPACING[5],
    backgroundColor: COLOR.white,
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: FONT.families.regular,
    fontSize: FONT.sizes["3xl"],
    maxWidth: "70%",
    color: COLOR.black,
  },
  headerTitleAccent: {
    fontFamily: FONT.families.bold,
  },
  menuButton: {
    borderWidth: 3,
    borderColor: COLOR.light[100],
    padding: SPACING[3],
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    width: 80,
  },

  // Snack section styles
  snackSection: {
    marginTop: SPACING[5],
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT.sizes["2xl"],
    fontFamily: FONT.families.regular,
    color: COLOR.black,
    marginBottom: SPACING[4],
  },
  sectionTitleAccent: {
    fontFamily: FONT.families.bold,
  },

  // Snack list styles
  snackListContainer: {
    // marginTop: SPACING[5],
    paddingVertical: SPACING[5],
  },
  snackList: {
    paddingRight: SPACING[5],
  },
});
