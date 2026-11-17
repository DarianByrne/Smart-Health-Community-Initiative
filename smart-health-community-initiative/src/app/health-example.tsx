import { useAuthContext } from "@/hooks/use-auth-context";
import {
  getStepsToday,
  HEALTH_PLATFORM,
  requestHealthAccess,
} from "@/lib/health";
import { supabase } from "@/lib/supabase";
import HealthKit from "@appeeky/expo-healthkit";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [steps, setSteps] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { claims } = useAuthContext();
  type userSteps = {
    user_id: string;
    activity_date: string;
    steps: number;
    display_name: string;
  };
  const [allUserStepsToday, setAllUserStepsToday] = useState<userSteps[]>([]);

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

  useEffect(() => {
    const syncSteps = async () => {
      if (steps <= 0) return;

      console.debug(`health-example - syncing ${steps} steps`);

      const { error } = await supabase.from("daily_activity").upsert(
        {
          user_id: claims?.sub,
          activity_date: new Date(),
          steps: steps,
          source: "provider",
          updated_at: new Date(),
        },
        { onConflict: "user_id, activity_date" },
      );

      if (error) {
        console.error(`health-example - error: ${JSON.stringify(error)}`);
      }
    };

    const pullAllUserStepsToday = async () => {
      const { data, error } = await supabase
        .from("daily_activity")
        .select(
          `
          user_id,
          activity_date,
          steps,
          profiles ( display_name )
          `,
        )
        .eq("activity_date", new Date());

      if (data) {
        setAllUserStepsToday(
          data.map((elem) => {
            return {
              user_id: elem.user_id,
              activity_date: elem.activity_date,
              steps: elem.steps,
              display_name: (elem.profiles as any).display_name, // TODO had to cast to any because typing isn't correct, should be object instead of array OR api should return an array not an object
            };
          }),
        );
      }
    };

    syncSteps();
    pullAllUserStepsToday();
  }, [steps]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <>
          <Text>
            {steps} steps today from {HEALTH_PLATFORM}
          </Text>
          <Text>All user steps today</Text>
          {allUserStepsToday.map(({ user_id, steps, display_name }) => (
            <Text key={user_id}>
              {display_name}: {steps}
            </Text>
          ))}
        </>
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
