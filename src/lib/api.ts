/**
 * API service for connecting to backend services
 * 
 * This module demonstrates how to connect to API routes that could potentially
 * interface with backend services written in any language.
 */

/**
 * Fetch data from the example API endpoint
 */
export async function fetchData() {
  try {
    // In production, this would typically be an environment variable
    const apiUrl = '/api/example';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // For static site generation we need to use different cache settings
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      error: 'Failed to fetch data',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}