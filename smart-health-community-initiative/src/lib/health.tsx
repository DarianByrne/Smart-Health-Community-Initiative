import * as HealthKit from "@appeeky/expo-healthkit";
import { Platform } from "react-native";

export const READ_TYPES = [HealthKit.QuantityType.stepCount];

export const HEALTH_PLATFORM =
  Platform.OS === "ios"
    ? "HealthKit"
    : Platform.OS === "android"
      ? "Health Connect"
      : "";

export async function requestHealthAccess(): Promise<boolean> {
  return await HealthKit.requestAuthorization({
    toRead: READ_TYPES,
  });
}

export function startOfToday(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function daysAgo(count: number): Date {
  const date = startOfToday();
  date.setDate(date.getDate() - count);
  return date;
}

export async function getStepsToday() {
  if (!HealthKit.isAvailable()) {
    return;
  }

  return await HealthKit.queryStatistics({
    type: HealthKit.QuantityType.stepCount,
    unit: HealthKit.Unit.count,
    from: startOfToday(),
    to: new Date(),
    options: HealthKit.StatisticsOption.cumulativeSum,
  });
}
