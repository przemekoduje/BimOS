import { Platform } from 'react-native';

export interface Engineer {
  id: string;
  firstName: string;
  lastName: string;
  speciality: string;
  licenseNumber: string;
  city: string;
  province: string;
  phone?: string;
  email?: string;
  verified: boolean;
}

let cachedData: Engineer[] | null = null;

export const fetchEngineers = async (): Promise<Engineer[]> => {
  if (cachedData) return cachedData;
  
  try {
    // In Expo Web, assets move to the root or /assets/
    const url = Platform.OS === 'web' ? '/assets/engineers_data.json' : null;
    
    if (!url) {
      console.warn('Local JSON fetch not fully implemented for native yet');
      return [];
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to load engineer database');
    
    const rawData = await response.json();
    
    // Map the complex e-CRUB structure to our simple Engineer interface
    const mappedData = rawData.map((item: any) => ({
      id: item.id,
      firstName: item.attributes.personal_details.first_name || '',
      lastName: item.attributes.personal_details.last_name || '',
      speciality: item.attributes.specialities?.[0]?.name || 'Konstrukcyjno-budowlana',
      licenseNumber: item.attributes.decision.permission_number || item.attributes.decision.decision_number || 'N/A',
      city: item.attributes.contact_data?.address?.place_name || item.attributes.postal_address?.place || 'N/A',
      province: item.attributes.personal_details.primary_voivodeship || 'Śląskie',
      email: item.attributes.contact_data?.emails?.[0] || null,
      phone: item.attributes.contact_data?.telephones?.[0] || null,
      verified: true
    }));

    cachedData = mappedData;
    return mappedData;
  } catch (error) {
    console.error('Error fetching engineers:', error);
    return [];
  }
};
