export default interface UserData {
  sub: string, // username
  name: string,
  surname: string,
  scopes: string,
  iat: number,
  exp: number;
  email: string
}
