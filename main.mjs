window.addEventListener("load", () => {
    const scheduleList = document.getElementById("all-schedules");

    const toggleTab = () => {
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
    }

    document.getElementById("tab").addEventListener("click", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        toggleTab();
    });

    function checkOverload() {
        for (let i = 0; i < 7; i++) {
            const matches = document.querySelectorAll(`button.day-of-the-week.selected[data-day="${i}"]`).length;
            const allTargets = document.querySelectorAll(`button.day-of-the-week[data-day="${i}"]`);
            if (matches > 1) {
                allTargets.forEach(element => element.classList.add("error"))
            } else {
                allTargets.forEach(element => element.classList.remove("error"))
            }
        }
    }

    function refreshScheduleList() {
        let childNo = 1;
        for (let child of scheduleList.children) {
            child.querySelector(".schedule-title > span").innerHTML = `Schedule #${childNo++}`;
        }
        checkOverload();
    }

    function newSchedule() {
        const schedule = document.createElement("div");
        schedule.classList.add("schedule");
        const scheduleTitle = document.createElement("div");
        scheduleTitle.classList.add("schedule-title");
        const scheduleTitleSpan = document.createElement("span");
        scheduleTitleSpan.innerHTML = `Schedule #${scheduleList.children.length + 1}`;
        const picker = document.createElement("div");
        picker.classList.add("dotw-picker");
        const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let i = 0; i < 7; i++) {
            const day = daysOfTheWeek[i];
            const button = document.createElement("button");
            button.classList.add("day-of-the-week");
            button.innerHTML = day;
            button.addEventListener("click", ev => {
                ev.preventDefault();
                ev.stopPropagation();
                if (ev.target.classList.contains("selected")) {
                    ev.target.classList.remove("selected");
                } else {
                    ev.target.classList.add("selected");
                }
                checkOverload();
            })
            button.dataset.day = i.toString();
            picker.appendChild(button);
        }
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-schedule");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", ev => {
            ev.preventDefault();
            ev.stopPropagation();
            schedule.remove();
            refreshScheduleList();
        });

        scheduleTitle.appendChild(scheduleTitleSpan);
        scheduleTitle.appendChild(picker);
        scheduleTitle.appendChild(deleteButton);

        schedule.appendChild(scheduleTitle);
        scheduleList.appendChild(schedule);
        refreshScheduleList();
        return schedule;
    }

    document.querySelector(".new-schedule").addEventListener("click", newSchedule);

    document.body.addEventListener("keydown", ev => {
        console.info("Key pressed: " + ev.key)
        if (ev.key === "Tab") {
            ev.preventDefault();
            ev.stopPropagation();
            if (ev.repeat) return;
            toggleTab();
        }
    })
});