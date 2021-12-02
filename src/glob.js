let getURL = async function (url, success, error) {
    if (!window.XMLHttpRequest) return;
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status !== 200) {
                if (error && typeof error === 'function') {
                    error(request.responseText, request);
                }
                return console.log(request.status);
            }
            if (success && typeof success === 'function') {
                success(request.responseText);
            }
        }
    };
    request.open('GET', url);
    request.send();
},
header = true,
footer = true;
getURL(
    '../glob_elems/header.html',
    function (data) {
        let el = document.createElement('div');
        el.innerHTML = data;
        let fetch = el.querySelector('#g-header');
        let embed = document.querySelector('#header');
        if (!fetch || !embed) return;
        embed.parentNode.replaceChild(fetch, embed);
        /*Active Nav item*/
        const lHref = window.location.href.split('/'),
        linksList = fetch.querySelectorAll('.g-menu');
        function activeNavs(elem) {
            linkHrefs = elem.querySelectorAll('li a');
            for (let i = 0; i < linkHrefs.length; i++) {
                const aHref = linkHrefs[i].href.split('/');
                if (lHref[lHref.length - 1] == aHref[aHref.length - 1]) {
                    linkHrefs[i].classList.add('active');
                    break
                }
            }
        }
        linksList.forEach(item => activeNavs(item));


        const waitingFor = setInterval(() => {
            if (header == false) {
                // Mobile Menu Srcipt
                const sideBar = document.querySelector('.g-m-menu'),
                sideBarOverlay = document.querySelector('.g-menu_overlay'),
                sideBarBtn = document.querySelector('.g-humburger');

                sideBarBtn.addEventListener('click', function () {
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        sideBar.classList.remove('open');
                        sideBarOverlay.classList.remove('open');
                        sideBarOverlay.style.display = 'none'
                        document.documentElement.style.overflow = ''
                    }
                    else {
                        this.classList.add('active');
                        sideBar.classList.add('open');
                        sideBarOverlay.classList.add('open');
                        sideBarOverlay.style.display = '';
                        document.documentElement.style.overflow = 'hidden'
                    }
                });

                //ScrollTop Fixed menu
                const nav = document.querySelectorAll('.g-nav');

                window.addEventListener('scroll', ()=>{
                    if (document.documentElement.scrollTop > 80) {
                        nav.forEach(item => item.classList.add('fix'));
                    }else {
                        nav.forEach(item => item.classList.remove('fix'));
                    }
                })
                clearInterval(waitingFor);
                //Dark Theme
                const themeSwitcher = fetch.querySelectorAll('#theme-switcher input'),
                siteLogo = fetch.querySelectorAll('.g-logo');

                themeSwitcher.forEach(item => {
                    item.addEventListener('click', function () {
                        checkSwitch(this);
                    })
                });
            }
        }, 500);
        return header = false;
    }
);
getURL(
    '../glob_elems/footer.html',
    function (data) {
        let el = document.createElement('div');
        el.innerHTML = data;
        let fetch = el.querySelector('#g-footer');
        let embed = document.querySelector('#footer');
        if (!fetch || !embed) return;
        embed.parentNode.replaceChild(fetch, embed);

        return footer = false;
    }
);
