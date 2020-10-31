export default interface IUserDTO {
  id: string;
  name: string;
  isCompany: boolean;
  trimmed_name: string;
  avatar_url: string;
  first_name?: string;
  last_name?: string;
}
