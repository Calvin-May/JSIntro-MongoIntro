"use strict"; // Helps with Code hinting

/* IIFE - Immediately Invoked Function Expression:
    An IIFE (Immediately Invoked Function Expression) 
    is a JavaScript function that runs as soon as it is defined.

    It is a design pattern which is also known as a Self-Executing 
    Anonymous Function and contains two major parts:
 */
(function () {

  /**
   * Application Entry point
   */
  function Start(): void {

    /* Routing Method used before converting to SPA
    switch (document.title) {
      case 'Home':
        displayHomePage();
        break;
      case 'About Us':
        displayAboutUsPage();
        break;
      case 'Projects':
        displayProjectsPage();
        break;
      case 'Services':
        displayServicesPage();
        break;
      case 'Contact Us':
        displayContactUsPage();
        break;
      case 'ContactList':
        displayContactListPage();
        break;
      case 'Edit':
        displayEditPage();
        break;  
      case 'Login':
        displayLoginPage();
        break;
      case 'Register':
        displayRegisterPage();
          break; 
      default:
        break;
    } */

    //LoadHeader();     - Depreciated, routing is now handled on the backend
    //LoadLink('home'); - Depreciated, routing is now handled on the backend
    //LoadFooter();     - Depreciated, routing is now handled on the backend

    // New Start Function using Backend Routing

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
      default:
        break;
    }

  }

  /**
   * This function uses Ajax to open a connection to the server and returns
   * a data payload to the callback function.
   * 
   * @param {string} method 
   * @param {string} url 
   * @param {function} callback 
   * @returns {void}
   */

  /** function AjaxRequest(method: string, url: string, callback: Function): void {...}
  function AjaxRequest(method: string, url: string, callback: Function): void {
    // Ajax Introduction
    //-Instantiate XHR Object
    let XHR: XMLHttpRequest = new XMLHttpRequest();
    //-Add Event Listener for readystatechange
    XHR.addEventListener('readystatechange', () => {
      if (XHR.readyState === 4 && XHR.status === 200) {
        if (typeof callback === 'function')
          {
            callback(XHR.responseText);
          }
          else
          {
            console.log('ERROR: Callback is not a function');
          }
      }
    });

    //-Open a connection to the Server
    XHR.open(method, url);

    //-Send the Request to the server
    XHR.send();
  }
  **/

  
  function AuthGuard(): void {
    // Adding Protected Routes, not extensible - time saving
    const protectedRoutes: string[] = [
      "contact-list",
      "edit"
    ];

    // Check for a protected route, if found, check session storage for logged in user; redirect as required
    if (protectedRoutes.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem('user'))
            router.ActiveLink = "login"
  }
}

