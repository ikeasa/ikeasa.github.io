(function () {
    'use strict';
    console.log('redirect loaded');

    var PrevURL = document.referrer;
    //shopping list AR
    if (
        PrevURL === 'https://securem.ar.ikea.com/sa/ar/login/' &&
        window.location.href.indexOf('/sa/ar/shoppinglist/') > -1
    ) {
        window.location.href = 'https://securema.ikea.com/ksawebapp/profile';
    }
    //shopping list EN
    if (
        PrevURL === 'https://securem.ikea.com/sa/en/login/' &&
        window.location.href.indexOf('/sa/en/shoppinglist/') > -1
    ) {
        window.location.href = 'https://securema.ikea.com/ksawebapp/profile';
    }

    //Registration AR sa/ar/login/create/
    if (window.location.href.indexOf('/login/create/') > -1) {
        window.location.href =
            'https://securema.ikea.com/ksawebapp/users/signup/personalInfo';
    }

    //Mobile Site Checkout Redirection
    var newCheckoutLink = 'https://securema.ikea.com/ksawebapp/checkout';
    if (
        window.location.href.indexOf('mcommerce/shoppingcart') > -1 ||
        window.location.href.indexOf(
            'webapp/wcs/stores/servlet/OrderItemDisplayMobile'
        ) > -1
    ) {
        const shopRowTop = document.querySelector('#shopRowTop');
        if (shopRowTop) {
            shopRowTop.action = newCheckoutLink;
        }

        const shopRowBottom = document.querySelector('#shopRowBottom');
        if (shopRowBottom) {
            shopRowBottom.action = newCheckoutLink;
        }

        var checkoutbuttonTop = document.querySelector(
            "#checkoutButtonBoxTop input[type='submit']"
        );
        if (checkoutbuttonTop) {
            checkoutbuttonTop.onclick = function () {
                var changeForm = document.querySelector('#shopRowTop');
                changeForm.action = newCheckoutLink;
                changeForm.submit();
            };
        }

        var checkoutbuttonBottom = document.querySelector(
            "#checkoutButtonBoxBottom input[type='submit']"
        );
        if (checkoutbuttonBottom) {
            checkoutbuttonBottom.onclick = function () {
                var changeForm = document.querySelector('#shopRowBottom');
                changeForm.action = newCheckoutLink;
                changeForm.submit();
            };
        }
    }
    // My Account Script Start
    var grabtag = document.createElement('button');
    grabtag.id = 'Grab';
    grabtag.addEventListener('click', function () {
        Login.logout();
        return false;
    });
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var userstate = 0;
    for (var i = 0; i < ca.length; i++) {
        if (ca[i].indexOf('Logout') >= 0) {
            grabtag.click();
            document.cookie =
                'Logout=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
            imagaccount.src =
                'https://securema.ikea.com/ksawebapp/assets/my_account.svg';
            accountButton.appendChild(imagaccount);
            maintag.appendChild(accountButton);
            document
                .getElementById('ikea-topbar-iconcell')
                .appendChild(maintag);
        }
    }
    // My Account script End

    // Force MP_LANG to be set based on current UI language
    if (window.location.href.indexOf('ar.ikea.com') > -1) {
        setCookie('MP_LANG', 'ar', 365);
    } else {
        setCookie('MP_LANG', 'en', 365);
    }

    // A function to set our cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie =
            cname + '=' + cvalue + ';' + expires + ';path=/;domain=.ikea.com';
    }
})();

