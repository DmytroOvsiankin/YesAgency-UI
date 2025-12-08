import { fetch } from '@/utils/api';
import { apiLogger } from '@/utils/logger';

export const getProfile = async () => {
  const data = await fetch<UserProfile>('PROFILE');

  apiLogger('PROFILE', {}, data);

  return data;
};

export const updateProfile = async (id: UserProfile['id'], _data: UpdateProfileData) => {
  const data = await fetch<UserProfile, ProfileErrors>('PROFILE', { method: 'PUT', data: _data });

  apiLogger('UPDATE_PROFILE', { id, _data }, data);

  return data;
};
