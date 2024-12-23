type EmailTemplateProps = {
  data: {
    title: string;
    category: string;
    description: string;
    email: string;
    images?: string[];
    createdAt: string;
  };
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  data,
}) => {
  const { title, category, description, createdAt, email, images } = data;
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
        <span style={{ fontWeight: 600 }}>IMAGES URLS: </span>
        {!!images?.length ? (
          <ul>
            {images?.map((url) => (
              <li key={url}>{url}</li>
            ))}
          </ul>
        ) : (
          <span>No images</span>
        )}
      </p>
      <p style={{ marginTop: "8px" }}>
        <span style={{ fontWeight: 600 }}>CREATED AT:</span> {createdAt}
      </p>
    </div>
  );
};
