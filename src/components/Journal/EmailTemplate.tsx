type EmailTemplateProps = {
  email: string;
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div
    style={{
      color: "#0a4a64",
      background: "#eff3f6",
      borderRadius: "12px",
      padding: "12px",
    }}
  >
    <h1
      style={{
        color: "#0a4a64",
      }}
    >
      Welcome, to the Peace Adventures!
    </h1>
    <p
      style={{
        color: "#0a4a64",
      }}
    >
      Payload...
    </p>
    <p>Your email: {email}</p>
  </div>
);
