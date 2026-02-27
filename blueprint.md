# Animal Feature Tester (Dog vs Cat)

## Overview

This project is a web application that uses a Teachable Machine model to distinguish between dogs and cats. Users can either use their webcam or upload an image to see the classification results in real-time.

## Features

- **Animal Classification:** Uses a trained Teachable Machine model to identify if an animal is a dog or a cat.
- **Webcam Integration:** Real-time classification using the user's camera.
- **Image Upload:** Alternative classification method by uploading image files.
- **Real-time Results:** Dynamic progress bars or percentage indicators showing the model's confidence.
- **Modern UI:** A clean, visually appealing, and responsive interface built with modern CSS (Baseline features).
- **Dark & Light Mode:** Theme toggling with persistence in local storage.
- **Partnership Inquiry Form:** A simple form for users to submit partnership inquiries.
- **Disqus Comments:** Integrated comment section for user engagement.

## Technical Details

- **Frameworks:** Framework-less (HTML, CSS, JavaScript).
- **Libraries:** TensorFlow.js, Teachable Machine Image Library.
- **Model URL:** `https://teachablemachine.withgoogle.com/models/57_063iBZ/`
- **Styling:** CSS Variables, Flexbox, Container Queries for responsiveness.

## Current Plan

- **Phase 1: Research & Planning**
    - [x] Analyze requirements and model URL.
    - [x] Update blueprint.
- **Phase 2: UI Implementation**
    - [x] Update `index.html` with camera/upload containers.
    - [x] Update `style.css` with modern components and layouts.
- **Phase 3: Logic Implementation**
    - [x] Load Teachable Machine model in `main.js`.
    - [x] Implement camera and file upload handling.
    - [x] Implement prediction logic and result visualization.
- **Phase 4: Validation**
    - [x] Test with webcam and various images.
    - [x] Ensure mobile responsiveness and theme consistency.
- **Phase 5: Deployment**
    - [x] Configure Firebase Hosting (`firebase.json`, `.firebaserc`).
    - [x] Deploy to Firebase Hosting.
    - [x] Verify deployment URL.

**Deployed URL:** https://publicbuilder-week2-6115-abbe6.web.app