/* Depreciated, Routing handled on backend

// Each of these functions was used when routing was handled on the front end and is no longer needed.

function LoadLink(link: string, data: string = ""): void {

  router.ActiveLink = link;
  let pageName = router.ActiveLink;

  AuthGuard();

  router.LinkData = data;

  history.pushState({}, "", router.ActiveLink);

  // Remove all Active Links
  $('ul>li>a').each(function() {
    $(this).removeClass('active');
  });
  $(`a.nav-link[data|='${pageName}']`).addClass('active');
  LoadContent();
}


function addNavigationEvents(): void {

  // Store Navigation Links
  let navLinks = $('ul>li>a');

  // Remove Navigation events
  navLinks.off('click');
  navLinks.off('mouseover');

  // Add Navigation Events
  navLinks.on('click', function() {
    LoadLink($(this).attr('data') as string);
  });

  // Style Navigation Menu as clickable links
  navLinks.on('mouseover', function() {
    $(this).css('cursor', 'pointer');
  });
}

function AddLinkEvents(link: string): void {
  let linkQuery = $(`a.link[data=${link}]`);

  // Remove Navigation events
  linkQuery.off('click');
  linkQuery.off('mouseover');
  linkQuery.off('mouseout');

  linkQuery.css('text-decoration', 'underline');
  linkQuery.css('color', 'blue');

  // Add Navigation Events
  linkQuery.on('click', function() {
    LoadLink(`${link}`);
  });

  // Style Navigation Menu as clickable links
  linkQuery.on('mouseover', function() {
    $(this).css('cursor', 'pointer');
    $(this).css('font-weight', 'bold');
  });

  linkQuery.on('mouseover', function() {
    $(this).css('font-weight', 'normal');
  });
}
  
  /**
   * Creates the header for each page
   * 
   * @returns {void}
   /
  function LoadHeader(): void {

    // Use Ajax to load header content
    $.get('./Views/Component/header.html', function(htmlData) {
      // Inject Header HTML
      $('header').html(htmlData);
      addNavigationEvents();
      CheckLogin();
    });
  }
 

  /**
   * Loads Page content into Template
   /
  function LoadContent() {
    let pageName = router.ActiveLink;
    console.log(pageName)
    let callback = ActiveLinkCallback();
    $.get(`./Views/Content/${pageName}.html`, function(htmlData) {
      $('main').html(htmlData);
      CheckLogin();
      callback();
    });
  }
  

  /**
   * @returns {void}
   /
  function LoadFooter(): void {
    // Use Ajax to load header content
    $.get('./Views/Component/footer.html', function(htmlData) {
      // Inject Header HTML
      $('footer').html(htmlData);
    });
  }

  /**
   * 
   * @param {string} activeLink 
   * @returns {function}
   /
  function ActiveLinkCallback(): Function {
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
      case '404' : display404Page;
      default:
        console.error('Error: Callback does not exist: ' + router.ActiveLink);
        return new Function();
    }
  }

  function display404Page() {

  }

*/
 

