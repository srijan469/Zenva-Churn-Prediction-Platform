import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

// API base URL: uses the local FastAPI server by default.
// In production, set VITE_API_BASE_URL to the deployed backend URL.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


// ==================================================
// DASHBOARD
// ==================================================

function Dashboard({ setActivePage }) {
  return (
    <div className="page-content">

      <div className="page-heading">
        <h2>Dashboard</h2>

        <p>
          A simple overview of your customer
          churn analysis platform.
        </p>
      </div>


      <div className="welcome-card">

        <div>

          <h2>Welcome to Zenva</h2>

          <p>
            Use Zenva to understand customer
            leaving patterns and predict the
            likelihood of an individual customer
            leaving a service.
          </p>

        </div>

        <button
          onClick={() => setActivePage("predict")}
        >
          Start Prediction
        </button>

      </div>


      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="dashboard-icon">
            🔮
          </div>

          <h3>Customer Prediction</h3>

          <p>
            Enter customer information and
            receive a churn prediction,
            probability, and risk level.
          </p>

          <button
            onClick={() => setActivePage("predict")}
          >
            Predict Customer
          </button>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-icon">
            📊
          </div>

          <h3>Data & Insights</h3>

          <p>
            Upload a compatible churn dataset
            and explore customer leaving
            patterns through charts.
          </p>

          <button
            onClick={() => setActivePage("insights")}
          >
            View Insights
          </button>

        </div>


        <div className="dashboard-card">

          <div className="dashboard-icon">
            📋
          </div>

          <h3>Prediction History</h3>

          <p>
            View recent customer predictions
            stored by Zenva.
          </p>

          <button
            onClick={() => setActivePage("history")}
          >
            View History
          </button>

        </div>

      </div>

    </div>
  );
}


// ==================================================
// PREDICTION PAGE
// ==================================================

