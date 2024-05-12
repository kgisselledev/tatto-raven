document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("appointmentForm");
    const fields = form.querySelectorAll(".animated-field");

    let index = 0;
    const interval = setInterval(function() {
        if (index < fields.length) {
            fields[index].classList.add("show");
            index++;
        } else {
            clearInterval(interval);
        }
    }, 200);
});
