// KEPS Science Academy — shared site script
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after tapping a link (mobile)
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form -> mailto fallback (no backend, nothing is stored online).
  // To route enquiries to the academy's inbox, set ACADEMY_EMAIL below.
  var ACADEMY_EMAIL = ""; // e.g. "info@example.com"  <!-- REPLACE WITH OFFICIAL EMAIL -->
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("cf-name").value.trim();
      var phone = document.getElementById("cf-phone").value.trim();
      var msg = document.getElementById("cf-message").value.trim();
      if (!name || !msg) {
        alert("Please fill in your name and message.");
        return;
      }
      var subject = encodeURIComponent("KEPS Website Inquiry — " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\nPhone: " + phone + "\n\nMessage:\n" + msg
      );
      window.location.href = "mailto:" + ACADEMY_EMAIL + "?subject=" + subject + "&body=" + body;
    });
  }
  // Admission form -> WhatsApp (no backend; the application goes straight to the academy).
  var ACADEMY_WHATSAPP = "923016318596";
  var aform = document.getElementById("admission-form");
  if (aform) {
    aform.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var name = v("af-name"), father = v("af-father"), cls = v("af-class"),
          group = v("af-group"), phone = v("af-phone"),
          addr = v("af-address"), prev = v("af-prev");
      if (!name || !father || !cls || !group || !phone) {
        alert("Please fill in all the required fields (marked *).");
        return;
      }
      var lines = ["*New Admission Application — KEPS Website*", "———————————",
        "Student Name: " + name,
        "Father Name: " + father,
        "Class: " + cls,
        "Group: " + group,
        "Phone: " + phone];
      if (addr) lines.push("Address: " + addr);
      if (prev) lines.push("Previous: " + prev);
      window.open("https://wa.me/" + ACADEMY_WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
    });
  }
})();
