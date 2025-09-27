import { SnackCard } from "#/components";
import { ICONS } from "#/constants/icons";
import { SNACK_DATA, SnackItem } from "#/data/snacks";
import { COLOR, FONT, SPACING } from "#/theme";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const handleSnackPress = (item: SnackItem) => {
    console.log("Snack pressed:", item.title);
  };

  const renderSnackCard = ({ item }: { item: SnackItem }) => (
    <SnackCard item={item} onPress={handleSnackPress} />
  );

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
        <Text style={styles.sectionTitle}>
          Choco <Text style={styles.sectionTitleAccent}>Collections</Text>
        </Text>

        <FlatList
          data={SNACK_DATA}
          renderItem={renderSnackCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.snackList}
          style={styles.snackListContainer}
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
    marginTop: SPACING[5],
  },
  snackList: {
    paddingRight: SPACING[5],
  },
});
