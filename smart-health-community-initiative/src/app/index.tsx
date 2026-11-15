import SignOutButton from "@/components/social-auth-buttons/sign-out-button";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Button, Column, Host } from "@expo/ui";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { profile } = useAuthContext();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Smart Health Community Initiative",
        }}
      />
      <Text>Welcome!</Text>
      <Text>Display name: {profile?.display_name}</Text>
      <SignOutButton />
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
          <Button
            label="Go to missing route"
            onPress={() => router.navigate("/thisisnotreal")}
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
