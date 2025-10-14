import React from "react";
import type { SetStateAction } from "react";
import type { Error, ErrorMessages } from "src/components/accounts/Types";

type Fields = {
    username: string;
    email: string;
    password: string;
    re_password: string;
};
type FormFields = {
    [key: string]: FormDataEntryValue;
};

export default function formHasError(
    fields: FormFields,
    setErrors: React.Dispatch<SetStateAction<Error>>
) {
    function fieldIncomplete(fieldName: keyof Fields) {
        // Make sure the field exists in the form and check if filled out
        return fieldName in fields && !fields[fieldName];
    }

    // Catch obvious form errors here before submitting

    const errorMessages: ErrorMessages = {
        username: [],
        email: [],
        password: [],
        re_password: [],
    };
    let errorFound = false;

    if (fieldIncomplete("email")) {
        errorMessages["email"] = ["This field is required"];
        errorFound = true;
    }

    if (fieldIncomplete("username")) {
        errorMessages["username"] = ["This field is required"];
        errorFound = true;
    }

    if (fieldIncomplete("password")) {
        errorMessages["password"] = ["This field is required"];
        errorFound = true;
    }

    if (fieldIncomplete("re_password")) {
        errorMessages["re_password"] = ["This field is required"];
        errorFound = true;
    } else if (
        "password" in fields &&
        "re_password" in fields &&
        fields.password !== fields.re_password
    ) {
        errorMessages["re_password"] = ["Passwords do not match"];
        errorFound = true;
    }

    // Update state with the errors found
    if (errorFound) {
        setErrors({
            status: 400,
            msg: errorMessages,
        });

        return true;
    }

    return false;
}
