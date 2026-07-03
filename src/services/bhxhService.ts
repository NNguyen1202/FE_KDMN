/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axios";

// ======================
// Base URL
// ======================

const AGENCY = "/co-quan-bhxh";
const PROVINCE = "/province";
const MANAGEMENT_AREA = "/xa-phuong-bhxh";
const AGENCY_CONTACT = "/agency-contact";
const ONLINE_REGISTRATION = "/online-registration";
const PAYMENT_ACCOUNT = "/payment-account";

//
// ======================
// Agency
// ======================
//

export const searchAgency = (params?: any) =>
  api.get(`${AGENCY}/search`, { params });

export const getAllAgency = () =>
  api.get(`${AGENCY}/all`);

export const getAgencyById = (id: string) =>
  api.get(`${AGENCY}/${id}`);

export const createAgency = (data: any) =>
  api.post(`${AGENCY}/create`, data);

export const updateAgency = (id: string, data: any) =>
  api.put(`${AGENCY}/${id}`, data);

export const deleteAgency = (id: string) =>
  api.delete(`${AGENCY}/${id}`);

export const getAgencyByProvince = (provinceId: string) =>
  api.get(`${AGENCY}/province/${provinceId}`);

//
// ======================
// Province
// ======================
//

export const searchProvince = (params?: any) =>
  api.get(`${PROVINCE}/search`, { params });

export const getAllProvince = () =>
  api.get(`${PROVINCE}/all`);

export const getProvinceById = (id: string) =>
  api.get(`${PROVINCE}/${id}`);

export const createProvince = (data: any) =>
  api.post(`${PROVINCE}/create`, data);

export const updateProvince = (id: string, data: any) =>
  api.put(`${PROVINCE}/${id}`, data);

export const deleteProvince = (id: string) =>
  api.delete(`${PROVINCE}/${id}`);

//
// ======================
// Management Area
// ======================
//

export const searchManagementArea = (params?: any) =>
  api.get(`${MANAGEMENT_AREA}/search`, { params });

export const getAllManagementArea = () =>
  api.get(`${MANAGEMENT_AREA}/all`);

export const getManagementAreaById = (id: string) =>
  api.get(`${MANAGEMENT_AREA}/${id}`);

export const createManagementArea = (data: any) =>
  api.post(`${MANAGEMENT_AREA}/create`, data);

export const updateManagementArea = (id: string, data: any) =>
  api.put(`${MANAGEMENT_AREA}/${id}`, data);

export const deleteManagementArea = (id: string) =>
  api.delete(`${MANAGEMENT_AREA}/${id}`);

export const getManagementAreaByAgency = (agencyId: string) =>
  api.get(`${MANAGEMENT_AREA}/agency/${agencyId}`);

export const getManagementAreaByProvince = (provinceId: string) =>
  api.get(`${MANAGEMENT_AREA}/province/${provinceId}`);

export const lookupWardCode = (wardCode: string) =>
  api.get(`${MANAGEMENT_AREA}/lookup/code/${wardCode}`);

export const lookupWardName = (keyword: string) =>
  api.get(`${MANAGEMENT_AREA}/lookup/name`, {
    params: { keyword },
  });

//
// ======================
// Agency Contact
// ======================
//

export const searchAgencyContact = (params?: any) =>
  api.get(`${AGENCY_CONTACT}/search`, { params });

export const getAllAgencyContact = () =>
  api.get(`${AGENCY_CONTACT}/all`);

export const getAgencyContactById = (id: string) =>
  api.get(`${AGENCY_CONTACT}/${id}`);

export const createAgencyContact = (data: any) =>
  api.post(`${AGENCY_CONTACT}/create`, data);

export const updateAgencyContact = (id: string, data: any) =>
  api.put(`${AGENCY_CONTACT}/${id}`, data);

export const deleteAgencyContact = (id: string) =>
  api.delete(`${AGENCY_CONTACT}/${id}`);

export const getAgencyContactByAgency = (agencyId: string) =>
  api.get(`${AGENCY_CONTACT}/agency/${agencyId}`);

//
// ======================
// Online Registration
// ======================
//

export const searchOnlineRegistration = (params?: any) =>
  api.get(`${ONLINE_REGISTRATION}/search`, { params });

export const getAllOnlineRegistration = () =>
  api.get(`${ONLINE_REGISTRATION}/all`);

export const getOnlineRegistrationById = (id: string) =>
  api.get(`${ONLINE_REGISTRATION}/${id}`);

export const createOnlineRegistration = (data: any) =>
  api.post(`${ONLINE_REGISTRATION}/create`, data);

export const updateOnlineRegistration = (id: string, data: any) =>
  api.put(`${ONLINE_REGISTRATION}/${id}`, data);

export const deleteOnlineRegistration = (id: string) =>
  api.delete(`${ONLINE_REGISTRATION}/${id}`);

export const getOnlineRegistrationByAgency = (agencyId: string) =>
  api.get(`${ONLINE_REGISTRATION}/agency/${agencyId}`);

//
// ======================
// Payment Account
// ======================
//

export const searchPaymentAccount = (params?: any) =>
  api.get(`${PAYMENT_ACCOUNT}/search`, { params });

export const getAllPaymentAccount = () =>
  api.get(`${PAYMENT_ACCOUNT}/all`);

export const getPaymentAccountById = (id: string) =>
  api.get(`${PAYMENT_ACCOUNT}/${id}`);

export const createPaymentAccount = (data: any) =>
  api.post(`${PAYMENT_ACCOUNT}/create`, data);

export const updatePaymentAccount = (id: string, data: any) =>
  api.put(`${PAYMENT_ACCOUNT}/${id}`, data);

export const deletePaymentAccount = (id: string) =>
  api.delete(`${PAYMENT_ACCOUNT}/${id}`);

export const getPaymentAccountByAgency = (agencyId: string) =>
  api.get(`${PAYMENT_ACCOUNT}/agency/${agencyId}`);