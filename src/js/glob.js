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
function checkAbsent(elem, fun) {
    if (document.querySelector(elem) != undefined || document.querySelector(elem) != null) {
        fun();
    }
}
let runHeader = function () {
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
                    //PopUp`s
                    let popUpBtns = document.querySelectorAll('.g-pop_up-btn'),
                        popUps = document.querySelectorAll('.g-pop_up');

                    if(popUps == undefined && popUpBtns == undefined || popUps == null && popUpBtns == null) {
                        popUpBtns = document.querySelectorAll('.g-pop_up-btn'),
                        popUps = document.querySelectorAll('.g-pop_up');
                    } else {
                        clearInterval(waitingFor);
                        popUpBtns.forEach((item) =>  popUper(item));
                    }

                    function popUper(elem) {
                        popUps.forEach((item) => {
                            const closeBtn = item.querySelector('.close');
                            closeBtn.addEventListener('click', function () {
                                item.classList.remove('active');
                            })
                        });
                        elem.addEventListener('click', function () {
                            for (let i = 0; i < popUps.length; i++) {
                                if (elem.id == popUps[i].dataset.target) {
                                    popUps[i].classList.add('active');
                                }
                            }
                        })
                    }
                }
            }, 500);
            return header = false;
        }
    );
},
runFooter = function () {
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
},
runBreadCrumbs = function () {
    getURL(
        '/src/glob_elems/bread_crumbs.html',
        function (data) {
            let el = document.createElement('div');
            el.innerHTML = data;
            let fetch = el.querySelector('#g-bread_crumbs');
            let embed = document.querySelector('#bread_crumbs');
            if (!fetch || !embed) return;
            embed.parentNode.replaceChild(fetch, embed);

            return footer = false;
        }
    );
};
runDashSidebar = function () {
    getURL(
        '/src/glob_elems/dash_sidebar.html',
        function (data) {
            let el = document.createElement('div');
            el.innerHTML = data;
            let fetch = el.querySelector('#g-dash_sidebar');
            let embed = document.querySelector('#dash_sidebar');
            if (!fetch || !embed) return;
            embed.parentNode.replaceChild(fetch, embed);

            return footer = false;
        }
    );
};
checkAbsent('#header', runHeader);
checkAbsent('#footer', runFooter);
checkAbsent('#bread_crumbs', runBreadCrumbs);
checkAbsent('#dash_sidebar', runDashSidebar);
