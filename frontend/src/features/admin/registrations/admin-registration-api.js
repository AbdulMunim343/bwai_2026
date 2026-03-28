import api from '../../../axios-instance';

export const adminRegistrationApi = {
  getByWorkshop: (workshopId, params = {}) => {
    const query = new URLSearchParams({ workshop_id: workshopId });
    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);
    if (params.defines_you_best) query.set('defines_you_best', params.defines_you_best);
    if (params.gender) query.set('gender', params.gender);
    if (params.university_org) query.set('university_org', params.university_org);
    if (params.checked_in !== undefined) query.set('checked_in', String(params.checked_in));
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));
    return api.get(`/admin/registrations?${query.toString()}`).then(res => res.data);
  },
  exportCsv: (workshopId) => api.get(`/admin/registrations/export?workshop_id=${workshopId}`, { responseType: 'blob' }).then(res => res.data),
  updateStatus: (id, status) => api.patch(`/admin/registrations/${id}/status`, { status }).then(res => res.data),
  bulkUpdateStatus: (ids, status) => api.patch('/admin/registrations/bulk-status', { ids, status }).then(res => res.data),
};
