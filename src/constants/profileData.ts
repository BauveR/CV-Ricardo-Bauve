/**
 * Datos del perfil del CV centralizados
 * Siguiendo el principio de Inversión de Dependencias (DIP)
 */

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  web: string;
}

export interface ProfileData {
  contact: ContactInfo;
}

export const PROFILE_DATA: ProfileData = {
  contact: {
    email: "rick.bauve@gmail.com",
    phone: "602 673 251",
    linkedin: "linkedin.com/in/ricardo-bauve",
    web: "bauve.tumblr.com",
  },
};
