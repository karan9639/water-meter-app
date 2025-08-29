import { apiRequest } from './client';

export async function saveReadingApi({ treated, wasted }) {
  // Server expects: treatedWaterReading, wastedWaterReading
  return apiRequest('/metre-reading/save', {
    method: 'POST',
    body: {
      treatedWaterReading: Number(treated),
      wastedWaterReading: Number(wasted),
    },
  });
}

export async function fetchReadingsApi() {
  // Usually returns { success, statusCode, data: [...] }
  const res = await apiRequest('/metre-reading/readings', { method: 'GET' });
  const list = res?.data || [];
  return Array.isArray(list) ? list : [];
}
