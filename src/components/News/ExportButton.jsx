import React from "react";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

const ExportButton = ({ data, filename }) => {
  // Define CSV headers
  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Author", key: "author" },
    { label: "Published At", key: "publishedAt" },
  ];

  // Map your data to match headers
  const csvData = data.map((item) => ({
    title: item.title || "N/A",
    description: item.description || "N/A",
    author: item.source?.name || "Unknown",
    publishedAt: item.publishedAt || "N/A",
  }));

  return (
    <CSVLink
      data={csvData}
      headers={csvHeaders}
      filename={filename}
      className="btn btn-primary"
      target="_blank"
    >
      Export to CSV
    </CSVLink>
  );
};

// Define PropTypes
ExportButton.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
};

ExportButton.defaultProps = {
  filename: "news_data.csv",
};

export default ExportButton;
