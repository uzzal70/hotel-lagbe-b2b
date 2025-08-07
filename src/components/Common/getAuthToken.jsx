export default function getAuthToken() {
  const agentInfo = localStorage.getItem('agentInfo');
  const parse = JSON.parse(agentInfo);
  const token = parse?.accessToken;

  return token;
}
