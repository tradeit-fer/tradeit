"use strict";

const API_URL = "http://localhost:8000";

const authService = {

    currentUser: null,
    csrfToken: null,

    async getCurrentUser() {
        const response = await fetch(
            `${API_URL}/api/v1/auth/me`,
            {
                credentials: "include",
                cache: "no-store",
            }
        );

        if (response.status === 401) {
            this.currentUser = null;
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        this.currentUser = await response.json();

        return this.currentUser;
    },

    async getCsrfToken() {
        const response = await fetch(
            `${API_URL}/api/v1/auth/csrf`,
            {
                credentials: "include",
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch CSRF token");
        }

        const data = await response.json();

        this.csrfToken = data.csrf_token;

        return this.csrfToken;
    },

    async logout() {
        if (!this.csrfToken) {
            await this.getCsrfToken();
        }

        const response = await fetch(
            `${API_URL}/api/v1/auth/logout`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRF-Token": this.csrfToken,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        this.currentUser = null;
        this.csrfToken = null;
    }
};