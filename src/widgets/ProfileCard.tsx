import React from "react";

export interface ProfileData {
  name: string;
  email?: string;
  avatarUrl?: string;
  avatarEmoji?: string;
  stats?: { label: string; value: string | number }[];
  role?: string;
  badgeColor?: string;
}

export const ProfileCard: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    <div
      style={{
        padding: "24px 20px 20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
        gap: 0,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--rdg-bg)",
          border: "1px solid var(--rdg-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {data.avatarUrl ? (
          <img
            src={data.avatarUrl}
            alt={data.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: 36 }}>
            {data.avatarEmoji ?? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="64"
                height="64"
                fill="none"
                stroke="var(--rdg-muted)"
                stroke-width="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            )}
          </span>
        )}
      </div>

      {/* Name & role */}
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--rdg-text)" }}>
        {data.name}
      </div>
      {data.email && (
        <div style={{ fontSize: 13, color: "var(--rdg-muted)", marginTop: 2 }}>
          {data.email}
        </div>
      )}
      {data.role && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 10px",
            borderRadius: 99,
            background: data.badgeColor ?? "var(--rdg-primary)",
            color: "#fff",
            display: "inline-block",
          }}
        >
          {data.role}
        </div>
      )}

      {/* Stats */}
      {data.stats && data.stats.length > 0 && (
        <div
          style={{
            marginTop: "auto",
            paddingTop: 5,
            display: "flex",
            gap: 0,
            width: "100%",
            borderTop: "1px solid var(--rdg-border)",
          }}
        >
          {data.stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRight:
                  i < data.stats!.length - 1
                    ? "1px solid var(--rdg-border)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--rdg-text)",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--rdg-muted)",
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
