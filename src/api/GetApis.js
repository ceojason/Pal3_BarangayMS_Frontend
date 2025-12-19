const BASE_URL = 'http://localhost:8080';
const UNIV_ERROR = 'Connection error occured...';

// GET APIs
export const getDummyUser = async () => {
  const response = await fetch(`${BASE_URL}/testingApi/getDummyUser`);
  
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);
  
  const data = await response.json();
  return data.content;
};


export const getServiceListForNav = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getServiceListForNav`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getSystemUserListForLogin = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getSystemUserListForLogin`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getGenderListStr = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getGenderListStr`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getYearlevelList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getYearlevelList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getEnrolleeTypeList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getEnrolleeTypeList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getStrandList = async () => {
  const response = await fetch(`${BASE_URL}/studentEnrollment/getStrandList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getSectionList = async (yearlevelKey, strandKey) => {
  const response = await fetch(`${BASE_URL}/studentEnrollment/getSectionList/${yearlevelKey}/${strandKey}`);

  if (!response.ok) throw new Error(UNIV_ERROR); // No need to wrap the constant in `${}`

  const data = await response.json();
  return data.content;
};

export const getSubjectList = async (yearlevelKey, strandKey) => {
  const response = await fetch(`${BASE_URL}/studentEnrollment/getSubjectList/${yearlevelKey}/${strandKey}`);

  if (!response.ok) throw new Error(UNIV_ERROR); // No need to wrap the constant in `${}`

  const data = await response.json();
  return data.content;
};

export const getAssignedAdviser = async (sectionId) => {
  const response = await fetch(`${BASE_URL}/studentEnrollment/getAssignedAdviser/${sectionId}`);

  if (!response.ok) throw new Error(UNIV_ERROR); // No need to wrap the constant in `${}`

  const data = await response.json();
  return data.content;
};

export const findStudentByLrn = async (lrn) => {
  const response = await fetch(`${BASE_URL}/studentEnrollment/findStudentByLrn/${lrn}`);

  if (!response.ok) throw new Error(UNIV_ERROR);

  const data = await response.json();
  return data.content;
};

export const getStudentListBySearch = async (searchRequest) => {
  const res = await fetch(`${BASE_URL}/studentEnrollment/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(searchRequest)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Server error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.content.content;
};

// DELETE API
export const deleteStudentByLrn = async (lrn) => {
  try {
    const response = await fetch(
      `${BASE_URL}/studentEnrollment/delete/${lrn}`,
      { method: 'DELETE' }
    );

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw {
        errorList: body?.errorList || [UNIV_ERROR],
        status: response.status,
      };
    }

    return body.content;
  } catch (error) {
    // Network / unexpected errors
    if (error?.errorList) throw error;

    throw {
      errorList: [error?.message || UNIV_ERROR],
    };
  }
};
