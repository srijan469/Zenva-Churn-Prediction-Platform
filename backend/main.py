from pathlib import Path
import os

import joblib
from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from .models import PredictionHistory


# Application

app = FastAPI(
    title="ZENVA ",
    description="API for customer churn prediction",
    version="1.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173"
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Load trained ML pipeline

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "ml" / "churn_model.pkl"

model = joblib.load(MODEL_PATH)
Base.metadata.create_all(bind=engine)


# Input schema
class CustomerData(BaseModel):
    CustomerID: int = Field(..., gt=0)

    Age: int = Field(..., ge=18, le=65)

    Gender: str = Field(
        ...,
        pattern="^(Male|Female)$"
    )

    Tenure: int = Field(..., ge=1, le=60)

    Usage_Frequency: int = Field(..., ge=1, le=30)

    Support_Calls: int = Field(..., ge=0, le=10)

    Payment_Delay: int = Field(..., ge=0, le=30)

    Subscription_Type: str = Field(
        ...,
        pattern="^(Basic|Standard|Premium)$"
    )

    Contract_Length: str = Field(
        ...,
        pattern="^(Monthly|Quarterly|Annual)$"
    )

    Total_Spend: int = Field(..., ge=100, le=1000)

    Last_Interaction: int = Field(..., ge=1, le=30)


# Health Check


@app.get("/")
def root():
    return {
        "message": "AI Customer Churn Prediction API is running",
        "model_loaded": True
    }



# Prediction

@app.post("/predict")
def predict_churn(customer: CustomerData):

    customer_data = customer.model_dump()

    # Convert API field names back to the
    # exact column names used during training
    customer_data = {
        "Age": customer_data["Age"],
        "Gender": customer_data["Gender"],
        "Tenure": customer_data["Tenure"],
        "Usage Frequency": customer_data["Usage_Frequency"],
        "Support Calls": customer_data["Support_Calls"],
        "Payment Delay": customer_data["Payment_Delay"],
        "Subscription Type": customer_data["Subscription_Type"],
        "Contract Length": customer_data["Contract_Length"],
        "Total Spend": customer_data["Total_Spend"],
        "Last Interaction": customer_data["Last_Interaction"]
    }

    # Create a DataFrame containing one customer
    import pandas as pd

    customer_df = pd.DataFrame([customer_data])

    # Prediction
    prediction = model.predict(customer_df)[0]
    probability = model.predict_proba(customer_df)[0][1]

    # Determine risk level
    if probability >= 0.70:
        risk_level = "High"
    elif probability >= 0.40:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    db =  SessionLocal()
    history = PredictionHistory(
        customer_id=customer.CustomerID,
        prediction=int(prediction),
        churn_probability=float(probability),
        risk_level=risk_level
    )

    db.add(history)
    db.commit()
    db.close()

    return {
        "CustomerID": customer.CustomerID,
        "prediction": int(prediction),
        "churn_probability": round(float(probability), 4),
        "risk_level": risk_level
    }

# Prediction History


@app.get("/history")
def get_prediction_history(limit: int = Query(20, ge=1, le=100)):

    db = SessionLocal()

    records = (
        db.query(PredictionHistory)
        .order_by(PredictionHistory.created_at.desc())
        .limit(limit)
        .all()
    )

    history = []

    for record in records:
        history.append({
            "CustomerID": record.customer_id,
            "prediction": record.prediction,
            "churn_probability": record.churn_probability,
            "risk_level": record.risk_level,
            "created_at": record.created_at
        })

    db.close()

    return {
        "total": len(history),
        "history": history
    }

# Dataset Upload & Visualization


@app.post("/upload-dataset")
async def upload_dataset(file: UploadFile = File(...)):

    # Make sure the uploaded file is a CSV
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file."
        )

    try:
        import pandas as pd

        # Read uploaded CSV
        df = pd.read_csv(file.file)

        # Required columns for our current dataset
        required_columns = [
            "CustomerID",
            "Age",
            "Gender",
            "Tenure",
            "Usage Frequency",
            "Support Calls",
            "Payment Delay",
            "Subscription Type",
            "Contract Length",
            "Total Spend",
            "Last Interaction",
            "Churn"
        ]

        # Check whether required columns exist
        missing_columns = [
            column
            for column in required_columns
            if column not in df.columns
        ]

        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "This dataset does not match the current Zenva churn dataset.",
                    "missing_columns": missing_columns
                }
            )

        # Basic dataset information
        total_customers = len(df)

        churned_customers = int(
            (df["Churn"] == 1).sum()
        )

        staying_customers = int(
            (df["Churn"] == 0).sum()
        )

        churn_rate = (
            churned_customers / total_customers
            if total_customers > 0
            else 0
        )

        # Churn by subscription type
        subscription_data = (
            df.groupby("Subscription Type")["Churn"]
            .mean()
            .reset_index()
        )

        subscription_chart = []

        for _, row in subscription_data.iterrows():
            subscription_chart.append({
                "name": row["Subscription Type"],
                "churn_rate": round(float(row["Churn"]) * 100, 2)
            })

        # Churn by contract length
        contract_data = (
            df.groupby("Contract Length")["Churn"]
            .mean()
            .reset_index()
        )

        contract_chart = []

        for _, row in contract_data.iterrows():
            contract_chart.append({
                "name": row["Contract Length"],
                "churn_rate": round(float(row["Churn"]) * 100, 2)
            })

        return {
            "filename": file.filename,
            "total_customers": total_customers,
            "churned_customers": churned_customers,
            "staying_customers": staying_customers,
            "churn_rate": round(churn_rate * 100, 2),

            "churn_distribution": [
                {
                    "name": "Staying",
                    "value": staying_customers
                },
                {
                    "name": "Leaving",
                    "value": churned_customers
                }
            ],

            "subscription_chart": subscription_chart,

            "contract_chart": contract_chart
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Could not analyze the dataset: {str(error)}"
        )