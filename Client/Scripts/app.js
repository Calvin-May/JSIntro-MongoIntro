"use strict";
(function () {
    let linkData;
    let activeLink;
    function Start() {
        let pageID = $('body').attr('id');
        switch (pageID) {
            case 'contact':
                displayContactUsPage();
                break;
            case 'contact-list':
                displayContactListPage();
                break;
            case 'edit':
                displayEditPage();
                break;
            case 'login':
                displayLoginPage();
                break;
            case 'register':
                displayRegisterPage();
                break;
            case 'projects':
                displayProjectsPage();
                break;
            case 'logout':
                performLogout();
            default:
                break;
        }
    }
    function performLogout() {
        sessionStorage.removeItem('user');
        location.href = '/login';
    }
    function AuthGuard() {
        if (!sessionStorage.getItem("user")) {
            location.href = '/login';
        }
    }
    function displayHomePage() {
        console.info('Loaded Home Page');
        $('#aboutUsButton').on('click', () => {
            location.href = '/about';
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
            location.href = '/contact-list';
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
            location.href = '/contact-list';
        });
    }
    function displayContactListPage() {
        AuthGuard();
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
            linkData = 'add';
            location.href = '/edit';
        });
        $('a.edit').on('click', function () {
            location.href = '/edit/' + $(this).attr('id');
        });
    }
    function displayEditPage() {
        console.log('Loaded Edit Page');
        let key = $('body')[0].dataset.contactid;
        console.log(key);
        let page = linkData;
        console.log('Link Data Directly Below');
        console.log(linkData);
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
                        location.href = '/contact-list';
                    });
                    $('#resetForm').on('click', (e) => {
                        e.preventDefault();
                        location.href = '/contact-list';
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(key));
                    $('#fullName').val(contact.FullName);
                    $('#emailAddress').val(contact.EmailAddress);
                    $('#contactNumber').val(contact.ContactNumber);
                    validateContactForm();
                    $('#submitForm').on('click', function (e) {
                        e.preventDefault();
                        contact.FullName = $('#fullName').val();
                        contact.EmailAddress = $('#emailAddress').val();
                        contact.ContactNumber = $('#contactNumber').val();
                        localStorage.setItem(key, contact.serialize());
                        linkData = "";
                        location.href = '/contact-list';
                    });
                    $('#resetForm').on('click', (e) => {
                        e.preventDefault();
                        location.href = '/contact-list';
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
                    location.href = '/contact-list';
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
            location.href = '/home';
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
                location.href = '/home';
            });
        }
    }
    function displayRegisterPage() {
        console.log('Register Page loaded');
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