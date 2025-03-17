const BASE_URL = "http://localhost:3000";

type RequestParams<T> = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
  onSuccess: (data: T) => void;
  onFailure: (error: string) => void;
};

export const request = async <T>({
  endpoint,
  method = "GET",
  body,
  onSuccess,
  onFailure,
}: RequestParams<T>): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? body : undefined,
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Something went wrong");
    }

    const data: T = await response.json();
    onSuccess(data);
  } catch (error) {
    onFailure(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
