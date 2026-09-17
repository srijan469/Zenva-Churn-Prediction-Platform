# Zenva — AI Customer Churn Prediction Platform

Zenva is a machine-learning-powered web application that predicts the likelihood of a customer leaving a service.

The platform allows users to enter customer information such as age, tenure, usage frequency, support requests, payment delays, subscription type, contract duration, total spending, and recent interaction history. Zenva processes these attributes through a trained machine-learning pipeline and returns a churn prediction, churn probability, and risk level.

The project combines machine learning, FastAPI, React, database storage, data visualization, and cloud deployment into a complete end-to-end application.

---

## 🚀 Live Demo

**Live Website:**  
https://zenva-churn-prediction-platform.vercel.app/

**Backend API:**  
https://zenva-backend.onrender.com/

**API Documentation:**  
https://zenva-backend.onrender.com/docs

---

## 📌 Project Overview

Customer churn is a major problem for many businesses. Losing existing customers can affect revenue and long-term growth.

Zenva uses historical customer data to train a machine-learning model that learns patterns associated with customer churn.

Once the model is trained, users can provide information about an individual customer and receive:

- Churn prediction
- Probability of leaving
- Risk classification
- Customer ID
- Prediction history

The platform also provides a Data & Insights section where users can upload a compatible churn dataset and explore customer and churn patterns through visualizations.

---

## 🎯 Objectives

The main objectives of Zenva are:

- Build an end-to-end customer churn prediction system.
- Train a machine-learning classification model.
- Apply automatic preprocessing to numerical and categorical data.
- Save the preprocessing and model together as a single pipeline.
- Provide a REST API using FastAPI.
- Build a user-friendly React frontend.
- Store prediction history in a database.
- Provide churn probability and understandable risk levels.
- Provide basic dataset analysis and visualizations.
- Deploy the application so it can be accessed from different machines.

---

## 🧠 How Zenva Works

The overall workflow is:

```text
User enters customer information
            ↓
React Frontend
            ↓
FastAPI Backend
            ↓
Preprocessing Pipeline
            ↓
XGBoost Machine Learning Model
            ↓
Churn Probability
            ↓
Risk Classification
            ↓
Prediction Result
            ↓
Prediction History Database
