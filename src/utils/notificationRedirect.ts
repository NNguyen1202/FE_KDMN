export const getNotificationLink = (
  referenceModel: string,
  referenceId: string
) => {
  switch (referenceModel) {
    case "User":
      return `/user/view/${referenceId}`;

    case "Role":
      return `/role/view/${referenceId}`;

    case "SalesRecord":
      return `/sales-record/${referenceId}`;

    case "CoQuanBHXH":
      return `/bhxh?tab=agency&id=${referenceId}`;

    case "Province":
      return `/bhxh?tab=province&id=${referenceId}`;

    case "XaPhuongBHXH":
      return `/bhxh?tab=managementArea&id=${referenceId}`;

    case "AgencyContact":
      return `/bhxh?tab=agencyContact&id=${referenceId}`;

    case "OnlineRegistration":
      return `/bhxh?tab=onlineRegistration&id=${referenceId}`;

    case "PaymentAccount":
      return `/bhxh?tab=paymentAccount&id=${referenceId}`;

    default:
      return "/notifications";
  }
};