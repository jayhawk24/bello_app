import { http } from "@/api/client";

export async function fetchHotelProfile() {
    const data = await http.get<{ success: boolean; hotel: any }>(
        `/hotel/profile`
    );
    return data.hotel;
}

export async function updateHotelProfile(
    data: Partial<{
        name: string;
        address: string;
        city: string;
        state: string;
        country: string;
        contactEmail: string;
        contactPhone: string;
        totalRooms: number;
    }>
) {
    const res = await http.put<{ success: boolean; hotel: any }>(
        `/hotel/profile`,
        data
    );
    return res.hotel;
}
