import { Button, Column, Host } from "@expo/ui";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Smart Health Community Initiative",
        }}
      />
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Host matchContents>
        <Column>
          <Button
            label="Go to Supabase example"
            onPress={() => router.navigate("/supabase-example")}
          />
          <Button
            label="Go to Health example"
            onPress={() => router.navigate("/health-example")}
          />
        </Column>
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
