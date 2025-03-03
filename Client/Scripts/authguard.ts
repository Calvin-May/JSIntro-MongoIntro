"use strict";

(function () {
    // Adding Protected Routes, not extensible - time saving
    const protectedRoutes: string[] = [
        "contact-list",
        "edit"
    ];

    // Check for a protected route, if found, check session storage for logged in user; redirect as required
    if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem('user'))
            location.href='/login';
    }
})();