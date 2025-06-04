import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentInfo } from "./fetchCurrentInfo";
import { Alert } from "antd";

const CurrentInfoMarquee = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["current-info-marquee"],
    queryFn: fetchCurrentInfo,
    refetchInterval: false, // Disable automatic refetching
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });

  if (isLoading) return null; // Or show a loading spinner if you prefer
  if (error) return <Alert type="error" message="Failed to load current info" banner />;

  if (!data?.currentInfo) return null;

  return (
    <div style={{
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: "10px 40px",
      fontWeight: "bold",
      width: "75%",
      color: "#333"
    }}>
      <div style={{
        display: "inline-block",
        paddingLeft: "100%",
        animation: "scroll-left 15s linear infinite"
      }}>
        {data.currentInfo}
      </div>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default CurrentInfoMarquee;
