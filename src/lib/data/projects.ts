export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "air-pollution-prediction",
    title: "Ambient Air Pollution Prediction Model",
    description:
      "Built models (Random Forest, XGBoost, k-NN, Lasso) to predict PM2.5 across the U.S.; performed EDA, feature selection, and cross-validation with RMSE optimization.",
    tags: ["Python", "Pandas", "Scikit-learn", "ML", "EDA"],
  },
  {
    slug: "rna-seq-expression-analysis",
    title: "RNA-Seq Gene Expression Analysis",
    description:
      "Differential expression analysis using DESeq2 and tximport; normalization, QC, and LFC analysis; visualized PCA, volcano plots, and heatmaps to interpret patterns.",
    tags: ["R", "Bioconductor", "DESeq2", "Data Viz"],
  },
];

