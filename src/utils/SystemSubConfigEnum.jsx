const SystemSubConfigEnum = {

  MAINTENANCE_MODE: {
    code: "MAINTENANCE_MODE",
    configCd: "CONFIG_GLOBAL",
    dscp: "Maintenance Mode",
    formType: "radio",
  },

  BRGY_NM: {
    code: "BRGY_NM",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Barangay Name",
    formType: "input",
  },

  BRGY_MUNICIPAL_LOC: {
    code: "BRGY_MUNICIPAL_LOC",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Municipal Address",
    formType: "input",
  },

  BRGY_PROVINCE_LOC: {
    code: "BRGY_PROVINCE_LOC",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Province",
    formType: "input",
  },

  BRGY_COUNTRY_LOC: {
    code: "BRGY_COUNTRY_LOC",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Country",
    formType: "input",
  },

  BRGY_ZIP_CODE: {
    code: "BRGY_ZIP_CODE",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Zip Code",
    formType: "input",
  },

  BRGY_REGION: {
    code: "BRGY_REGION",
    configCd: "CONFIG_BRGY_SETTINGS",
    dscp: "Region",
    formType: "input",
  },

};

export const getSystemSubConfigFormType = (code) => {
  const cfg = Object.values(SystemSubConfigEnum)
    .find(item => item.code === code);

  return cfg ? cfg.formType : null;
};