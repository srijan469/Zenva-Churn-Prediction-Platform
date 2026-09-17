
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

```
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
````

The machine-learning pipeline performs preprocessing before passing the data to the trained model.

### Important

`CustomerID` is **not used as a machine-learning feature**.

It is only used as an identifier for storing and displaying prediction history.

The prediction is based on the customer's attributes and behavioral information.

---

## 🤖 Machine Learning

### Dataset

The project uses a customer churn dataset containing customer demographic, behavioral, subscription, and interaction information.

Dataset features include:

| Feature           | Description                                     |
| ----------------- | ----------------------------------------------- |
| CustomerID        | Unique customer identifier                      |
| Age               | Customer age                                    |
| Gender            | Customer gender                                 |
| Tenure            | How long the customer has been with the service |
| Usage Frequency   | How frequently the customer uses the service    |
| Support Calls     | Number of support requests                      |
| Payment Delay     | Number of days the customer was late paying     |
| Subscription Type | Customer's service plan                         |
| Contract Length   | Duration of the customer's plan                 |
| Total Spend       | Total amount spent by the customer              |
| Last Interaction  | Days since the customer's last interaction      |
| Churn             | Whether the customer left the service           |

`CustomerID` is excluded from model training.

---

## ⚙️ Data Preprocessing

The model uses different preprocessing techniques for numerical and categorical features.

### Numerical Features

Numerical features are standardized using:
StandardScaler

### Categorical Features

Categorical features are converted into numerical representations using:
OneHotEncoder

Unknown categorical values are handled using:
handle_unknown="ignore"


Both preprocessing and model prediction are combined into a single Scikit-learn pipeline.

This helps ensure that the same preprocessing steps are applied during both training and prediction.

---

## 🌳 Machine Learning Model

Zenva uses:

**XGBoost Classifier**

Main configuration:

```
n_estimators = 200
max_depth = 5
learning_rate = 0.05
random_state = 42
eval_metric = logloss
```

The trained preprocessing pipeline and XGBoost model are saved together as:

```
ml/churn_model.pkl
```

This allows the backend to load the complete trained pipeline and directly process new customer information.

---

## 📊 Model Evaluation

The model was evaluated using:

* Accuracy
* ROC-AUC

The current dataset produced:

```
Accuracy: 0.9997
ROC-AUC: 1.0000
```

These results represent performance on the current dataset and test split. They should not be interpreted as a guarantee that the model will achieve the same performance on every real-world dataset.

---

## 🔮 Prediction Output

For every customer prediction, Zenva returns:

### Prediction

```
0 → Customer predicted to stay
1 → Customer predicted to leave
```

### Churn Probability

A probability between:

```
0% — 100%
```

representing the model's estimated likelihood that the customer will leave.

### Risk Level

Zenva converts the probability into three easy-to-understand categories:

```
Low
Medium
High
```

Current thresholds:

```
Probability >= 0.70 → High
Probability >= 0.40 → Medium
Probability < 0.40  → Low
```

---

## 🖥️ Application Features

### 1. Dashboard

Provides a simple overview of the Zenva platform and access to its main features.

### 2. Customer Prediction

Users can enter individual customer information and receive:

* Prediction
* Churn probability
* Risk level
* Customer ID

### 3. Data & Insights

Users can upload a compatible CSV dataset and view:

* Total customers
* Customers leaving
* Customers staying
* Leaving rate
* Subscription distribution
* Contract distribution
* Visual charts

### 4. Prediction History

Zenva stores previous predictions and allows users to view recent prediction records.

### 5. REST API

The FastAPI backend provides endpoints for:

* Customer prediction
* Dataset analysis
* Prediction history

Interactive API documentation is available through Swagger UI.

---

## 🛠️ Technology Stack

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* XGBoost
* Joblib
* Jupyter Notebook

### Backend

* FastAPI
* Uvicorn
* SQLAlchemy
* SQLite
* Pydantic

### Frontend

* React
* Vite
* Recharts
* CSS

### Deployment

* Vercel — Frontend
* Render — Backend
* GitHub — Source Code & Version Control

---

## 📁 Project Structure

```text
Zenva-Churn-Prediction-Platform/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── models.py
│
├── data/
│   └── churn.csv
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── ml/
│   ├── churn_training.ipynb
│   └── churn_model.pkl
│
├── .gitignore
├── render.yaml
├── requirements.txt
└── README.md
```

---

## 🔧 Installation & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/srijan469/Zenva-Churn-Prediction-Platform.git
cd Zenva-Churn-Prediction-Platform
```

### 2. Create a Python Virtual Environment

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the FastAPI Backend

