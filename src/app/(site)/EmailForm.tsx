import React from "react";

const EmailForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form
      className="Ecom-Email-Form"
      name="Ecom-Email-Form"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <p className="form-phrase">Subscribe For Our Latest Deals</p>
      <p className="actual-form">
        <input
          id="email-box"
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <button type="submit">Subscribe</button>
      </p>
    </form>
  );
};

export default EmailForm;
