export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    company: "SNH AI",
    role: "Data Engineer Intern",
    start: "Jun 2025",
    end: "Present",
    location: "Austin, Texas",
    highlights: [
      "Developed and configured data labeling workflows in Label Studio for AI agent models.",
      "Designed and implemented data transformation pipelines to standardize heterogeneous XML into a unified golden dataset.",
      "Created and validated XSD schemas to ensure consistency and integrity of XML data across sources.",
      "Collaborated with ML engineers and stakeholders to align data preparation with model training needs.",
    ],
  },
  {
    company: "JSoftUSA",
    role: "Data Analyst Intern",
    start: "Feb 2024",
    end: "Aug 2024",
    location: "Austin, Texas",
    highlights: [
      "Analyzed student attendance and performance data, driving a 15% increase in platform adoption.",
      "Automated ETL workflows using SQL scripts, reducing manual reporting time by 30%.",
      "Built Tableau dashboards to track performance and resource use, improving educator efficiency.",
      "Conducted regression analysis to identify student success drivers for targeted interventions.",
      "Partnered with product to improve reporting tools in line with regulatory standards.",
    ],
  },
];

