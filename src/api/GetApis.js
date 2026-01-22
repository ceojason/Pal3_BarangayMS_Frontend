const BASE_URL = 'http://localhost:8080';
const UNIV_ERROR = 'Connection error occured...';

// GET APIs
export const getDummyUser = async () => {
  const response = await fetch(`${BASE_URL}/testingApi/getDummyUser`);
  
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);
  
  const data = await response.json();
  return data.content;
};

/* ========================
   API CALLS FOR BMS - START
   ===================== */

export const getSessionUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/login/session-user`, {
    method: "GET",
    credentials: "include", // important: sends session cookie
  });

  if (!response.ok) {
    throw new Error("No active session");
  }

  const data = await response.json();
  return data;
};

export const getUsersList = async (searchRequest) => {
  const res = await fetch(`${BASE_URL}/users/search`, {
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

export const getAdminDashboardData = async (roleKey) => {
  const response = await fetch(`${BASE_URL}/dashboard/admin/${roleKey}`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getUsersListBySearch = async (searchRequest) => {
  const res = await fetch(`${BASE_URL}/users/search`, {
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

export const getNotifLogsBySearch = async (searchRequest) => {
  const res = await fetch(`${BASE_URL}/notifLogs/search`, {
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

/* ========================
   API CALLS FOR BMS - END
   ===================== */

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

export const getSmsTypeList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getSmsTypeList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getAlertStatusList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getAlertStatusList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getChannelList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getChannelList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getAllResidentTypeList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getAllResidentTypeList`);
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

export const getCivilStatusList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getCivilStatusList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getPhaseList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getPhaseList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getYesNoList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getYesNoList`);
  if (!response.ok) throw new Error(`${UNIV_ERROR}`);

  const data = await response.json();
  return data.content;
};

export const getResidentTypeList = async () => {
  const response = await fetch(`${BASE_URL}/enumApi/getResidentTypeList`);
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
