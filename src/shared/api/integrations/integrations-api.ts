import { httpClient } from "@shared/api/http-client";
import type {
  IntegrationApi,
  IntegrationsListResponse,
  IntegrationUpdateData,
} from "./types";

const ENDPOINT = "/integrations";

export async function getIntegrations(): Promise<IntegrationsListResponse> {
  const response = await httpClient.get<IntegrationsListResponse>(ENDPOINT);
  return response as IntegrationsListResponse;
}

export async function updateIntegration(
  code: string,
  data: IntegrationUpdateData
): Promise<IntegrationApi> {
  const response = await httpClient.put<IntegrationApi>(`${ENDPOINT}/${code}`, data);
  return response as IntegrationApi;
}
