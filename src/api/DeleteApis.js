const BASE_URL = 'http://localhost:8080';
const UNIV_ERROR = 'Connection error occurred...';

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const deleteRecord = async (endpoint, id, onSuccess, onError) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (_) {
        throw new Error('Deletion failed.');
      }
      throw errorBody;
    }

    let json = null;
    try {
      json = await response.json(); // DELETE may or may not return a body
    } catch (_) {}

    if (onSuccess) {
      onSuccess(json?.content ?? null);
    }

    return json;
  } catch (error) {
    const errorList =
      (error && error.errorList) ||
      [error.message || 'Something went wrong'];

    if (onError) {
      onError(errorList);
    }
  }
};