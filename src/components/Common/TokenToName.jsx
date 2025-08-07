export default function TokenToName() {
  const agentInfo = localStorage.getItem('agentInfo');
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
  const userInfo = jwt;
  return userInfo;
}
