import {
  getStepsToday,
  HEALTH_PLATFORM,
  requestHealthAccess,
} from "@/lib/health";
import HealthKit from "@appeeky/expo-healthkit";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [steps, setSteps] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const isAvailable = await HealthKit.isAvailable();
        if (!isAvailable) {
          setError(`${HEALTH_PLATFORM} is not available on this device.`);
          setLoading(false);
          return;
        }

        await requestHealthAccess();

        const result = await getStepsToday();

        setSteps(result?.sum ?? 0);
      } catch (err: any) {
        console.error(`${HEALTH_PLATFORM} Error: `, err);
        setError(`Failed to fetch data from ${HEALTH_PLATFORM}.`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Edit src/app/health-example.tsx to edit this screen.</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <Text>
          {steps} steps today from {HEALTH_PLATFORM}
        </Text>
      )}
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
