document.addEventListener("DOMContentLoaded", () => {

  /* ================= LIVE DATE & TIME (DASHBOARD) ================= */
  const todayEl = document.getElementById("todayDate");

  function updateTodayDateTime() {
    if (!todayEl) return;

    const now = new Date();
    todayEl.textContent = now.toLocaleString("en-MY", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  updateTodayDateTime();
  setInterval(updateTodayDateTime, 1000);

  /* ================= AUTH GUARD ================= */
  if (
    document.body.hasAttribute("data-auth") &&
    localStorage.getItem("isLoggedIn") !== "true"
  ) {
    window.location.href = "index.html";
    return;
  }

  const role = localStorage.getItem("role");
  const currentUser = localStorage.getItem("currentUser");

  /* ================= USER STORAGE ================= */
  const getUsers = () =>
    JSON.parse(localStorage.getItem("users")) || [];

  const saveUsers = users =>
    localStorage.setItem("users", JSON.stringify(users));

  /* ================= LOGIN ================= */
  const loginForm = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      // STAFF LOGIN
      if (username === "System" && password === "Name123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "staff");
        localStorage.setItem("currentUser", "System");
        window.location.href = "dashboard.html";
        return;
      }

      // USER LOGIN
      const users = getUsers();
      const found = users.find(
        u => u.username === username && u.password === password
      );

      if (found) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("currentUser", username);
        window.location.href = "appointments.html";
      } else {
        errorBox?.classList.remove("d-none");
      }
    });
  }

  /* ================= GUEST ================= */
  const guestBtn = document.getElementById("guestBtn");
  if (guestBtn) {
    guestBtn.onclick = () => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "guest");
      localStorage.setItem("currentUser", "guest");
      window.location.href = "dashboard.html";
    };
  }

  /* ================= SIGNUP ================= */
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();

      const username = document.getElementById("suUsername").value.trim();
      const password = document.getElementById("suPassword").value.trim();
      const signupError = document.getElementById("signupError");
      const signupSuccess = document.getElementById("signupSuccess");

      const users = getUsers();
      if (users.some(u => u.username === username)) {
        signupError.textContent = "Username already exists";
        signupError.classList.remove("d-none");
        return;
      }

      users.push({ username, password });
      saveUsers(users);

      signupSuccess.textContent = "Account created. Please login.";
      signupSuccess.classList.remove("d-none");
      signupForm.reset();
    });
  }

  /* ================= LOGOUT ================= */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.clear();
      window.location.href = "index.html";
    };
  }

  /* ================= APPOINTMENTS DATA ================= */
  let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

  /* ===== AUTO COMPLETE APPOINTMENT ===== */
  const now = new Date();
  let updated = false;

  appointments.forEach(a => {
    const dt = new Date(`${a.date}T${a.time}`);
    if (a.status === "Upcoming" && dt < now) {
      a.status = "Completed";
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }

  /* ================= SUMMARY ================= */
  function updateSummary() {
    const totalToday = document.getElementById("totalToday");
    const totalUpcoming = document.getElementById("totalUpcoming");
    const totalPatients = document.getElementById("totalPatients");

    if (!totalToday) return;

    totalToday.textContent = appointments.length;
    totalUpcoming.textContent =
      appointments.filter(a => a.status === "Upcoming").length;
    totalPatients.textContent =
      new Set(appointments.map(a => a.ic)).size;
  }

  /* ================= APPOINTMENTS PAGE ================= */
  const form = document.getElementById("appointmentForm");
  const table = document.getElementById("appointmentsTable");

  function renderAppointments() {
    if (!table) return;
    table.innerHTML = "";

    appointments.forEach((a, i) => {
      const canManage =
        role === "staff" ||
        (role === "user" && a.owner === currentUser);

      let actions = "-";
      if (a.status === "Upcoming" && canManage) {
        actions = `
          <button class="btn btn-sm btn-warning me-1"
            onclick="editAppointment(${i})">Edit</button>
          <button class="btn btn-sm btn-danger"
            onclick="cancelAppointment(${i})">Cancel</button>
        `;
      }

      table.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${a.patient}</td>
          <td>${a.doctor}</td>
          <td>${a.service}</td>
          <td>${a.date}</td>
          <td>${a.time}</td>
          <td>
            <span class="badge ${
              a.status === "Completed"
                ? "bg-success"
                : a.status === "Cancelled"
                ? "bg-secondary"
                : "bg-warning text-dark"
            }">${a.status}</span>
          </td>
          <td>${actions}</td>
        </tr>`;
    });
  }

  window.cancelAppointment = index => {
    if (!confirm("Cancel this appointment?")) return;
    appointments[index].status = "Cancelled";
    localStorage.setItem("appointments", JSON.stringify(appointments));
    renderAppointments();
    updateSummary();
  };

  window.editAppointment = index => {
    const a = appointments[index];
    const d = prompt("New date (YYYY-MM-DD):", a.date);
    if (!d) return;
    const t = prompt("New time (HH:MM):", a.time);
    if (!t) return;

    a.date = d;
    a.time = t;
    localStorage.setItem("appointments", JSON.stringify(appointments));
    renderAppointments();
    updateSummary();
  };

  if (form && role !== "guest") {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const patientName = document.getElementById("patientName").value.trim();
      const ic = document.getElementById("patientIC").value.trim();
      const phone = document.getElementById("patientPhone").value.trim();

      if (!/^\d{12}$/.test(ic)) return alert("IC must be 12 digits");
      if (!/^\d{10,12}$/.test(phone)) return alert("Phone must be 10–12 digits");

      appointments.push({
        patient: patientName,
        ic,
        phone,
        doctor: doctor.value,
        service: service.value,
        date: date.value,
        time: time.value,
        status: "Upcoming",
        owner: currentUser
      });

      localStorage.setItem("appointments", JSON.stringify(appointments));
      form.reset();
      renderAppointments();
      updateSummary();
    });
  }

  renderAppointments();
  updateSummary();

  /* ================= DASHBOARD RECENT ================= */
  const recentTable = document.getElementById("recentAppointmentsTable");
  if (recentTable) {
    recentTable.innerHTML = "";
    appointments.slice(-5).reverse().forEach(a => {
      recentTable.innerHTML += `
        <tr>
          <td>${a.patient}</td>
          <td>${a.doctor}</td>
          <td>${a.service}</td>
          <td>${a.date}</td>
          <td>${a.time}</td>
          <td>${a.status}</td>
        </tr>`;
    });
  }

  /* ================= DASHBOARD CHART ================= */
  const chartCanvas = document.getElementById("appointmentsChart");
  if (chartCanvas && typeof Chart !== "undefined") {
    const labels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const data = [0,0,0,0,0,0,0];

    appointments.forEach(a => {
      if (a.status !== "Cancelled") {
        data[new Date(a.date).getDay()]++;
      }
    });

    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: "rgba(33,150,243,0.85)"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }

  /* ================= CONTACT US (EMAILJS) ================= */
  if (typeof emailjs !== "undefined") {
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
      emailjs.init("23LpnGF0waAobFuWW");

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (formStatus) {
          formStatus.textContent = "Sending message...";
          formStatus.className = "text-muted small";
        }

        emailjs
          .sendForm(
            "service_0u7fucw",
            "template_hlcrbhu",
            this
          )
          .then(() => {
            if (formStatus) {
              formStatus.textContent = "✅ Message sent successfully!";
              formStatus.className = "text-success small";
            }
            contactForm.reset();
          })
          .catch(error => {
            if (formStatus) {
              formStatus.textContent =
                "❌ Failed to send message. Please try again.";
              formStatus.className = "text-danger small";
            }
            console.error("EmailJS Error:", error);
          });
      });
    }
  }
});

/* ================= GENDER DETECTION ================= */
function detectGenderByName(name) {
  const female = ["aisyah","amira","siti","nur","farah","ain","alya","hannah","bella","aminah","hazwani","aina","humairah","azlin","afrina","luftfia"];
  const male = ["danial","adam","amir","hakim","faiz","irfan","akasyah","amin","haikal","muhamad","amar","daus","naim","hafiz","shamel","ali","abu","ahmad","aiman","afiq","nik","hassan"];
  const n = name.toLowerCase();
  if (female.some(f => n.includes(f))) return "Female";
  if (male.some(m => n.includes(m))) return "Male";
  return "Male";
}
