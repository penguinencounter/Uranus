window.addEventListener("load", () => {
    document.getElementById("tab").addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        const configureTab = document.getElementById("configure");
        const tab = document.getElementById("tab");
        if (configureTab.classList.contains("collapsed")) {
            configureTab.classList.remove("collapsed");
            configureTab.classList.add("opened");
            tab.innerHTML = "Close";
        } else {
            configureTab.classList.add("collapsed");
            configureTab.classList.remove("opened");
            tab.innerHTML = "Configure";
        }
    });
});