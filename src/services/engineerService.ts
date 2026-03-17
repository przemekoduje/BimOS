export interface Engineer {
  id: string;
  name: string;
  title: string;
  licenseNumber: string;
  province: string;
  city: string;
  speciality: string;
  email: string | null;
  phone: string | null;
  raw: any;
}

export const fetchEngineers = async (): Promise<Engineer[]> => {
  // In a real app, this would be an API call. For now, we fetch our local JSON.
  const response = await fetch('/engineers_data.json');
  const data = await response.json();
  
  return data.map((item: any) => ({
    id: item.id,
    name: item.attributes.personal_details.name_and_last_name,
    title: item.attributes.personal_details.professional_title,
    licenseNumber: item.attributes.decision.permission_number || item.attributes.decision.decision_number,
    province: item.attributes.personal_details.primary_voivodeship,
    city: item.attributes.contact_data?.address?.place_name || item.attributes.postal_address?.place || 'N/A',
    speciality: item.attributes.specialities[0]?.speciality || 'N/A',
    email: (item.attributes.email_address || item.attributes.contact_data?.address?.email_address || null) || null,
    phone: (item.attributes.phone_number || item.attributes.contact_data?.address?.phone_number || null) || null,
    raw: item
  }));
};
