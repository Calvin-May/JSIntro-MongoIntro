"use strict";
(function () {
    function Start() {
        LoadHeader();
        LoadLink('home');
        LoadFooter();
    }
    function AuthGuard() {
        const protectedRoutes = [
            "contact-list",
            "edit"
        ];
        if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem('user'))
                router.ActiveLink = "login";
        }
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        let pageName = router.ActiveLink;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        $('ul>li>a').each(function () {
            $(this).removeClass('active');
        });
        $(`a.nav-link[data|='${pageName}']`).addClass('active');
        LoadContent();
    }
    function addNavigationEvents() {
        let navLinks = $('ul>li>a');
        navLinks.off('click');
        navLinks.off('mouseover');
        navLinks.on('click', function () {
            LoadLink($(this).attr('data'));
        });
        navLinks.on('mouseover', function () {
            $(this).css('cursor', 'pointer');
        });
    }
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off('click');
        linkQuery.off('mouseover');
        linkQuery.off('mouseout');
        linkQuery.css('text-decoration', 'underline');
        linkQuery.css('color', 'blue');
        linkQuery.on('click', function () {
            LoadLink(`${link}`);
        });
        linkQuery.on('mouseover', function () {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });
        linkQuery.on('mouseover', function () {
            $(this).css('font-weight', 'normal');
        });
    }
    function LoadHeader() {
        $.get('./Views/Component/header.html', function (htmlData) {
            $('header').html(htmlData);
            addNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        let pageName = router.ActiveLink;
        console.log(pageName);
        let callback = ActiveLinkCallback();
        $.get(`./Views/Content/${pageName}.html`, function (htmlData) {
            $('main').html(htmlData);
            CheckLogin();
            callback();
        });
    }
    function LoadFooter() {
        $.get('./Views/Component/footer.html', function (htmlData) {
            $('footer').html(htmlData);
        });
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
            case 'home': return displayHomePage;
            case 'about': return displayAboutUsPage;
            case 'projects': return displayProjectsPage;
            case 'services': return displayServicesPage;
            case 'contact': return displayContactUsPage;
            case 'contact-list': return displayContactListPage;
            case 'edit': return displayEditPage;
            case 'login': return displayLoginPage;
            case 'register': return displayRegisterPage;
            case '404': display404Page;
            default:
                console.error('Error: Callback does not exist: ' + router.ActiveLink);
                return new Function();
        }
    }
    function display404Page() {
    }
    function displayHomePage() {
        console.info('Loaded Home Page');
        $('#aboutUsButton').on('click', () => {
            LoadLink('about');
        });
    }
    function displayProjectsPage() {
        console.info('Loaded Projects Page');
    }
    function displayServicesPage() {
        console.info('Loaded Services Page');
    }
    function displayAboutUsPage() {
        console.info('Loaded About Us Page');
    }
    function displayContactUsPage() {
        console.info('Loaded Contact Us Page');
        $("a[data='contact-list']").off('click');
        $("a[data='contact-list']").on('click', function () {
            LoadLink('contact-list');
        });
        validateContactForm();
        let submitButton = $('#submitForm:first');
        let subscribeCheckbox = $('#subscribeCheckbox').get(0);
        $(submitButton).on('click', (e) => {
            e.preventDefault;
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                addContact(fullName, contactNumber, emailAddress);
            }
            LoadLink('contact-list');
        });
    }
    function displayContactListPage() {
        console.info('Loaded Contact List Page');
        if (localStorage.length > 0) {
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                console.log(contactData);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr>
        <th scope="row" class="text-center">${index}</th>
        <td>${contact.FullName}</td>
        <td>${contact.ContactNumber}</td>
        <td>${contact.EmailAddress}</td>
        <td class="text-center"><a href="#" id="${key}" id="Edit" class="btn btn-primary edit"><i class="fas fa-edit"></i> Edit</a></td>
        <td class="text-center"><a href="#" id="${key}" class="btn btn-warning delete"><i class="fas fa-trash-alt"></i> Delete</a></td>
        
        </tr>`;
                index++;
            }
            let contactList = $('#contactList').get(0);
            contactList.innerHTML = data;
            $('#clearContacts').on('click', () => {
                if (localStorage.length > 0) {
                    localStorage.clear();
                    contactList.innerHTML = "";
                }
            });
            $('a.delete').on('click', function () {
                console.log(this.id);
                if (confirm('Are you sure?')) {
                    $(this).closest('tr').remove();
                    localStorage.removeItem(this.id);
                }
            });
        }
        $('#addContact').on('click', function () {
            LoadLink('edit', 'add');
        });
        $('a.edit').on('click', function () {
            LoadLink('edit', $(this).attr('id'));
        });
    }
    function displayEditPage() {
        console.log('Loaded Edit Page');
        let page = router.LinkData;
        console.log(page);
        switch (page) {
            case 'add':
                {
                    $('#mainContent>>h1').text('Add Contact');
                    $('#submitForm').on('click', (e) => {
                        e.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        addContact(fullName, contactNumber, emailAddress);
                        LoadLink('contact-list');
                    });
                    $('#resetForm').on('click', (e) => {
                        e.preventDefault();
                        LoadLink('contact-list');
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $('#fullName').val(contact.FullName);
                    $('#emailAddress').val(contact.EmailAddress);
                    $('#contactNumber').val(contact.ContactNumber);
                    validateContactForm();
                    $('#submitForm').on('click', function (e) {
                        e.preventDefault();
                        contact.FullName = $('#fullName').val();
                        contact.EmailAddress = $('#emailAddress').val();
                        contact.ContactNumber = $('#contactNumber').val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink('contact-list');
                    });
                    $('#resetForm').on('click', (e) => {
                        e.preventDefault();
                        LoadLink('contact-list');
                    });
                }
                break;
        }
    }
    function validateField(inputFieldID, validationExpression, errorMessage) {
        let messageArea = $('#messageArea').hide();
        $(`#${inputFieldID}`).on('blur', function () {
            let inputFieldText = $(this).val();
            inputFieldText = inputFieldText.trim();
            console.log(inputFieldText);
            if (!validationExpression.test(inputFieldText)) {
                messageArea.addClass('alert alert-danger').text(`${errorMessage}`).show();
                $('#submitForm').attr('disabled', 'true');
            }
            else {
                messageArea.removeAttr('class').hide();
                $('#submitForm').removeAttr('disabled');
            }
        });
    }
    function validateContactForm() {
        validateField('fullName', /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})([\s,-]([A-Z][a-z]{1,}))*[\s,-]([A-Z][a-z]{1,})$/, "Please Enter a valid Full Name");
        validateField('contactNumber', /^(([+][0-9]{1,3}[\s-.])?([(][0-9]{3}[)]-?[0-9]{3}-?[0-9]{4}))?([0-9]{3}.?[0-9]{3}.?[0-9]{4})?$/, "Please Enter a valid Contact Number");
        validateField('emailAddress', /^[a-xA-z0-9._-]+@[a-xA-z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please Enter a valid Email Address");
    }
    function displayLoginPage() {
        console.log('Login Page loaded');
        let messageArea = $('#messageArea');
        messageArea.hide();
        AddLinkEvents('register');
        $('#loginButton').on('click', function (e) {
            e.preventDefault();
            let success = false;
            let newUser = new core.User();
            $.get('./Data/users.json', function (data) {
                let username = document.forms[0].username.value;
                let password = document.forms[0].password.value;
                for (const user of data.users) {
                    if (username == user.Username && password == user.Password) {
                        console.log(`${username.value}, ${password.value}`);
                        console.log(`${user.Username}, ${user.Password}`);
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem('user', newUser.serialize());
                    messageArea.removeAttr('class').show();
                    LoadLink('contact-list');
                }
                else {
                    $('#username').trigger('focus').trigger('select');
                    messageArea.addClass('alert alert-danger').text('Error: Invalid Login').show();
                }
            });
        });
        $('#cancelButton').on('click', (e) => {
            e.preventDefault();
            document.forms[0].reset();
            LoadLink('home');
        });
    }
    function CheckLogin() {
        if (sessionStorage.getItem('user')) {
            $('#navLogin').html(`<li id="navLogout" class="nav-item px-1">
          <a class="nav-link" href="#">
          <i class="fas fa-sign-out-alt"></i>
          Sign Out
          </a>
        </li>`);
            $('#navLogout').on('click', function () {
                sessionStorage.clear();
                $('#navLogin').html(`<a class="nav-link" data="login">
            <i class="fas fa-sign-in-alt"></i>
            Login
          </a>`);
                LoadHeader();
                LoadLink('home');
            });
        }
    }
    function displayRegisterPage() {
        console.log('Register Page loaded');
        AddLinkEvents('login');
    }
    function addContact(fullName, contactNumber, emailAddress) {
        let newContact = new core.Contact(fullName, contactNumber, emailAddress);
        if (newContact.serialize()) {
            let key = newContact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, newContact.serialize());
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map