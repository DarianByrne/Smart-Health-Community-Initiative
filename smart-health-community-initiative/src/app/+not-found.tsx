import { Button, Host } from "@expo/ui";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Not found",
        }}
      />
      <Text>Not found!</Text>
      <Host matchContents>
        <Button label="Go Home" onPress={() => router.replace("/", {})} />
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
