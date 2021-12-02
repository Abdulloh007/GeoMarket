window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    //Tabination
    const tabination = document.querySelectorAll('.g-tabination');
    //--> Secont Lewel Tabination
    const secontLewelTabination = document.querySelectorAll('.g-nd_tabination');

    function activeTabination(elem, elemNav, elemNavItem, elemTabItem) {
        const tabNav = elem.querySelector(elemNav),
        tabBtns = elem.querySelectorAll(elemNavItem),
        tabs = elem.querySelectorAll(elemTabItem);

        tabNav.addEventListener('click', function () {
            for (let i = 0; i < tabBtns.length; i++) {
                if (event.target == tabBtns[i] || event.target == tabBtns[i].children[0]) {
                    showTab(i);
                }
            }
        })
        showTab(0);
        function showTab(n) {
            tabBtns.forEach((item) => item.classList.remove('active'));
            tabs.forEach((item) => item.classList.remove('active'));
            tabBtns[n].classList.add('active');
            tabs[n].classList.add('active');
        }
    }
    if (tabination !== undefined || tabination !== null || secontLewelTabination != undefined || secontLewelTabination != null) {
        tabination.forEach(item => activeTabination(item, '.g-tab_nav', '.g-tab_nav li', '.g-tab_item'));
        secontLewelTabination.forEach((item) => activeTabination(item, '.g-nd_tab_nav', '.g-nd_tab_nav li', '.g-nd_tab_item'));
    }

    //PopUp`s
    let popUpBtns = document.querySelectorAll('.g-pop_up-btn'),
        popUps = document.querySelectorAll('.g-pop_up');

    function popUper(elem) {
        popUps.forEach((item) => {
            const closeBtn = item.querySelector('.fa-close');
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
    if (popUpBtns != undefined && popUps != undefined) {
        popUpBtns.forEach((item) =>  popUper(item));
    }

    // History backdrop
    let goBackBtn = document.querySelectorAll('.g-go_back');

    goBackBtn.forEach(item => {
        item.addEventListener('click', function () {
            window.history.back();
        })
    });

})
