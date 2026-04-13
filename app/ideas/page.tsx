import { SiteShell } from "@/components/site-shell";
import { IdeasIntake } from "./ideas-intake";

export const metadata = {
  title: "Ideas — ProofForge",
  description: "Rough idea intake. Validates against the artifact contract and writes a draft."
};

export default function IdeasPage() {
  return (
    <SiteShell>
      <IdeasIntake />
    </SiteShell>
  );
}
