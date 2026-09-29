/**
 * ClientForge Enterprise API Client
 * Manages JWT tokens, Organization headers, and typed REST communication with Django backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  results?: T;
  count?: number;
  [key: string]: any;
}

export class ApiClient {
  private static getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("clientforge_access_token");
  }

  private static getOrgId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("clientforge_active_org_id");
  }

  public static setAuth(tokens: { access: string; refresh?: string }, orgId?: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("clientforge_access_token", tokens.access);
    if (tokens.refresh) {
      localStorage.setItem("clientforge_refresh_token", tokens.refresh);
    }
    if (orgId) {
      localStorage.setItem("clientforge_active_org_id", orgId);
    }
  }

  public static clearAuth() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("clientforge_access_token");
    localStorage.removeItem("clientforge_refresh_token");
    localStorage.removeItem("clientforge_active_org_id");
  }

  private static getHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...extraHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const orgId = this.getOrgId();
    if (orgId) {
      headers["X-Organization-Id"] = orgId;
    }

    return headers;
  }

  public static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
    const headers = this.getHeaders((options.headers as Record<string, string>) || {});

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: `HTTP_${response.status}`,
            message: data.detail || response.statusText || "Request failed",
            details: data,
          },
        };
      }

      return data;
    } catch (err: any) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: err.message || "Failed to communicate with backend API server",
        },
      };
    }
  }

  public static get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public static post<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public static patch<T = any>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  public static delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}
