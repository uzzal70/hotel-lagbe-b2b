export default function Token() {
  const agentInfo = localStorage.getItem('agentInfo');

  if (!agentInfo) {
    console.error('Agent info not found in localStorage');
    return null; // or handle the error appropriately
  }

  const parse = JSON.parse(agentInfo);
  const token = parse?.accessToken;

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token?.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const jwt = parseJwt(token);
  const userId = jwt?.userId;
  return userId;
}
