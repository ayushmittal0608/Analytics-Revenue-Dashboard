const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
}