(function () {
    'use strict';
    console.log('reskin loaded');

    const langs = document.documentElement.lang.toLocaleLowerCase().split('-');
    const lang = langs[0] == 'ar' ? 'ar' : 'en';

    function __(english) {
        const arabic = {
            Products: 'المنتجات',
            Rooms: 'الغرف',
            IDEAS: 'الأفكار',
            "What's new": 'جديدنا',
            'Shopping list': 'قائمة التسوق',
            'Shopping bag': 'عربة التسوق',
            'This is IKEA': 'هذه هي ايكيا',
            'About IKEA': 'عن ايكيا',
            'Democratic design': 'التصميم الديمقراطي',
            'Sustainable everyday': 'الاستدامة اليومية',
            'Community engagement': 'المشاركة المجتمعية',
            'Working at IKEA': 'العمل في ايكيا',
            'Customer service': 'خدمة العملاء',
            'About services': 'معلومات عن الخدمات',
            'About shopping': 'معلومات عن التسوق',
            'Return policy': 'سياسة الإرجاع',
            'Contact us': 'اتصل بنا',
            FAQ: 'الأسئلة المتكررة',
            'Useful links': 'روابط مفيدة',
            'IKEA Business': 'ايكيا الأعمال',
            'IKEA Catalogue and brochures': 'الكاتالوغ والبروشورات',
            'Planning tools': 'برامج التخطيط',
            'IKEA Restaurant': 'مطعم ايكيا',
            'IKEA Stores': 'معارض ايكيا',
            'General information': 'معلومات عامة',
            'Privacy policy': 'سياسة الخصوصية',
            'Cookies policy': 'سياسة الكوكيز',
            'My profile': 'صفحتي الشخصية',

            'https://secure.ikea.com/webapp/wcs/stores/servlet/LogonForm?storeId=39&langId=-49':
                'https://secure.ar.ikea.com/sa/ar/webapp/wcs/stores/servlet/LogonForm?storeId=39&langId=-49',
        };

        return lang == 'ar' ? arabic[english] : english;
    }

    function ready(fn) {
        if (
            document.attachEvent
                ? document.readyState === 'complete'
                : document.readyState !== 'loading'
        ) {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function modifyHeaderFooter() {
        const baseURL = '/sa/' + lang + '/';
        const $body = jQuery('body');
        const www = lang == 'ar' ? 'ar' : 'www';

        // HTML code taken from M2 homepage
        const headerContent =
            '<div class="header__content">' +
            '<a href="' +
            baseURL +
            '" class="head__logo"><img class="svg-icon" src="https://www.ikea.com/sa/en/static/ikea-logo.f88b07ceb5a8c356b7a0fdcc9a563d63.svg" alt="IKEA" title="IKEA"><span class="header__sr-only">IKEA</span></a>' +
            '<nav class="header__navigation" role="navigation"><ul class="desktop-menu">' +
            '<li class="desktop-menu__item"><a href="https://www.ikea.com/sa/' +
            lang +
            '/campaigns/far-more-than-low-price-pub23485790" class="desktop-menu__link"><span class="desktop-menu__title">' +
            __('Products') +
            '</span></a></li>' +
            '<li class="desktop-menu__item"><a href="' +
            baseURL +
            'rooms/" class="desktop-menu__link"><span class="desktop-menu__title">' +
            __('Rooms') +
            '</span></a></li>' +
            '<li class="desktop-menu__item"><a href="' +
            baseURL +
            'ideas/" class="desktop-menu__link"><span class="desktop-menu__title">' +
            __('IDEAS') +
            '</span></a></li>' +
            '<li class="desktop-menu__item"><a href="' +
            baseURL +
            'news/" class="desktop-menu__link"><span class="desktop-menu__title">' +
            __("What's new") +
            '</span></a></li>' +
            '</ul>' +
            '<ul class="header__icon-list header__icon-count-3">' +
            '<li class="header__icon-list-item"><a class="header__icon-list-item-link" href="' +
            __(
                'https://secure.ikea.com/webapp/wcs/stores/servlet/LogonForm?storeId=39&langId=-49'
            ) +
            '"><div class="header__icon-list-item-icon">' +
            '<svg class="hnf-svg-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,12H9a5,5,0,0,0-5,5v4H20V17A5,5,0,0,0,15,12Zm3,7H6V17a3,3,0,0,1,3-3h6a3,3,0,0,1,3,3Zm-6-8A4,4,0,1,0,8,7,4,4,0,0,0,12,11Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,12,5Z"></path></svg>' +
            '</div><span class="header__icon-list-item-text">' +
            __('My profile') +
            '</span></a></li>' +
            '<li class="header__icon-list-item"><a class="header__icon-list-item-link" href="https://order.ikea.com/sa/' +
            lang +
            '/checkout/shoppinglist"><div class="header__icon-list-item-icon">' +
            '<svg class="hnf-svg-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,14l2-2V22H2V2H16L14,4H4V20H16ZM12,6H6V8h6ZM6,12H8V10H6Zm-.23,6.29,4.66-2.05L22,4.66,19.34,2,7.72,13.73Z"></path></svg>' +
            '</div><span class="header__icon-list-item-text">' +
            __('Shopping list') +
            '</span></a></li>' +
            '<li class="header__icon-list-item"><a class="header__shopping-cart header__icon-list-item-link" href="https://' +
            www +
            '.ikea.com/sa/' +
            lang +
            '/mcommerce/shoppingcart"><div class="header__icon-list-item-icon js-shopping-cart-icon" data-market-code="en-SA">' +
            '<svg class="hnf-svg-icon" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.677 10l-1.245-3.114L12.646 5h-1.292L8.568 6.886 7.323 10H2l2.544 7.633A2 2 0 0 0 6.441 19h11.117a2 2 0 0 0 1.898-1.368L22 10zm-6-3h2.646l1.2 3H9.477zm6.881 10H6.441l-1.666-5h14.45z"></path></svg>' +
            '<span class="header__shopping-bag-quantity" style="display: none"></span></div><span class="header__icon-list-item-text">' +
            __('Shopping bag') +
            '</span></a></li>' +
            '</ul></nav></div>';

        // headerContent = '<a href="https://www.ikea.com/sa/en/">IKEA</a>';
        // insert header HTML code into page
        $body.prepend(
            jQuery(
                '<header id="m2-navigation" class="header" role="banner">' +
                    headerContent +
                    '</header>'
            )
        );

        var $trustMarks = jQuery('#trustMarksWrapper');
        if ($trustMarks) {
            $trustMarks.html(
                '<img alt="mada" src="https://m.ikea.com/ms/en_SA/img/payment_methods/mada.png"> <img alt="visa card" src="https://m.ikea.com/ms/en_SA/img/payment_methods/visa_card.png"> <img alt="master card" src="https://m.ikea.com/ms/en_SA/img/payment_methods/master_card.png"> <img alt="installment" src="https://m.ikea.com/ms/en_SA/img/payment_methods/installment.png">'
            );
        }

        // show shopping-cart counter
        if (
            typeof utag !== 'undefined' &&
            utag['data']['cp.IRMW_CART_COUNT_AE'] !== 'undefined'
        ) {
            var cartItems = parseInt(utag['data']['cp.IRMW_CART_COUNT_AE']);

            if (cartItems > 0) {
                jQuery('.header__shopping-bag-quantity').text(cartItems).show();
            } else {
                jQuery('.header__shopping-bag-quantity').hide();
            }
            if (
                document.location.pathname.indexOf(
                    '/wcs/stores/servlet/mOrderItemDisplayView'
                ) > -1
            ) {
                jQuery('.header__shopping-bag-quantity').hide();
            }
        }

        var currentYear = new Date().getFullYear();

        /**
         * Replaces the old IRW footer with a new M2 footer
         */
        const footerMenuStyle = lang == 'ar' ? 'style="text-align: right"' : '';

        var footerHtml =
            '<nav class="footer__nav">' +
            '<ul class="footer__list">' +
            '<li class="footer__list-item" ' +
            footerMenuStyle +
            '>' +
            '<h2 class="footer__item-headline">' +
            __('This is IKEA') +
            '</h2>' +
            '<ul class="footer__inner-list">' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'this-is-ikea/" class="footer__item-link">' +
            __('About IKEA') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'this-is-ikea/design/" class="footer__item-link">' +
            __('Democratic design') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'this-is-ikea/sustainable-everyday/" class="footer__item-link">' +
            __('Sustainable everyday') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'this-is-ikea/community-engagement/" class="footer__item-link">' +
            __('Community engagement') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'this-is-ikea/work-with-us/" class="footer__item-link">' +
            __('Working at IKEA') +
            '</a></li>' +
            '</ul>' +
            '</li>' +
            '<li class="footer__list-item" ' +
            footerMenuStyle +
            '>' +
            '<h2 class="footer__item-headline">' +
            __('Customer service') +
            '</h2>' +
            '<ul class="footer__inner-list">' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/services/" class="footer__item-link">' +
            __('About services') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/shopping-at-ikea/" class="footer__item-link">' +
            __('About shopping') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/returns-claims/return-policy/" class="footer__item-link">' +
            __('Return policy') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/contact-us/" class="footer__item-link">' +
            __('Contact us') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/faq/" class="footer__item-link">' +
            __('FAQ') +
            '</a></li>' +
            '</ul>' +
            '</li>' +
            '<li class="footer__list-item" ' +
            footerMenuStyle +
            '>' +
            '<h2 class="footer__item-headline">' +
            __('Useful links') +
            '</h2>' +
            '<ul class="footer__inner-list">' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'ikea-business/" class="footer__item-link">' +
            __('IKEA Business') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/catalogues/" class="footer__item-link">' +
            __('IKEA Catalogue and brochures') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'planners/" class="footer__item-link">' +
            __('Planning tools') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'stores/restaurant/" class="footer__item-link">' +
            __('IKEA Restaurant') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'stores/" class="footer__item-link">' +
            __('IKEA Stores') +
            '</a></li>' +
            '</ul>' +
            '</li>' +
            '<li class="footer__list-item" ' +
            footerMenuStyle +
            '>' +
            '<h2 class="footer__item-headline">' +
            __('General information') +
            '</h2>' +
            '<ul class="footer__inner-list">' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/privacy-policy/" class="footer__item-link">' +
            __('Privacy policy') +
            '</a></li>' +
            '<li class="footer__inner-item"><a href="' +
            baseURL +
            'customer-service/cookie-policy/" class="footer__item-link">' +
            __('Cookies policy') +
            '</a></li>' +
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
            '</a></li></ul></nav><div class="footer__copyright">© Inter IKEA Systems B.V 1999-' +
            currentYear +
            '</div>';

        $body.append(
            jQuery(
                '<footer id="m2-footer" class="footer" role="contentinfo">' +
                    footerHtml +
                    '</footer>'
            )
        );
        //jQuery('body').show();
    }

    ready(function () {
        if (
            document.location.pathname.indexOf('mcommerce/shoppingcart') > -1 ||
            document.location.pathname.indexOf(
                '/wcs/stores/servlet/OrderItemDisplayMobile'
            ) > -1 ||
            document.location.pathname.indexOf(
                '/wcs/stores/servlet/mOrderItemDisplayView'
            ) > -1
        ) {
            // add a viewport meta tag to enable correct display on mobile devices
            var viewPortTag = document.createElement('meta');
            viewPortTag.id = 'viewport';
            viewPortTag.name = 'viewport';
            viewPortTag.content =
                'width=device-width, initial-scale=1, shrink-to-fit=no';
            //document.getElementsByTagName('head')[0].appendChild(viewPortTag);

            // prelace IRW header/footer with M2 header/footer
            jQuery(
                '#backtotop_wrapper, #menu, .MCbar_header, .ikea-footer, #ikea-homeheader'
            ).hide();
            // document.getElementById('ikea-footer').classList.add('hideit');
            modifyHeaderFooter();
            //addPaymentLogo();
        } else if (
            document.location.pathname.indexOf('/webapp/wcs/stores/') > -1
        ) {
            // add a viewport meta tag to enable correct display on mobile devices
            var viewPortTag = document.createElement('meta');
            viewPortTag.id = 'viewport';
            viewPortTag.name = 'viewport';
            viewPortTag.content =
                'width=device-width, initial-scale=1, shrink-to-fit=no';
            document.getElementsByTagName('head')[0].appendChild(viewPortTag);

            // prelace IRW header/footer with M2 header/footer
            jQuery('#backtotop_wrapper, #menu, .MCbar_header').hide();
            var footerHolder = document.getElementById('footer');
            if (footerHolder != null)
                document.getElementById('footer').classList.add('hideit');
            modifyHeaderFooter();
        }
    });
})();
