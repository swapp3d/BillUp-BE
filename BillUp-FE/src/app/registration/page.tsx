"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/hooks/useAuthentication";
import {RegistrationForm, ResidenceRequest} from "@/app/registration/types";


export default function RegistrationPage() {
    const [form, setForm] = useState<RegistrationForm>({
        name: "",
        surname: "",
        email: "",
        password: "",
        phoneNumber: "",
        role: "CLIENT",
        residenceRequest: {
            streetAddress: "",
            flatNumber: "",
            city: "",
            postalCode: "",
            country: "",
            residenceType: "HOUSE",
            isPrimary: true,
        },
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const { registerUser } = useAuthentication();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith("residence_")) {
            const key = name.replace("residence_", "") as keyof ResidenceRequest;

            setForm((prev) => ({
                ...prev,
                residenceRequest: {
                    ...(prev.residenceRequest || {
                        streetAddress: "",
                        flatNumber: "",
                        city: "",
                        postalCode: "",
                        country: "",
                        residenceType: "HOUSE",
                        isPrimary: true,
                    }),
                    [key]: value,
                },
            }));
        } else {
            const isRoleChangeToCompany = name === "role" && value === "COMPANY";
            const isRoleChangeToClient = name === "role" && value === "CLIENT";

            setForm((prev) => ({
                ...prev,
                [name]: value,
                ...(isRoleChangeToCompany
                    ? { surname: "", residenceRequest: undefined }
                    : isRoleChangeToClient && !prev.residenceRequest
                        ? {
                            residenceRequest: {
                                streetAddress: "",
                                flatNumber: "",
                                city: "",
                                postalCode: "",
                                country: "",
                                residenceType: "HOUSE",
                                isPrimary: true,
                            },
                        }
                        : {}),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await registerUser(form);
            setSuccess("Registration successful! Redirecting...");
            setTimeout(() => router.push("/login"), 1500);
        } catch (err: any) {
            setError(err?.message || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold mb-2">Register</h2>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-600">{success}</div>}

                <select
                    name="role"
                    onChange={handleChange}
                    value={form.role}
                    className="w-full border p-2 rounded"
                >
                    <option value="CLIENT">Client</option>
                    <option value="COMPANY">Company</option>
                </select>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={form.name}
                    className="w-full border p-2 rounded"
                    required
                />

                {form.role === "CLIENT" && (
                    <input
                        name="surname"
                        placeholder="Surname"
                        onChange={handleChange}
                        value={form.surname}
                        className="w-full border p-2 rounded"
                        required
                    />
                )}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    className="w-full border p-2 rounded"
                    required
                    minLength={6}
                />
                <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={form.phoneNumber}
                    className="w-full border p-2 rounded"
                    required
                />

                {form.role === "CLIENT" && form.residenceRequest && (
                    <>
                        <hr />
                        <h3 className="text-lg font-semibold">Residence Info</h3>

                        <input
                            name="residence_streetAddress"
                            placeholder="Street Address"
                            onChange={handleChange}
                            value={form.residenceRequest.streetAddress}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            name="residence_flatNumber"
                            placeholder="Flat Number (optional)"
                            onChange={handleChange}
                            value={form.residenceRequest.flatNumber}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            name="residence_city"
                            placeholder="City"
                            onChange={handleChange}
                            value={form.residenceRequest.city}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            name="residence_postalCode"
                            placeholder="Postal Code"
                            onChange={handleChange}
                            value={form.residenceRequest.postalCode}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            name="residence_country"
                            placeholder="Country"
                            onChange={handleChange}
                            value={form.residenceRequest.country}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <select
                            name="residence_residenceType"
                            value={form.residenceRequest.residenceType}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="HOUSE">House</option>
                            <option value="FLAT">Flat</option>
                        </select>
                    </>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
