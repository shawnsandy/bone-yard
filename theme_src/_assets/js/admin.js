import { u } from "umbrellajs";

/** close the sidebar after set timeout */
setTimeout(() => {
    u("section.dashboard").toggleClass("close");
}, 6000);

u(".toggle-sidebar").on("click", (e) => {
    e.preventDefault();

    let el = e.currentTarget;
    let bar = u("section.dashboard");
    // let links = u(".sidebar-text");

    bar.toggleClass("close");
    // links.toggleClass('hidden');
});
