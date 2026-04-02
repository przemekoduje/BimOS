import axios from 'axios';

export const validateUserUpdate = (updateData, user) => {
    let results = {
        name: {
            valid: true,
            message: ''
        },
        address: {
            valid: true,
            message: ''
        },
        description: {
            valid: true,
            message: ''
        },
        contactNumber: {
            valid: true,
            message: ''
        }
    }
    if (updateData.name && (updateData.name.length < 3 || updateData.name.length > 50)) {
        results.name.valid = false;
        results.name.message = "Name must be between 3 and 50 characters."
    }
    if (updateData.address && (updateData.address.length < 3 || updateData.address.length > 100)) {
        results.address.valid = false;
        results.address.message = "Address must be between 3 and 100 characters."
    }
    if (updateData.description && (updateData.description.length < 5 || updateData.description.length > 300)) {
        results.description.valid = false;
        results.description.message = "Description must be between 5 and 300 characters."
    }
    if (updateData.contactNumber && (updateData.contactNumber.length < 10)) {
        results.contactNumber.valid = false;
        results.contactNumber.message = "Numbers only. Must be at least 10 characters."
    }
    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
}

export const validatePasswordUpdate = (updateData) => {
    let results = {
        password: {
            valid: true,
            message: ''
        },
        confirmPassword: {
            valid: true,
            message: ''
        }
    }
    if (updateData.password.length < 5 || updateData.password.length > 100) {
        results.password.valid = false;
        results.password.message = "Password must be between 5 and 100 characters."
    }
    if (updateData.password !== updateData.confirmPassword) {
        results.confirmPassword.valid = false;
        results.confirmPassword.message = "Passwords do not match."
    }
    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
}

export const validateLogin = async (loginData) => {
    let results = {
        email: {
            valid: true,
            message: ''
        },
        password: {
            valid: true,
            message: ''
        }
    }
    if (!loginData.email) {
        results.email.valid = false;
        results.email.message = "Email is required."
    }
    if (!loginData.password) {
        results.password.valid = false;
        results.password.message = "Password is required."
    }
    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
}

export const validateRegister = async (registerData) => {
    const results = {
        name: { valid: true, message: '' },
        email: { valid: true, message: '' },
        password: { valid: true, message: '' },
        confirmPassword: { valid: true, message: '' }
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!registerData.email) {
        results.email.valid = false;
        results.email.message = "Email is required.";
    } else if (!emailPattern.test(registerData.email)) {
        results.email.valid = false;
        results.email.message = "Invalid email format.";
    } else {
        try {
            const emailCheck = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/check-email/${registerData.email}`);
            if (emailCheck.data.exists) {
                results.email.valid = false;
                results.email.message = "Email is already in use.";
            }
        } catch (error) {
            console.error("Error checking email:", error);
            // We only flag error if we actually need the server check to pass.
            // If the server is down, we might want to flag it or let it pass. 
            // In this case, we'll keep it valid unless it explicitly exists.
        }
    }

    // Name validation
    if (!registerData.name || registerData.name.length < 3 || registerData.name.length > 50) {
        results.name.valid = false;
        results.name.message = "Name must be between 3 and 50 characters.";
    }

    // Password validation
    if (!registerData.password || registerData.password.length < 5 || registerData.password.length > 100) {
        results.password.valid = false;
        results.password.message = "Password must be between 5 and 100 characters.";
    }

    // Confirm password validation
    if (registerData.password !== registerData.confirmPassword) {
        results.confirmPassword.valid = false;
        results.confirmPassword.message = "Passwords do not match.";
    }

    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
};

export const validateRecipe = async (recipeData) => {
    let results = {
        title: {
            valid: true,
            message: ''
        },
        prepTime: {
            valid: true,
            message: ''
        },
        cookTime: {
            valid: true,
            message: ''
        },
        servings: {
            valid: true,
            message: ''
        },
        description: {
            valid: true,
            message: ''
        },
        instructions: {
            valid: true,
            message: ''
        },
        ingredients: {
            valid: true,
            message: ''
        }
    }
    if (!recipeData.title || recipeData.title.length < 3 || recipeData.title.length > 50) {
        results.title.valid = false;
        results.title.message = "Title must be between 3 and 50 characters."
    }
    if (recipeData.prepTime && recipeData.prepTime < 0) {
        results.prepTime.valid = false;
        results.prepTime.message = "Prep time must be a positive number."
    }
    if (recipeData.cookTime && recipeData.cookTime < 0) {
        results.cookTime.valid = false;
        results.cookTime.message = "Cook time must be a positive number."
    }
    if (recipeData.servings && recipeData.servings < 0) {
        results.servings.valid = false;
        results.servings.message = "Servings must be a positive number."
    }
    if (recipeData.description && (recipeData.description.length < 5 || recipeData.description.length > 300)) {
        results.description.valid = false;
        results.description.message = "Description must be between 5 and 300 characters."
    }
    if (!recipeData.instructions || recipeData.instructions.length < 5 || recipeData.instructions.length > 3000) {
        results.instructions.valid = false;
        results.instructions.message = "Instructions must be between 5 and 3000 characters."
    }
    if (!recipeData.ingredients || recipeData.ingredients.length === 0) {
        results.ingredients.valid = false;
        results.ingredients.message = "At least one ingredient is required."
    }
    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
}

export const validateCollection = async (collectionData) => {
    let results = {
        title: {
            valid: true,
            message: ''
        },
        description: {
            valid: true,
            message: ''
        }
    }
    if (!collectionData.title || collectionData.title.length < 3 || collectionData.title.length > 50) {
        results.title.valid = false;
        results.title.message = "Title must be between 3 and 50 characters."
    }
    if (collectionData.description && (collectionData.description.length > 300)) {
        results.description.valid = false;
        results.description.message = "Description must be less than 300 characters."
    }
    if (Object.values(results).every(field => field.valid)) {
        return true;
    } else {
        return results;
    }
}