function PredictionPage({
  customer,
  handleChange,
  handleSubmit,
  result,
  error,
}) {
  return (
    <div className="page-content">

      <div className="page-heading">

        <h2>Predict Customer Churn</h2>

        <p>
          Enter the customer's information
          below to estimate the likelihood
          that they may leave the service.
        </p>

      </div>


      <form
        className="prediction-form"
        onSubmit={handleSubmit}
      >

        <div className="form-section">

          <h3>Customer Information</h3>

          <div className="form-grid">

            <div className="field">

              <label>Customer ID</label>

              <input
                type="number"
                name="CustomerID"
                value={customer.CustomerID}
                onChange={handleChange}
                placeholder="Example: 100001"
                required
              />

            </div>


            <div className="field">

              <label>Age</label>

              <input
                type="number"
                name="Age"
                value={customer.Age}
                onChange={handleChange}
                placeholder="Customer's age"
                required
              />

            </div>


            <div className="field">

              <label>Gender</label>

              <select
                name="Gender"
                value={customer.Gender}
                onChange={handleChange}
              >

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

              </select>

            </div>


            <div className="field">

              <label>Customer Duration</label>

              <span>
                How long the customer has
                been with the service
              </span>

              <input
                type="number"
                name="Tenure"
                value={customer.Tenure}
                onChange={handleChange}
                placeholder="Example: 18 months"
                required
              />

            </div>


            <div className="field">

              <label>Usage Frequency</label>

              <span>
                How often the customer uses
                the service
              </span>

              <input
                type="number"
                name="Usage_Frequency"
                value={customer.Usage_Frequency}
                onChange={handleChange}
                placeholder="Example: 12"
                required
              />

            </div>


            <div className="field">

              <label>Support Requests</label>

              <span>
                Number of times the customer
                contacted support
              </span>

              <input
                type="number"
                name="Support_Calls"
                value={customer.Support_Calls}
                onChange={handleChange}
                placeholder="Example: 5"
                required
              />

            </div>


            <div className="field">

              <label>Payment Delay</label>

              <span>
                Number of days the customer
                was late paying
              </span>

              <input
                type="number"
                name="Payment_Delay"
                value={customer.Payment_Delay}
                onChange={handleChange}
                placeholder="Example: 10 days"
                required
              />

            </div>


            <div className="field">

              <label>Plan Type</label>

              <span>
                The customer's current
                service plan
              </span>

              <select
                name="Subscription_Type"
                value={customer.Subscription_Type}
                onChange={handleChange}
              >

                <option value="Basic">
                  Basic
                </option>

                <option value="Standard">
                  Standard
                </option>

                <option value="Premium">
                  Premium
                </option>

              </select>

            </div>


            <div className="field">

              <label>Plan Duration</label>

              <span>
                How long the customer's
                plan lasts
              </span>

              <select
                name="Contract_Length"
                value={customer.Contract_Length}
                onChange={handleChange}
              >

                <option value="Monthly">
                  Monthly
                </option>

                <option value="Quarterly">
                  Quarterly
                </option>

                <option value="Annual">
                  Annual
                </option>

              </select>

            </div>


            <div className="field">

              <label>Total Amount Spent</label>

              <span>
                Total money spent by the
                customer
              </span>

              <input
                type="number"
                name="Total_Spend"
                value={customer.Total_Spend}
                onChange={handleChange}
                placeholder="Example: 650"
                required
              />

            </div>


            <div className="field">

              <label>
                Days Since Last Interaction
              </label>

              <span>
                Days since the customer last
                interacted with the service
              </span>

              <input
                type="number"
                name="Last_Interaction"
                value={customer.Last_Interaction}
                onChange={handleChange}
                placeholder="Example: 7 days"
                required
              />

            </div>

          </div>

        </div>


        <button
          type="submit"
          className="predict-button"
        >
          Predict Customer Churn
        </button>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {result && (
          <div className="result-card">

            <h3>Prediction Result</h3>

            <p>
              <strong>Customer ID:</strong>{" "}
              {result.CustomerID}
            </p>

            <p>
              <strong>Chance of leaving:</strong>{" "}
              {(result.churn_probability * 100).toFixed(2)}%
            </p>

            <p>
              <strong>Risk level:</strong>{" "}
              {result.risk_level}
            </p>

            <p>
              {result.prediction === 1
                ? "This customer is predicted to leave the service."
                : "This customer is predicted to stay with the service."}
            </p>

          </div>
        )}

      </form>

    </div>
  );
}


// ==================================================
// DATA & INSIGHTS
// ==================================================