From the project root:

```bash
uvicorn backend.main:app --reload
```

The backend will run locally at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

## 🌐 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```
http://localhost:5173
```

---

## 🔗 Frontend–Backend Configuration

The React frontend uses an environment variable to determine the backend API URL.

Create:

```
frontend/.env
```

and add:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For the deployed application, the production backend URL is configured through the Vercel environment variables.

---

## 🗄️ Database

Zenva currently uses SQLite with SQLAlchemy.

Prediction history contains information such as:

* Record ID
* Customer ID
* Prediction
* Churn probability
* Risk level
* Prediction timestamp

The database is created automatically when the backend starts.

---

## 📈 Data & Insights Limitation

The current version of Zenva's Data & Insights feature expects an uploaded CSV to follow the same basic column structure used by the training dataset.

The current CSV upload feature is intended for:

```
Dataset analysis
        +
Visualization
```

It does **not** automatically retrain the machine-learning model.

---

## 🔒 Security & Validation

The FastAPI backend validates incoming customer information using Pydantic.

Examples include:

* Valid age range
* Valid customer ID
* Valid subscription type
* Valid contract duration
* Valid numerical ranges
* Required fields

CORS is also configured so that the deployed frontend can communicate with the backend API.

---

## ☁️ Deployment Architecture

Zenva is deployed using separate frontend and backend services.

```
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │  Vercel         │
              │  React Frontend │
              └────────┬────────┘
                       │
                       │ HTTPS API
                       ▼
              ┌─────────────────┐
              │  Render         │
              │  FastAPI        │
              │  Backend        │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ ML Pipeline     │
              │ XGBoost Model   │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ SQLite Database │
              └─────────────────┘
```

This architecture allows users to access Zenva through a web browser without running the application locally.

---

## ⚠️ Current Limitations

The current version has some intentional limitations:

1. The model is trained on a predefined churn dataset.
2. Data & Insights currently expects a compatible dataset structure.
3. CSV upload does not automatically retrain the model.
4. Automatic schema detection and feature mapping are not currently implemented.
5. Automatic model retraining is not currently implemented.
6. SQLite is suitable for the current academic deployment, but a persistent production database would be preferable for a larger-scale application.
7. Model performance may change when evaluated on different datasets or real-world customer data.

---

## 🚀 Future Scope

Future versions of Zenva could include:

### Automatic Dataset Understanding

The system could automatically identify equivalent fields even when different datasets use different column names.

For example:

```
customer_age
Age
age_years
```

could potentially be mapped to the same conceptual feature.

### Automatic Model Improvement

A future version could monitor model performance and:

* Detect data drift
* Collect new labeled outcomes
* Evaluate model performance
* Determine when retraining is required
* Retrain using new data
* Compare model versions
* Keep the previous model as a rollback option
* Deploy the updated model safely

### Additional Future Features

* PostgreSQL for persistent production storage
* User authentication
* SHAP-based explanations
* Advanced analytics
* Model monitoring
* Model versioning
* Automated retraining
* More flexible dataset support
* Cloud-based ML pipeline

---

## 🎓 Academic Purpose

Zenva was developed as an academic and portfolio project to demonstrate the complete machine-learning application lifecycle:

```
Data
 ↓
Data Preprocessing
 ↓
Model Training
 ↓
Model Evaluation
 ↓
Model Serialization
 ↓
REST API
 ↓
Frontend Application
 ↓
Database
 ↓
Cloud Deployment
```

The project demonstrates how a machine-learning model can be integrated into a usable web application rather than being limited to a Jupyter Notebook.

---

## 👨‍💻 Author

**Srijan Deyashi**

B.Tech — Computer Science / Data Science

Zenva was developed as a machine-learning and full-stack project focused on customer churn prediction.

---

## 📄 License

This project is intended primarily for academic, educational, and portfolio purposes.

```

### A small recommendation

For your GitHub repository, I would **use this version rather than a short 10-line README**. Your project has enough components now—ML pipeline, FastAPI, React, database, deployment, and visualization—that the README should demonstrate that full workflow.

The most important sections for your evaluator/interviewer are:

**Project Overview → How It Works → Machine Learning → Features → Architecture → Installation → Deployment → Limitations → Future Scope.**

Your live application and repository are ready to showcase:

:contentReference[oaicite:0]{index=0}

:contentReference[oaicite:1]{index=1}

:contentReference[oaicite:2]{index=2}

This README also deliberately **doesn't claim that Zenva can currently understand arbitrary CSV schemas or automatically retrain itself**—those are documented as future scope, which matches the actual implementation. 
```
