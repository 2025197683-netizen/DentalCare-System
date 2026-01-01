UNIVERSITI TEKNOLOGI MARA
FACULTY OF INFORMATION SCIENCE
BACHELORS OF INFORMATION SCIENCE (HONS)
ADVANCED WEB DESIGN DEVELOPMENT AND CONTENT MANAGEMENT (IMS566)

PAIRING ASSIGNMENT :
1. MUHAMAD NAKIB BIN HAMIDUN (2025148655)
2. MUHAMMAD DANIAL AKASYAH BIN MOHD ALI (2025197683)

PROJECT TITLE:
# DentalCare+ System

DentalCare+ is a web-based Dental Clinic Appointment Management System developed as part of the **IMS566 course project**.  
The system is designed to help dental clinics manage appointments, patients, and scheduling activities efficiently using a simple and user-friendly interface.

---

## Project Overview

The DentalCare+ System provides a centralized platform for:
- Booking and managing dental appointments
- Tracking patient information
- Monitoring appointment statistics through a dashboard
- Supporting role-based access (Staff, Patient, Guest)

This project focuses on **front-end functionality** using browser-based storage for demonstration and learning purposes.

---

## Objectives

The main objectives of this system are:
- To enable efficient appointment booking and scheduling
- To provide real-time visibility of upcoming appointments
- To support clinic staff in managing daily operations
- To reduce manual record-keeping and scheduling errors
- To improve overall patient service quality

---

## User Roles

### 1. Staff
- Login using predefined staff credentials
- View all appointments
- Edit or cancel any appointment
- Access full dashboard insights

### 2. Patient (Registered User)
- Sign up and log in
- Book appointments
- Edit or cancel **own appointments only**
- View appointment history

### 3. Guest
- Access dashboard in read-only mode
- Cannot create, edit, or cancel appointments

---

## System Features

### Appointment Management
- Create appointments with patient details
- Auto-update appointment status (Upcoming → Completed)
- Edit appointment date and time
- Soft delete appointments (Cancelled status)

### Dashboard
- Total appointments count
- Upcoming appointments count
- Total patients count
- Weekly appointment distribution chart
- Recent appointments list
- Live date and time display

### Patient Management
- Automatically generated patient list
- Patient details include:
  - Name
  - IC number
  - Phone number
  - Gender (basic name-based detection)
  - Last visit date

---

## Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript (Vanilla JS)**
- **Chart.js**
- **LocalStorage (Browser Storage)**

---

## Data Storage

This system uses **LocalStorage** to store:
- User accounts
- Login session data
- Appointment records
- Patient information

> Note:  
> Data will be cleared if the browser storage is manually cleared or if `localStorage.clear()` is triggered (e.g., during logout).  
> This system does **not** use a backend database.

---

## Project Structure

# DentalCare+ System

DentalCare+ is a web-based Dental Clinic Appointment Management System developed as part of the **IMS566 course project**.  
The system is designed to help dental clinics manage appointments, patients, and scheduling activities efficiently using a simple and user-friendly interface.

---

## Project Overview

The DentalCare+ System provides a centralized platform for:
- Booking and managing dental appointments
- Tracking patient information
- Monitoring appointment statistics through a dashboard
- Supporting role-based access (Staff, Patient, Guest)

This project focuses on **front-end functionality** using browser-based storage for demonstration and learning purposes.

---

## Objectives

The main objectives of this system are:
- To enable efficient appointment booking and scheduling
- To provide real-time visibility of upcoming appointments
- To support clinic staff in managing daily operations
- To reduce manual record-keeping and scheduling errors
- To improve overall patient service quality

---

## User Roles

### 1. Staff/ADMIN
- Login using predefined staff credentials
- View all appointments
- Edit or cancel any appointment
- Access full dashboard insights

### 2. Patient (Registered User)
- Sign up and log in
- Book appointments
- Edit or cancel **own appointments only**
- View appointment history

### 3. Guest
- Access dashboard in read-only mode
- Cannot create, edit, or cancel appointments

---

## System Features

### Appointment Management
- Create appointments with patient details
- Auto-update appointment status (Upcoming → Completed)
- Edit appointment date and time
- Soft delete appointments (Cancelled status)

### Dashboard
- Total appointments count
- Upcoming appointments count
- Total patients count
- Weekly appointment distribution chart
- Recent appointments list
- Live date and time display

### Patient Management
- Automatically generated patient list
- Patient details include:
  - Name
  - IC number
  - Phone number
  - Gender (basic name-based detection)
  - Last visit date

---

## Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap 5**
- **JavaScript (Vanilla JS)**
- **Chart.js**
- **LocalStorage (Browser Storage)**

---

## Data Storage

This system uses **LocalStorage** to store:
- User accounts
- Login session data
- Appointment records
- Patient information

> Note:  
> Data will be cleared if the browser storage is manually cleared or if `localStorage.clear()` is triggered (e.g., during logout).  
> This system does **not** use a backend database.

---

## Project Structure

/DentalCare+
│
├── index.html
├── dashboard.html
├── appointments.html
├── patients.html
├── contactus.html
│
├── css/
│ ├── style.css
│ └── logo.jpg
│
├── js/
│ └── main.js
│
└── README.md


---

## Sample Login Credentials

### Staff

---

## Sample Login Credentials

### Staff or ADMIN
Username: System
Password: Name123


### Patient
- Register a new account via the Sign Up page

---

## How to Run the System

1. Download or clone the project files
2. Open `index.html` in a modern web browser
3. Log in as Staff, Patient, or Guest
4. Start managing appointments

> No server or database setup is required.

---

## Limitations

- No backend or real database integration
- Data stored locally in the browser only
- Gender detection is heuristic-based
- Not intended for production use

---

## Course Information

- **Course**: IMS566 – Information Management System
- **Project Type**: Academic Web-Based System
- **Institution**: UiTM

---

## Author

Developed by MUHAMAD NAKIB & DANIAL AKASYAH
For academic and educational purposes only.

---

© 2025 DentalCare+ System
