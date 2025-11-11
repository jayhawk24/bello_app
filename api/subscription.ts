import { fetchHotelProfile } from "@/api/hotel";

export async function fetchSubscriptionSummary() {
    const hotel = await fetchHotelProfile();
    return {
        plan: hotel?.subscriptionPlan,
        status: hotel?.subscriptionStatus
    } as { plan: string; status: string };
}