// Display Page Functions
  function displayHomePage(): void {
    console.info('Loaded Home Page');
/*  Click event in Multiple ways using JavaScript

    // Traditional vanilla JS using a Variable and getElementID to return an element with an ID of 'aboutUsButton'
    let aboutUsButton = document.getElementById('aboutUsButton');
    aboutUsButton.addEventListener('click', () => {
      location.href = 'about.html';
    });

    // Vanilla JS using Query Selector, adds event listener to first element found with an ID of 'aboutUsButton'
    document.querySelector('#aboutUsButton').addEventListener('click', () => {
      location.href = 'about.html';
    });

    // Vanilla JS using Query Selector all, adds event to all elements with ID of 'aboutUSButton'
    document.querySelectorAll('#aboutUsButton').forEach(element => {
      element.addEventListener('click', () => {
        location.href = 'about.html';
      });
    });
 */  

    $('#aboutUsButton').on('click', () => {
     //LoadLink('about'); - Depreciated, routing is now handled on the backend
     location.href = '/about';
    });
  }

  function displayProjectsPage(): void {
    console.info('Loaded Projects Page');
    //To do
  }

  function displayServicesPage(): void {
    console.info('Loaded Services Page');
    //To Do
  }
  function displayAboutUsPage(): void {
    console.info('Loaded About Us Page');
    //To Do
  }
  function displayContactUsPage(): void {
    console.info('Loaded Contact Us Page');

    $("a[data='contact-list']").off('click');
    $("a[data='contact-list']").on('click', function() {
      //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
     location.href = '/contact-list';
    });

    validateContactForm();

    let submitButton = $('#submitForm:first') as JQuery<HTMLElement>;
    let subscribeCheckbox = $('#subscribeCheckbox').get(0) as HTMLInputElement
      
    $(submitButton).on('click', (e) => {
      e.preventDefault;
      if (subscribeCheckbox.checked) {
        let fullName = document.forms[0].fullName.value;
        let contactNumber = document.forms[0].contactNumber.value;
        let emailAddress = document.forms[0].emailAddress.value;
        addContact(fullName, contactNumber, emailAddress);
      }
      //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
     location.href = '/contact-list';
    });

  }

  function displayContactListPage(): void {
    console.info('Loaded Contact List Page');
    
    if (localStorage.length > 0) {

      let data = "" // Variable to hold deserialized contacts from local storage
      let keys = Object.keys(localStorage); // Returns string array of keys values in local storage
      let index = 1;

      // For Of loop, that loops for each Key in the Keys array (collection)
      for (const key of keys) {
        let contactData = localStorage.getItem(key) as string;
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
     let contactList = $('#contactList').get(0) as HTMLElement;

     contactList.innerHTML = data;

     $('#clearContacts').on('click', () => {
       if (localStorage.length > 0) {
         localStorage.clear();
         contactList.innerHTML = "";
       }
     });

    $('a.delete').on('click', function() {
      console.log(this.id);
      if(confirm('Are you sure?'))
        {
          $(this).closest('tr').remove();
          localStorage.removeItem(this.id);
        }
    });
    }

    $('#addContact').on('click', function(){
      //LoadLink('edit', 'add'); Depreciated, routing is now handled on the backend
     location.href = '/edit';
    });

    $('a.edit').on('click', function(){
      //LoadLink('edit', $(this).attr('id') as string); -Depreciated, routing is now handled on the backend
     location.href = '/edit?' + $(this).attr('id') as string;
    });



  }

  function displayEditPage(): void {
    console.log('Loaded Edit Page');

    // Retrieve Key from URL
    let page = router.LinkData;
    console.log(page);
    switch(page) 
    {
      case 'add':
        {
          $('#mainContent>>h1').text('Add Contact');

          $('#submitForm').on('click', (e) => {
            e.preventDefault();
            let fullName = document.forms[0].fullName.value;
            let contactNumber = document.forms[0].contactNumber.value;
            let emailAddress = document.forms[0].emailAddress.value;
            addContact(fullName, contactNumber, emailAddress);
            //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
            location.href = '/contact-list';
          });

          $('#resetForm').on('click', (e) => {
            e.preventDefault();
            //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
            location.href = '/contact-list';
          });

        }
        break;
      default:
        {
          // Get Contact Information from LocalStorage
          let contact = new core.Contact();
          contact.deserialize(localStorage.getItem(page) as string);

          // Display the Contact Information in the form
          $('#fullName').val(contact.FullName);
          $('#emailAddress').val(contact.EmailAddress);
          $('#contactNumber').val(contact.ContactNumber);

          // Perform Validation
          validateContactForm();

          // When Edit is Pressed, update the Contact
          $('#submitForm').on('click', function(e) {
            e.preventDefault();

            // Get Changes from the form
            contact.FullName = $('#fullName').val() as string;
            contact.EmailAddress = $('#emailAddress').val() as string;
            contact.ContactNumber = $('#contactNumber').val() as string;

            // Replace Item in Local Storage
            localStorage.setItem(page, contact.serialize() as string);

            //Return to the Contact List
            //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
            location.href = '/contact-list';
          });

          $('#resetForm').on('click', (e) => {
            e.preventDefault();
            //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
            location.href = '/contact-list';
          });

        }
        break;
    }

    // Retrieve Contact from Local Storage

    // Fill in fields



  }

  /**
   * Validates user input from the Contact Us From. Errors result in error messaging displayed to the user.
   * 
   * @param {string} inputFieldID 
   * @param {RegExp} validationExpression 
   * @param {string} errorMessage 
   */
  function validateField(inputFieldID: string, validationExpression: RegExp, errorMessage: string) {
    
    let messageArea = $('#messageArea').hide();

    $(`#${inputFieldID}`).on('blur', function() {
      
      let inputFieldText = $(this).val() as string; // Get Value of the Text input, but trim whitespace from start/end of string
      inputFieldText = inputFieldText.trim();
      console.log(inputFieldText);
      if(!validationExpression.test(inputFieldText))
        {
          messageArea.addClass('alert alert-danger').text(`${errorMessage}`).show();
          //$(this).trigger('focus');   // Was not working with Firefox without SetTimeout
          //$(this).trigger('select');  // Was not working with Firefox without SetTimeout
          $('#submitForm').attr('disabled', 'true');
        }
        else{
          messageArea.removeAttr('class').hide();
          $('#submitForm').removeAttr('disabled');
        }
      });

  }

  function validateContactForm(): void {
    validateField('fullName', /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})([\s,-]([A-Z][a-z]{1,}))*[\s,-]([A-Z][a-z]{1,})$/, "Please Enter a valid Full Name");
    validateField('contactNumber', /^(([+][0-9]{1,3}[\s-.])?([(][0-9]{3}[)]-?[0-9]{3}-?[0-9]{4}))?([0-9]{3}.?[0-9]{3}.?[0-9]{4})?$/, "Please Enter a valid Contact Number");
    validateField('emailAddress', /^[a-xA-z0-9._-]+@[a-xA-z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please Enter a valid Email Address");
  }

  function displayLoginPage(): void {
    console.log('Login Page loaded');

    let messageArea = $('#messageArea');
    messageArea.hide();

    //AddLinkEvents('register'); - Depreciated, routing is now handled on the backend

    $('#loginButton').on('click', function(e) {
      e.preventDefault();
      let success = false;

      // Create Empty User Object
      let newUser = new core.User();

      // Attempt to match login Criteria
      $.get('./Data/users.json', function(data) {
        let username = document.forms[0].username.value;
        let password = document.forms[0].password.value;
        
        for (const user of data.users) {
          if(username == user.Username && password == user.Password)
            {
              console.log(`${username.value}, ${password.value}`);
              console.log(`${user.Username}, ${user.Password}`);
              newUser.fromJSON(user);
              success = true;
              break;
            }
          
        }
        // If Success Login
      if(success)
        {
          // Set User in Session
          sessionStorage.setItem('user', newUser.serialize() as string);
          // Remove/Hide Error Messaging
          messageArea.removeAttr('class').show();
          // Redirect User to secure area of the site
          //LoadLink('contact-list'); - Depreciated, routing is now handled on the backend
            location.href = '/contact-list';
        }
        else
        { 
          $('#username').trigger('focus').trigger('select');
          messageArea.addClass('alert alert-danger').text('Error: Invalid Login').show();
        }
      });
    });

    $('#cancelButton').on('click',  (e) => {
      e.preventDefault();
      // Clear Login form
      document.forms[0].reset(); // Quickly Reset the first form found on the page
      //LoadLink('home'); - Depreciated, routing is now handled on the backend
      location.href = '/home';

    });
  }

  function CheckLogin(): void {
    // Check Session Storage for logged in User
    if (sessionStorage.getItem('user')) {

      $('#navLogin').html(
        `<li id="navLogout" class="nav-item px-1">
          <a class="nav-link" href="#">
          <i class="fas fa-sign-out-alt"></i>
          Sign Out
          </a>
        </li>`
      );

      $('#navLogout').on('click', function() {
        sessionStorage.clear();
        $('#navLogin').html(
          `<a class="nav-link" data="login">
            <i class="fas fa-sign-in-alt"></i>
            Login
          </a>`
        );
        //LoadHeader();  - Depreciated, routing is now handled on the backend
        //LoadLink('home'); - Depreciated, routing is now handled on the backend
        location.href = '/home';
      });
      
    }
  }

  function displayRegisterPage(): void {
    console.log('Register Page loaded');
    //AddLinkEvents('login'); - Depreciated, routing is now handled on the backend
  }

  /**
   * Adds a new core.Contact Object to Local Storage
   * @param {string} fullName 
   * @param {string} contactNumber 
   * @param {string} emailAddress 
   */
  function addContact(fullName: string, contactNumber: string, emailAddress: string): void {

    let newContact: core.Contact = new core.Contact(fullName, contactNumber, emailAddress);      
    if (newContact.serialize())
      {
        let key = newContact.FullName.substring(0,1) + Date.now();  
        localStorage.setItem(key, newContact.serialize() as string);
      }
  }


  // Listen for the Window to load, then, and only then, run the Start() function
  window.addEventListener("load", Start);
})();
