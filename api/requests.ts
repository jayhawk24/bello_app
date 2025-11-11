import { http } from "@/api/client";

export type ServiceRequest = {
    id: string;
    title: string;
    priority: string;
    status: string;
    room: { roomNumber: string };
    requestedAt: string;
    assignedStaff?: { name: string } | null;
};

export async function fetchRequests(
    filters: { status?: string; priority?: string } = {}
) {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);
    const query = params.toString() ? `?${params.toString()}` : "";
    const data = await http.get<{
        success: boolean;
        serviceRequests: ServiceRequest[];
    }>(`/staff/service-requests${query}`);
    return data.serviceRequests;
}

export async function updateRequestStatus(requestId: string, status: string) {
    const data = await http.patch<{
        success: boolean;
        serviceRequest: ServiceRequest;
    }>("/staff/service-requests", { requestId, status });
    return data.serviceRequest;
}
