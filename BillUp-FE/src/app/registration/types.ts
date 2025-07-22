export interface ResidenceRequest {
    streetAddress: string;
    flatNumber: string;
    city: string;
    postalCode: string;
    country: string;
    residenceType: "HOUSE" | "FLAT";
    isPrimary: boolean;
}

export interface RegistrationForm {
    name: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: 'CLIENT' | 'COMPANY';
    residenceRequest?: ResidenceRequest;
}

export class RegisterFormData {
}