import { redirect } from "next/navigation";

/**
 * Donor accounts are not built yet, so there is no dashboard to show.
 * The portal page explains that and offers the enquiry form instead.
 *
 * The dashboard design is parked in DonorDashboard.parked.tsx.
 */
export default function DonorDashboardPage() {
  redirect("/donors/portal");
}
