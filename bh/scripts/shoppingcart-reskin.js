(function () {
    'use strict';
    console.log('redirect loaded');
  
    var PrevURL = document.referrer;
    //shopping list AR
    if ((PrevURL === 'https://securem.ar.ikea.com/bh/ar/login/') && (window.location.href.indexOf("/bh/ar/shoppinglist/") > -1)) {
        window.location.href = "https://securema.ikea.com/ksawebapp/profile";
    }
    //shopping list EN
    if ((PrevURL === 'https://securem.ikea.com/bh/en/login/') && (window.location.href.indexOf("/bh/en/shoppinglist/") > -1)) {
        window.location.href = "https://securema.ikea.com/ksawebapp/profile";
    }
  
    //Registration AR bh/ar/login/create/
    if (window.location.href.indexOf("/login/create/") > -1) {
        window.location.href = "https://securema.ikea.com/ksawebapp/users/signup/personalInfo";
    }
  
    //Mobile Site Checkout Redirection
    var newCheckoutLink = "https://securema.ikea.com/ksawebapp/checkout";
    if (window.location.href.indexOf("mcommerce/shoppingcart") > -1 || window.location.href.indexOf("webapp/wcs/stores/servlet/OrderItemDisplayMobile") > -1) {
  
      const shopRowTop = document.querySelector("#shopRowTop");
      if (shopRowTop) {
          shopRowTop.action = newCheckoutLink;
      }
      
      const shopRowBottom = document.querySelector("#shopRowBottom");
      if (shopRowBottom) {
        shopRowBottom.action = newCheckoutLink;
      }
      
      var checkoutbuttonTop = document.querySelector("#checkoutButtonBoxTop input[type='submit']");
      if (checkoutbuttonTop) {
        checkoutbuttonTop.onclick = function () {
          var changeForm = document.querySelector("#shopRowTop");
          changeForm.action = newCheckoutLink;
          changeForm.submit();
        };
      }
      
      var checkoutbuttonBottom = document.querySelector("#checkoutButtonBoxBottom input[type='submit']");
      if (checkoutbuttonBottom) {
        checkoutbuttonBottom.onclick = function () {
          var changeForm = document.querySelector("#shopRowBottom");
          changeForm.action = newCheckoutLink;
          changeForm.submit();
        };
      }
    }
    // My Account Script Start
    var grabtag = document.createElement('button');
    grabtag.id = 'Grab';
    grabtag.addEventListener("click", function () {
        Login.logout(); return false;
    });
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var userstate = 0;
    for (var i = 0; i < ca.length; i++) {
        if (ca[i].indexOf('Logout') >= 0) {
            grabtag.click();
            document.cookie = "Logout=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        if (ca[i].indexOf('IRMW_USER_ID_SA') >= 0) {
            userstate = 1;
        }
    }
  
    if (userstate == 1) {
        if (!document.getElementById('account-icon')) {
            var maintag = document.createElement('div');
            maintag.id = 'account-icon';
            maintag.width = '30px';
            maintag.height = '30px';
            var accountButton = document.createElement('a');
  
            accountButton.href = 'https://securema.ikea.com/ksawebapp/profile';
            var imagaccount = document.createElement('img');
            imagaccount.style.width = '30px';
            imagaccount.style.height = '30px';
            imagaccount.src = "https://securema.ikea.com/ksawebapp/assets/my_account.svg";
            accountButton.appendChild(imagaccount);
            maintag.appendChild(accountButton);
            document.getElementById('ikea-topbar-iconcell').appendChild(maintag);
        }
    }
    // My Account script End
  
  
    // Force MP_LANG to be set based on current UI language
    if (window.location.href.indexOf("ar.ikea.com") > -1) {
        setCookie("MP_LANG", "ar", 365);
    }
    else {
        setCookie("MP_LANG", "en", 365);
    }
  
  
    // A function to set our cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=.ikea.com";
    }
  
  })();
  
  (function() {
      'use strict';
      console.log('reskin loaded');
      
      const langs = document.documentElement.lang.toLocaleLowerCase().split('-');
      
      function ready(fn) {
        if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }
  
      function modifyHeaderFooter() {
          const lang = (langs[0] == 'ar')? 'ar' : 'en';
  
          const baseURL = 'https://www.ikea.com/bh/' + lang + '/',
              $body = jQuery('body');
          //var localStorageSetval = localStorage.getItem('setval') || null;
  
          // HTML code taken from M2 homepage
          var headerContent =
              '<div class="header__content">' +
              '<a href="' + baseURL + '" class="header__logo"><img class="svg-icon" src="' + baseURL + 'static/ikea-logo.f88b07ceb5a8c356b7a0fdcc9a563d63.svg" alt="IKEA" title="IKEA"><span class="header__sr-only">IKEA</span></a>' +
              '<nav class="header__navigation" role="navigation"><ul class="desktop-menu">' +
              '<li class="desktop-menu__item"><a href="' + baseURL + 'cat/products-products/" class="desktop-menu__link"><span class="desktop-menu__title">Products</span></a></li>' +
              '<li class="desktop-menu__item"><a href="' + baseURL + 'rooms/" class="desktop-menu__link"><span class="desktop-menu__title">Rooms</span></a></li>' +
              '<li class="desktop-menu__item"><a href="' + baseURL + 'ideas/" class="desktop-menu__link"><span class="desktop-menu__title">IDEAS</span></a></li>' +
              '<li class="desktop-menu__item"><a href="' + baseURL + 'news/" class="desktop-menu__link"><span class="desktop-menu__title">What\'s new</span></a></li>' +
              '</ul><ul class="header__icon-list header__icon-count-3">' +
              '<li class="header__icon-list-item"><a class="header__icon-list-item-link" href="https://order.ikea.com/bh/en/checkout/shoppinglist"><div class="header__icon-list-item-icon">' +
              '<svg class="hnf-svg-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,14l2-2V22H2V2H16L14,4H4V20H16ZM12,6H6V8h6ZM6,12H8V10H6Zm-.23,6.29,4.66-2.05L22,4.66,19.34,2,7.72,13.73Z"></path></svg>' +
              '</div><span class="header__icon-list-item-text">Shopping list</span></a></li>' +
              '<li class="header__icon-list-item"><a class="header__shopping-cart header__icon-list-item-link" href="https://secure.ikea.com/bh/en/mcommerce/shoppingcart"><div class="header__icon-list-item-icon js-shopping-cart-icon" data-market-code="en-SA">' +
              '<svg class="hnf-svg-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.677 10l-1.245-3.114L12.646 5h-1.292L8.568 6.886 7.323 10H2l2.544 7.633A2 2 0 0 0 6.441 19h11.117a2 2 0 0 0 1.898-1.368L22 10zm-6-3h2.646l1.2 3H9.477zm6.881 10H6.441l-1.666-5h14.45z"></path></svg>' +
              '<span class="header__shopping-bag-quantity" style="display: none"></span></div><span class="header__icon-list-item-text">Shopping bag</span></a></li>' +
              // '<li class="header__icon-list-item header__icon-list-item--menu"><a class="header__icon-list-item-link" href="' +
              // baseURL +
              // 'menu/"><div class="header__icon-list-item-icon"><img src="' +
              // baseURL +
              // 'static/nav-menu.2abb45a57649541b487c058051104b29.svg" alt="Menü" title="Menü"></div><span class="header__icon-list-item-text">Menü</span></a></li>' +
              '</ul></nav></div>';
          // insert header HTML code into page
          $body.prepend(jQuery('<header id="m2-navigation" class="header" role="banner">' + headerContent + '</header>'));
  
          // show shopping-cart counter
          if (typeof utag !== 'undefined' && utag['data']['cp.IRMW_CART_COUNT_AE'] !== 'undefined') {
              var cartItems = parseInt(utag['data']['cp.IRMW_CART_COUNT_AE']);
  
              if (cartItems > 0) {
                  jQuery('.header__shopping-bag-quantity')
                      .text(cartItems)
                      .show();
              } else {
                  jQuery('.header__shopping-bag-quantity').hide();
              }
              if (document.location.pathname.indexOf('/wcs/stores/servlet/mOrderItemDisplayView') > -1) {
                  jQuery('.header__shopping-bag-quantity').hide();
              }
          }
  
          var currentYear = new Date().getFullYear();
          console.log(currentYear);
          /**
           * Replaces the old IRW footer with a new M2 footer
           */
          var footerHtml =
              '<nav class="footer__nav">' + 
              '<ul class="footer__list">' +
                '<li class="footer__list-item">' +
                  '<h2 class="footer__item-headline">This is IKEA</h2>' +
                  '<ul class="footer__inner-list">' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'this-is-ikea/" class="footer__item-link">About IKEA</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'this-is-ikea/design/" class="footer__item-link">Democratic design</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'this-is-ikea/sustainable-everyday/" class="footer__item-link">Sustainable everyday</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'this-is-ikea/community-engagement/" class="footer__item-link">Community engagement</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'this-is-ikea/work-with-us/" class="footer__item-link">Working at IKEA</a></li>' +
                  '</ul>' +
                '</li>' +
  
                '<li class="footer__list-item">' +
                  '<h2 class="footer__item-headline">Customer service</h2>' +
                  '<ul class="footer__inner-list">' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/services/" class="footer__item-link">About services</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/shopping-at-ikea/" class="footer__item-link">About shopping</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/returns-claims/return-policy/" class="footer__item-link">Return policy</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/contact-us/" class="footer__item-link">Contact us</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/faq/" class="footer__item-link">FAQ</a></li>' +
                  '</ul>' +
                '</li>' +
  
                '<li class="footer__list-item">' +
                  '<h2 class="footer__item-headline">Useful links</h2>' +
                  '<ul class="footer__inner-list">' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'ikea-business/" class="footer__item-link">IKEA Business</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/catalogues/" class="footer__item-link">IKEA Catalogue and brochures</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'planners/" class="footer__item-link">Planning tools</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'stores/restaurant/" class="footer__item-link">IKEA Restaurant</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'stores/" class="footer__item-link">IKEA Stores</a></li>' +
                  '</ul>' +
                '</li>' +
                
                '<li class="footer__list-item">' +
                  '<h2 class="footer__item-headline">General information</h2>' +
                  '<ul class="footer__inner-list">' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/privacy-policy/" class="footer__item-link">Privacy policy</a></li>' +
                    '<li class="footer__inner-item"><a href="' + baseURL + 'customer-service/cookie-policy/" class="footer__item-link">Cookies policy</a></li>' +
                  '</ul>' +
                '</li>' +
  
              '</ul>' +
              '</nav>' + 
              
              '<nav class="footer__nav"><ul class="footer__list--plain footer__list--horizontal footer__list--font-normal" role="list">' +
              '<li class="footer__horizontal-list-item footer__horizontal-list-item--social"><a href="https://www.facebook.com/IKEAsaudiarabia/" class="footer__link--white footer__social-link" aria-label="Facebook">' +
              '<svg class="footer__svg-icon footer__svg-icon--social" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.976c-5.51 0-9.976-4.466-9.976-9.976 0-5.51 4.466-9.976 9.976-9.976 5.51 0 9.976 4.466 9.976 9.976 0 5.51-4.466 9.976-9.976 9.976zm.589-4.726v-4.51h1.505l.225-1.757h-1.73V9.862c0-.508.14-.855.866-.855h.925V7.435c-.16-.021-.71-.07-1.348-.07-1.335 0-2.248.82-2.248 2.323v1.296h-1.51v1.757h1.51v4.509h1.805z"></path></svg><span class="footer__inner-item-text">Facebook</span>' +
              '</a></li><li class="footer__horizontal-list-item footer__horizontal-list-item--social"><a href="https://www.instagram.com/ikeasaudiarabia" class="footer__link--white footer__social-link" aria-label="Instagram">' +
              '<svg class="footer__svg-icon footer__svg-icon--social" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.988 2.038c5.494 0 9.949 4.454 9.949 9.95 0 5.494-4.455 9.949-9.95 9.949-5.494 0-9.949-4.455-9.949-9.95 0-5.494 4.455-9.949 9.95-9.949zm5.823 7.68a3.529 3.529 0 0 0-3.528-3.529H9.717A3.529 3.529 0 0 0 6.19 9.717v4.566a3.529 3.529 0 0 0 3.528 3.528h4.566a3.529 3.529 0 0 0 3.528-3.528V9.717zm-.83 0v4.565a2.699 2.699 0 0 1-2.698 2.698H9.717a2.699 2.699 0 0 1-2.698-2.698V9.717A2.699 2.699 0 0 1 9.717 7.02h4.566a2.699 2.699 0 0 1 2.698 2.698zm-1.245-.831a.623.623 0 1 0-1.246 0 .623.623 0 0 0 1.246 0zM14.076 12a2.076 2.076 0 1 1-4.153-.001 2.076 2.076 0 0 1 4.152.001zm.83 0a2.906 2.906 0 1 0-5.813.001A2.906 2.906 0 0 0 14.905 12z"></path></svg><span class="footer__inner-item-text">Instagram</span>' +
              '</a></li><li class="footer__horizontal-list-item footer__horizontal-list-item--social"><a href="https://twitter.com/ikeasaudiarabia" class="footer__link--white footer__social-link" aria-label="Twitter">' +
              '<svg class="footer__svg-icon footer__svg-icon--social" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.979 21.983c-5.525 0-10.004-4.479-10.004-10.004 0-5.525 4.479-10.004 10.004-10.004 5.525 0 10.004 4.479 10.004 10.004 0 5.525-4.479 10.004-10.004 10.004zm6.246-13.878a5.123 5.123 0 0 1-1.472.403 2.57 2.57 0 0 0 1.125-1.418 5.132 5.132 0 0 1-1.627.622 2.566 2.566 0 0 0-4.368 2.338 7.276 7.276 0 0 1-5.28-2.678 2.566 2.566 0 0 0 .793 3.421 2.553 2.553 0 0 1-1.161-.32v.032c0 1.22.86 2.271 2.056 2.513a2.57 2.57 0 0 1-1.158.044 2.566 2.566 0 0 0 2.394 1.78 5.143 5.143 0 0 1-3.797 1.062 7.255 7.255 0 0 0 3.93 1.15c4.714 0 7.292-3.905 7.292-7.292a7.63 7.63 0 0 0-.007-.331 5.209 5.209 0 0 0 1.28-1.326z"></path></svg><span class="footer__inner-item-text">Twitter</span>' +
              '</a></li><li class="footer__horizontal-list-item footer__horizontal-list-item--social"><a href="https://www.youtube.com/user/IKEAsaudia" class="footer__link--white footer__social-link" aria-label="Youtube">' +
              '<svg class="footer__svg-icon footer__svg-icon--social" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.988 2.004c5.513 0 9.983 4.47 9.983 9.984 0 5.513-4.47 9.983-9.983 9.983-5.514 0-9.984-4.47-9.984-9.983 0-5.514 4.47-9.984 9.984-9.984zm6.133 12.218c.14-1.744.14-2.846 0-4.59-.068-.832-.565-1.879-1.581-1.916-2.842-.19-6.21-.243-9.104 0-.898.1-1.513 1.194-1.58 2.024-.143 1.745-.143 2.738 0 4.482.067.83.667 1.93 1.58 2.046 2.928.192 6.277.22 9.104 0 .882-.154 1.513-1.214 1.58-2.046zm-7.381.261V9.492l3.743 2.496-3.743 2.495z"></path></svg><span class="footer__inner-item-text">Youtube</span>' +
              '</a></li></ul></nav><div class="footer__copyright">© Inter IKEA Systems B.V 1999-' + currentYear + '</div>';
  
          $body.append(jQuery('<footer id="m2-footer" class="footer" role="contentinfo">' + footerHtml + '</footer>'));
          //jQuery('body').show();
      }
  
      function addPaymentLogo() {
          var payHtml =
              '<li class="shoppingListpayment ui-li ui-li-static ui-body-d  ui-btn-up-d" style="border: 0px; border-top: 1px solid #ccc !important;">' +
              '<div class="price-layout" style="display: flex;justify-content: space-around;">' +
              '<img alt="we support visa" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RjcwOTQ1RUI2OEYxMUU5Qjg5M0JDMUEwNTFGNEZGQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RjcwOTQ1RkI2OEYxMUU5Qjg5M0JDMUEwNTFGNEZGQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZGNzA5NDVDQjY4RjExRTlCODkzQkMxQTA1MUY0RkZBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZGNzA5NDVEQjY4RjExRTlCODkzQkMxQTA1MUY0RkZBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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"></img>' +
              '<img alt="we support master card" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3M0Q0QzcwQkI2OEYxMUU5QUNEN0UxMEQ4QkRFRjM4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3M0Q0QzcwQ0I2OEYxMUU5QUNEN0UxMEQ4QkRFRjM4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczRDRDNzA5QjY4RjExRTlBQ0Q3RTEwRDhCREVGMzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjczRDRDNzBBQjY4RjExRTlBQ0Q3RTEwRDhCREVGMzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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">' +
              '<img alt="we support amex" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RUE0RjA5RUI2OEYxMUU5OUYwQUMxRDVCNjBGOEU1QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RUE0RjA5RkI2OEYxMUU5OUYwQUMxRDVCNjBGOEU1QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQTRGMDlDQjY4RjExRTk5RjBBQzFENUI2MEY4RTVBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFQTRGMDlEQjY4RjExRTk5RjBBQzFENUI2MEY4RTVBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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">' +
              '<img alt="we support jcb" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0NSA3OS4xNjM0OTksIDIwMTgvMDgvMTMtMTY6NDA6MjIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MjFGNUY2OEI2OEYxMUU5QkJCMUVDMkUxNkU4NkYwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MjFGNUY2OUI2OEYxMUU5QkJCMUVDMkUxNkU4NkYwRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjgyMUY1RjY2QjY4RjExRTlCQkIxRUMyRTE2RTg2RjBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjgyMUY1RjY3QjY4RjExRTlCQkIxRUMyRTE2RTg2RjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEB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">' +
              '</div></li>' +
              '<li class="shoppingListServices ui-li ui-li-static ui-body-d  ui-btn-up-d ui-corner-bottom ui-li-last" style="border: 0px; border-bottom: 1px solid #ccc !important;">' +
              '<div class="price-layout" style="display: flex;justify-content: space-around;">' +
              '<span style="text-align: center;font-weight: bold;">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 24 24" style="">' +
              '<path d="M9.845 12.572c-.163 0-.326-.021-.468-.054v.658c.136.028.37.039.522.039 1.617 0 1.949-1.165 1.949-2.28 0-1.165-.626-1.704-1.421-1.704-.81 0-1.322.506-1.322 1.35 0 .783.43 1.23 1.094 1.23.495 0 .707-.197.86-.452h.032c-.032.718-.277 1.213-1.246 1.213m.582-1.393c-.353 0-.528-.233-.528-.61 0-.467.224-.68.544-.68.387 0 .588.392.588.752 0 .26-.239.538-.604.538m4.53.039c0-1.263-.43-2.003-1.361-2.003-.995 0-1.355.746-1.355 2.003 0 1.25.42 1.997 1.355 1.997.996 0 1.361-.746 1.361-1.997m-1.361 1.333c-.413 0-.538-.447-.538-1.333 0-.888.125-1.34.538-1.34.408 0 .545.452.545 1.34 0 .892-.137 1.333-.545 1.333M22 9.8c0 1.81-1.087 3.33-2.718 5.058-.817.863-2.438 2.243-3.946 3.478l-1.421-1.422c1.549-1.266 3.163-2.637 3.914-3.43C19.391 11.83 20 10.798 20 9.8 20 7.705 18.407 6 16.448 6 13 6 12 9 12 9s-1-3-4.359-3C5.701 6 4 7.776 4 9.8c0 .949.136 1.945 1.78 3.685.672.71 2.117 1.892 3.595 3.04V15h2v5h-5v-2h1.62l.007-.008c-1.459-1.138-2.932-2.347-3.675-3.133C2.396 12.815 2 11.359 2 9.8 2 6.656 4.583 4 7.641 4 11 4 12 6 12 6s1-2 4.448-2C19.51 4 22 6.602 22 9.8" fill="#111"></path></svg>' +
              '<br>90 Days <br> return policy</span>' +
              '<span style="text-align: center;font-weight: bold;">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="48" viewBox="0 0 24 24">' +
              '<path d="M22,11.81,20,11,17,8H14V6H2V17H5.21a2.12,2.12,0,0,0,4,0h5.94a2.12,2.12,0,0,0,4,0H22ZM8.89,15a2.08,2.08,0,0,0-3.32,0H4V8h8v7ZM20,15H18.86a2.11,2.11,0,0,0-3-.37,2.16,2.16,0,0,0-.37.37H14V10h2l2,2,2,1Z" fill="#111"></path></svg>' +
              '<br>Free delivery <br> across UAE</span>' +
              '</div></li>' +
              '<li class="shoppingListSecure ui-li ui-li-static ui-body-d  ui-btn-up-d ui-corner-bottom ui-li-last" style="border: 0px;min-height: 70px;">' +
              '<div class="price-layout" style="display: flex;justify-content: space-around;">' +
              '<span style="text-align: center;font-weight: bold;">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24"><path d="M10.44,19,11,16.59a1.5,1.5,0,1,1,2.12-.07l-.08.07L13.56,19ZM20,11V22H4V11H5V10a7,7,0,0,1,14,0v1ZM7,11H17V10A5,5,0,0,0,7,10Zm11,2H6v7H18Z" fill="#111"></path></svg>' +
              'Secure purchases with SSL data</span>' +
              '</div></li>';
          jQuery('#ikea-shoppinglist-list').append(payHtml);
      }
  
      ready(function() {
          if (
              document.location.pathname.indexOf('mcommerce/shoppingcart') > -1 ||
              document.location.pathname.indexOf('/wcs/stores/servlet/OrderItemDisplayMobile') > -1 ||
              document.location.pathname.indexOf('/wcs/stores/servlet/mOrderItemDisplayView') > -1
          ) {
              // add a viewport meta tag to enable correct display on mobile devices
              var viewPortTag = document.createElement('meta');
              viewPortTag.id = 'viewport';
              viewPortTag.name = 'viewport';
              viewPortTag.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
              document.getElementsByTagName('head')[0].appendChild(viewPortTag);
  
              // prelace IRW header/footer with M2 header/footer
              jQuery('#backtotop_wrapper, #menu, .MCbar_header, .ikea-footer, #ikea-homeheader').hide();
              // document.getElementById('ikea-footer').classList.add('hideit');
              modifyHeaderFooter();
              //addPaymentLogo();
          } else if (document.location.pathname.indexOf('/webapp/wcs/stores/') > -1) {
              // add a viewport meta tag to enable correct display on mobile devices
              var viewPortTag = document.createElement('meta');
              viewPortTag.id = 'viewport';
              viewPortTag.name = 'viewport';
              viewPortTag.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
              document.getElementsByTagName('head')[0].appendChild(viewPortTag);
  
              // prelace IRW header/footer with M2 header/footer
              jQuery('#backtotop_wrapper, #menu, .MCbar_header').hide();
              var footerHolder = document.getElementById('footer');
              if (footerHolder != null) document.getElementById('footer').classList.add('hideit');
              modifyHeaderFooter();
          }
  
          // add delete profile information to my profile page
          // if (document.location.pathname === '/webapp/wcs/stores/servlet/MyProfile') {
          //     var refNodesUser = document.getElementsByClassName('ppContent');
  
          //     if (refNodesUser.length > 0) {
          //         var divUser = document.createElement('div');
          //         divUser.innerHTML = '<p class="ext-family-msg"></p>';
  
          //         refNodesUser[0].parentNode.insertBefore(divUser, refNodesUser[0].nextSibling);
          //     }
          // }
  
      });
  });
  