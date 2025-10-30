# Driver Daily Log App

Full-stack app for truck drivers to generate **daily logs** and **route instructions**.

## Live Demo

- Frontend: [https://driver-daily-log-94hw.onrender.com/](https://driver-daily-log-94hw.onrender.com/)  
- Backend API: [https://driver-backend-7x0l.onrender.com/api](https://driver-backend-7x0l.onrender.com/api)

## Features

- Input: current location, pickup/dropoff locations, cycle hours  
- Outputs:
  - Route map with stops & estimated times
  - ELD daily log sheets
  - Trip summary (distance, duration, fuel stops)

## Stack

- **Backend:** Django + SQLite + DRF  
- **Frontend:** React + TypeScript + Bootstrap + Leaflet  
- **Deployment:** Render (Backend as Web Service, Frontend as Static Site)

## Quick Setup (Local)

### Backend

- cd truck
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver

### Frontend
- cd driver-log-app
- npm install
- npm start

