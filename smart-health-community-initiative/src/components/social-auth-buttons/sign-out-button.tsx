import { supabase } from "@/lib/supabase";
import { Button, Host } from "@expo/ui";

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    console.error("Error signing out:", error);
  }
}

export default function SignOutButton() {
  return (
    <Host matchContents>
      <Button label="Sign out" onPress={onSignOutButtonPress} />
    </Host>
  );
}