function InsightsPage({
  dataset,
  uploadError,
  uploading,
  handleDatasetUpload,
}) {
  return (
    <div className="page-content">

      <div className="page-heading">

        <h2>Data & Insights</h2>

        <p>
          Upload a compatible customer churn
          dataset and explore the data through
          simple visualizations.
        </p>

      </div>


      <div className="upload-box">

        <h3>Upload Customer Dataset</h3>

        <p>
          For the current Zenva version,
          upload a CSV using the same columns
          as the training dataset.
        </p>

        <label className="upload-button">

          {uploading
            ? "Analyzing Dataset..."
            : "Choose CSV File"}

          <input
            type="file"
            accept=".csv"
            onChange={handleDatasetUpload}
            hidden
          />

        </label>


        {uploadError && (
          <div className="error-message">
            {uploadError}
          </div>
        )}

      </div>


      {dataset && (
        <div className="dataset-results">

          <div className="dataset-header">

            <h3>Dataset Overview</h3>

            <p>
              File:{" "}
              <strong>
                {dataset.filename}
              </strong>
            </p>

          </div>


          <div className="summary-grid">

            <div className="summary-card">

              <span>
                Total Customers
              </span>

              <strong>
                {dataset.total_customers}
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Customers Leaving
              </span>

              <strong>
                {dataset.churned_customers}
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Customers Staying
              </span>

              <strong>
                {dataset.staying_customers}
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Leaving Rate
              </span>

              <strong>
                {dataset.churn_rate}%
              </strong>

            </div>

          </div>


          <div className="charts-grid">

            {/* Staying vs Leaving */}

            <div className="chart-card">

              <h3>
                Customers Staying vs Leaving
              </h3>

              <p>
                This shows how many customers
                stayed compared with how many left.
              </p>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={dataset.churn_distribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >

                    {dataset.churn_distribution.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? "#22c55e"
                              : "#ef4444"
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* Plan Type */}

            <div className="chart-card">

              <h3>
                Leaving Rate by Plan Type
              </h3>

              <p>
                This compares the percentage
                of customers leaving across
                different plans.
              </p>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={dataset.subscription_chart}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="churn_rate"
                    name="Leaving Rate %"
                    fill="#3b82f6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>


            {/* Plan Duration */}

            <div className="chart-card">

              <h3>
                Leaving Rate by Plan Duration
              </h3>

              <p>
                This compares customer leaving
                rates for monthly, quarterly,
                and annual plans.
              </p>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={dataset.contract_chart}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="churn_rate"
                    name="Leaving Rate %"
                    fill="#8b5cf6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


// ==================================================
// HISTORY
// ==================================================

function HistoryPage({
  history,
  historyLoading,
  historyError,
  loadHistory,
}) {
  return (
    <div className="page-content">

      <div className="page-heading">

        <h2>Prediction History</h2>

        <p>
          View recent customer predictions
          recorded by Zenva.
        </p>

      </div>


      <button
        className="history-button"
        onClick={loadHistory}
      >
        {historyLoading
          ? "Loading History..."
          : "Refresh History"}
      </button>


      {historyError && (
        <div className="error-message">
          {historyError}
        </div>
      )}


      {history.length > 0 && (
        <div className="history-table-container">

          <table className="history-table">

            <thead>

              <tr>

                <th>Customer ID</th>
                <th>Prediction</th>
                <th>Chance of Leaving</th>
                <th>Risk Level</th>
                <th>Date & Time</th>

              </tr>

            </thead>


            <tbody>

              {history.map(
                (record, index) => (

                  <tr
                    key={`${record.CustomerID}-${index}`}
                  >

                    <td>
                      {record.CustomerID}
                    </td>

                    <td>
                      {record.prediction === 1
                        ? "Leaving"
                        : "Staying"}
                    </td>

                    <td>
                      {(
                        record.churn_probability * 100
                      ).toFixed(2)}
                      %
                    </td>

                    <td>

                      <span
                        className={`risk-badge risk-${record.risk_level.toLowerCase()}`}
                      >
                        {record.risk_level}
                      </span>

                    </td>

                    <td>
                      {new Date(
                        record.created_at
                      ).toLocaleString()}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>
      )}


      {history.length === 0 &&
        !historyLoading && (
          <div className="empty-history">
            No predictions have been recorded yet.
          </div>
        )}

    </div>
  );
}


// ==================================================
// MAIN APP
// ==================================================

function App() {

  const [activePage, setActivePage] =
    useState("dashboard");


  const [customer, setCustomer] = useState({
    CustomerID: "",
    Age: "",
    Gender: "Male",
    Tenure: "",
    Usage_Frequency: "",
    Support_Calls: "",
    Payment_Delay: "",
    Subscription_Type: "Basic",
    Contract_Length: "Monthly",
    Total_Spend: "",
    Last_Interaction: "",
  });


  const [result, setResult] = useState(null);

  const [error, setError] = useState("");


  const [dataset, setDataset] = useState(null);

  const [uploadError, setUploadError] =
    useState("");

  const [uploading, setUploading] =
    useState(false);


  const [history, setHistory] =
    useState([]);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [historyError, setHistoryError] =
    useState("");


  // -----------------------------------------
  // Form change
  // -----------------------------------------

  const handleChange = (e) => {

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [e.target.name]: e.target.value,
    }));

  };


  // -----------------------------------------
  // Prediction
  // -----------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setResult(null);

    try {

      const response = await fetch(`${API_BASE_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            CustomerID:
              Number(customer.CustomerID),

            Age:
              Number(customer.Age),

            Gender:
              customer.Gender,

            Tenure:
              Number(customer.Tenure),

            Usage_Frequency:
              Number(customer.Usage_Frequency),

            Support_Calls:
              Number(customer.Support_Calls),

            Payment_Delay:
              Number(customer.Payment_Delay),

            Subscription_Type:
              customer.Subscription_Type,

            Contract_Length:
              customer.Contract_Length,

            Total_Spend:
              Number(customer.Total_Spend),

            Last_Interaction:
              Number(customer.Last_Interaction),

          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Prediction failed"
        );

      }


      setResult(data);

      loadHistory();

    } catch (error) {
      console.error("Prediction error:", error);

      if (error.message === "Failed to fetch") {
        setError(
          "Could not connect to Zenva. Please make sure the FastAPI server is running."
        );
      }  else {
         setError(
           error.message || "Something went wrong while making the prediction."
         );
      
      }

      setResult(null);
    }

  };


  // -----------------------------------------
  // Dataset upload
  // -----------------------------------------

  const handleDatasetUpload =
    async (e) => {

      const file =
        e.target.files[0];


      if (!file) {
        return;
      }


      setUploading(true);

      setUploadError("");

      setDataset(null);


      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );


      try {

        const response =
          await fetch(`${API_BASE_URL}/upload-dataset`,
            {
              method: "POST",
              body: formData,
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(

            typeof data.detail === "string"
              ? data.detail
              : data.detail?.message ||
                "Dataset upload failed"

          );

        }


        setDataset(data);

      } catch (error) {

        console.error(error);

        setUploadError(
          error.message ||
          "Could not upload the dataset."
        );

      } finally {

        setUploading(false);

      }

    };


  // -----------------------------------------
  // History
  // -----------------------------------------

  const loadHistory = async () => {

    setHistoryLoading(true);

    setHistoryError("");


    try {

      const response =
        await fetch(`${API_BASE_URL}/history?limit=20`);


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          "Could not load prediction history"
        );

      }


      setHistory(
        data.history
      );

    } catch (error) {

      console.error(error);

      setHistoryError(
        "Could not load prediction history."
      );

    } finally {

      setHistoryLoading(false);

    }

  };


  // -----------------------------------------
  // Render page
  // -----------------------------------------

  const renderPage = () => {

    if (activePage === "predict") {

      return (
        <PredictionPage
          customer={customer}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          result={result}
          error={error}
        />
      );

    }


    if (activePage === "insights") {

      return (
        <InsightsPage
          dataset={dataset}
          uploadError={uploadError}
          uploading={uploading}
          handleDatasetUpload={
            handleDatasetUpload
          }
        />
      );

    }


    if (activePage === "history") {

      return (
        <HistoryPage
          history={history}
          historyLoading={
            historyLoading
          }
          historyError={
            historyError
          }
          loadHistory={
            loadHistory
          }
        />
      );

    }


    return (
      <Dashboard
        setActivePage={
          setActivePage
        }
      />
    );

  };


  // -----------------------------------------
  // Application
  // -----------------------------------------

  return (

    <div className="app">


      <header className="top-header">

        <div className="brand">

          <h1>ZENVA</h1>

          <span>
            AI Customer Churn Platform
          </span>

        </div>

      </header>


      <div className="app-layout">


        <aside className="sidebar">

          <nav>


            <button
              className={
                activePage === "dashboard"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                setActivePage(
                  "dashboard"
                )
              }
            >
              <span>🏠</span>
              Dashboard
            </button>


            <button
              className={
                activePage === "predict"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                setActivePage(
                  "predict"
                )
              }
            >
              <span>🔮</span>
              Predict Customer
            </button>


            <button
              className={
                activePage === "insights"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                setActivePage(
                  "insights"
                )
              }
            >
              <span>📊</span>
              Data & Insights
            </button>


            <button
              className={
                activePage === "history"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => {

                setActivePage(
                  "history"
                );

                loadHistory();

              }}
            >
              <span>📋</span>
              Prediction History
            </button>


          </nav>

        </aside>


        <main className="main-content">

          {renderPage()}

        </main>


      </div>


    </div>

  );
}


export default App;