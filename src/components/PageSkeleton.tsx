import React from 'react';

const PageSkeleton = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#F9EFE9", padding: "2rem" }}>
      {/* Hero Skeleton */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: "1rem", marginTop: "4rem" }}>
        <div style={{ height: "400px", background: "#F0DCC8", borderRadius: "24px", animation: "pulse 1.5s infinite" }}></div>
        <div style={{ height: "400px", background: "#FBE6D6", borderRadius: "24px", animation: "pulse 1.5s infinite" }}></div>
      </div>

      {/* Grid Skeleton */}
      <div style={{ maxWidth: "1200px", margin: "2rem auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ height: "200px", background: "#EDD5C0", borderRadius: "16px", animation: "pulse 1.5s infinite" }}></div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default PageSkeleton;
