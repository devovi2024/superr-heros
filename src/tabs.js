

const allTabsBody = document.querySelectorAll('.tab-body-single'); 
const allTabsHead = document.querySelectorAll('.tab-head-single');
let activeTab = 1;

const updateActiveTab = () => {
    allTabsHead.forEach((tab, index) => {
        tab.classList.toggle('active-tab', index + 1 === activeTab);
        allTabsBody[index].classList.toggle('show-tab', index + 1 === activeTab);
    });
};

const initTabs = () => {
    allTabsHead.forEach(tabHead => {
        tabHead.addEventListener('click', () => {
            activeTab = +tabHead.dataset.id;
            updateActiveTab();
        });
    });
};

export { initTabs, updateActiveTab };
