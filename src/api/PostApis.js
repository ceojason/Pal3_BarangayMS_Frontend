const BASE_URL = 'http://localhost:8080';
const UNIV_SUBMIT_ERROR = 'Failed to submit form data...';

// POST API for login
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {  // adjust endpoint as needed
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error(`${UNIV_SUBMIT_ERROR}`);

  return response.json();
};

export const uploadProfileImage = async (userId, file, onSuccess, onError) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);

    const response = await fetch(`${BASE_URL}/users/${userId}/profile-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (_) {
        throw new Error('Failed to upload profile image.');
      }
      throw errorBody;
    }

    const json = await response.json();

    if (onSuccess) {
      onSuccess(json.content || json); // adjust if your API wraps response in 'content'
    }

    return json;
  } catch (error) {
    const errorList = (error && error.errorList) || [error.message || 'Something went wrong'];
    if (onError) {
      onError(errorList);
    }
  }
};


// POST APIs
export const postRequest = async (endpoint, data, onSuccess, onError) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (_) {
        throw new Error('Submission failed.');
      }
      throw errorBody;
    }

    const json = await response.json();

    if (onSuccess) {
      onSuccess(json.content);
    }

    return json;
  } catch (error) {
    const errorList = (error && error.errorList) || [error.message || 'Something went wrong'];
    if (onError) {
      onError(errorList);
    }
  };
};