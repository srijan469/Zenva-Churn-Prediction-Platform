from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.sql import func

from .database import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, nullable=False, index=True)

    prediction = Column(Integer, nullable=False)

    churn_probability = Column(Float, nullable=False)

    risk_level = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )