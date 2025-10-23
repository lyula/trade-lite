import axios from 'axios';

export async function getAllUsers() {
  const res = await axios.get('/api/users');
  return res.data;
}

export async function createOrSyncUser(clerkId: string, firstName: string, lastName: string) {
  return axios.post('/api/users/signup', {
    clerkId,
    firstName,
    lastName,
  });
}
