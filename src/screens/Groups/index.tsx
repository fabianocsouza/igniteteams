import { StyleSheet, Text, View } from "react-native";

// import { styles } from './styles';

export function Groups() {
  return (
    <View style={styles.container}>
      <Text>Groups</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
