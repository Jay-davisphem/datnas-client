/**
 * A custom hook for managing authentication tokens.
 *
 * This hook handles fetching, storing, and managing access and refresh tokens.
 * It automatically fetches tokens when the component mounts and provides loading
 * and error states for handling the asynchronous token fetch operation.
 *
 * @returns {Object} An object containing the following properties:
 * @returns {string|null} accessToken - The current access token or null if not set
 * @returns {string|null} refreshToken - The current refresh token or null if not set
 * @returns {boolean} loading - Indicates whether a token fetch operation is in progress
 * @returns {Error|null} error - Any error that occurred during token fetch, or null if no error
 *
 * @example
 * ```tsx
 * const { accessToken, refreshToken, loading, error } = useTokens();
 *
 * if (loading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (error) {
 *   return <div>Error: {error.message}</div>;
 * }
 *
 * if (accessToken) {
 *   // Use the token
 * }
 * ```
 */
import { useState, useEffect, useCallback } from "react";

const useTokens = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await fetch("/api/auth/tokens");
      if (!tokens.ok) {
        throw new Error(`HTTP error! status: ${tokens.status}`);
      }
      const {
        accessToken: fetchedAccessToken,
        refreshToken: fetchedRefreshToken,
      } = await tokens.json();
      setAccessToken(fetchedAccessToken);
      setRefreshToken(fetchedRefreshToken);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      setError(
        error instanceof Error ? error : new Error("Failed to fetch tokens."),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return { accessToken, refreshToken, loading, error };
};

export default useTokens;
