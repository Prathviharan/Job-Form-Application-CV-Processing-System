import React, { useState } from "react";

const JobForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", cv: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  // Validate and Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.cv) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear previous errors
    setSuccess(false); // Reset success message

    // Prepare form data
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => formDataObj.append(key, formData[key]));

    try {
      const response = await fetch("http://localhost:5000/api/apply", { method: "POST", body: formDataObj });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", cv: null }); // Clear form
      } else {
        setError("Submission failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Job Application Form</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Application submitted successfully!</div>}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload CV (PDF/DOCX)</label>
          <input type="file" name="cv" className="form-control" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Application</button>
      </form>
    </div>
  );
};

export default JobForm;
