"use strict";
(function () {
    const protectedRoutes = [
        "contact-list",
        "edit"
    ];
    if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem('user'))
            location.href = '/login';
    }
})();
//# sourceMappingURL=authguard.js.map