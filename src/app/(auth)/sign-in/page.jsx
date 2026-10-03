
"use client";

import { signIn } from "@/lib/auth-client";

import { Eye, EyeSlash } from "@gravity-ui/icons";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";

import { useState } from "react";

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            console.log("Form Data:", data);

            const { data: resData, error } = await signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: true,
                callbackURL: "/",
            });

            console.log("After Submit:", resData, error);

            if (error) {
                setMessage(error.message);
                return;
            }

            console.log("Login Successful!");

        } catch (err) {
            console.error("Login Error:", err);
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Please Sign In</h2>

            <Form
                className="flex w-96 flex-col gap-4"
                onSubmit={onSubmit}
            >
                {/* Email Field */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ) {
                            return "Please enter a valid email address";
                        }

                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                {/* Password Field */}
                <TextField
                    isRequired
                    name="password"
                    type="password"
                    minLength={8}
                    className="w-full max-w-[280px]"
                >
                    <Label>Password</Label>

                    <InputGroup>
                        <InputGroup.Input
                            name="password"
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password"
                        />

                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                type="button"
                                aria-label={
                                    isVisible
                                        ? "Hide password"
                                        : "Show password"
                                }
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? (
                                    <Eye className="size-4" />
                                ) : (
                                    <EyeSlash className="size-4" />
                                )}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>

                    <Description>
                        Enter your account password.
                    </Description>

                    <FieldError />
                </TextField>

                {/* Buttons */}
                <div className="flex gap-2">
                    <Button type="submit" isDisabled={loading}>
                        {loading ? "Signing In..." : "Submit"}
                    </Button>

                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

            {message && (
                <p className="mt-3 text-sm text-red-500">
                    {message}
                </p>
            )}
        </div>
    );
};

export default SignInPage;