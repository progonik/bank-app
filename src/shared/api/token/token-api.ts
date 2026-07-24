import { httpClient } from "@shared/api/http-client";
import type { TokenUpdateData } from "./types";

const ENDPOINT = '/entrepreneurs/birdarcha-token'

export async function updateToken(
    token: string
): Promise<TokenUpdateData> {
    const response = await httpClient.put<TokenUpdateData>(`${ENDPOINT}`, { token })
    return response as TokenUpdateData
}