export type UserLoginToken = {
  _id: string;
  role: string[];
};

export type UserAuth = {
  _id: string;
  role?: string;
  password?: string;
};

export type UserType = {
  _id: string;
  name: string | null;
  role: string[];
  email: string;
  birthdate: string;
  twitter: string | null;
  instagram: string | null;
};
