type EmailTemplateProps = {
  data: {
    title: string;
    category: string;
    description: string;
    email: string;
    createdAt: string;
  };
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  data,
}) => {
  const { title, category, description, createdAt, email } = data;
  return (
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
        New Post from user!
      </h1>
      <p>
        <span style={{ fontWeight: 600 }}>USER EMAIL:</span> {email}
      </p>
      <p>
        <span style={{ fontWeight: 600 }}>TITLE:</span> {title}
      </p>
      <p>
        <span style={{ fontWeight: 600 }}>CATEGORY:</span> {category}
      </p>
      <p>
        <span style={{ fontWeight: 600 }}>DESCRIPTION:</span> {description}
      </p>
      <p>
        <span style={{ fontWeight: 600 }}>DATE:</span> {createdAt}
      </p>
    </div>
  );
};
