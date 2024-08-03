import React from "react";
import ExamCards from "../ExamCards/ExamCards";

type CertificationLevel = "Beginner" | "Intermediate" | "Expert";
interface CardsDisplayProps {
  data: {
    id: number;
    provider: string;
    certification_name: string;
    level: CertificationLevel;
    description: string;
    tags: string[];
    official_link: string;
    critical: string;
    views: number; // For sorting
  }[];
}

const CardsDisplay: React.FC<CardsDisplayProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data.map(cert => (
        <ExamCards key={cert.id} {...cert} />
      ))}
    </div>
  );
};

export default CardsDisplay;
