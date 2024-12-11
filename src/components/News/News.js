import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, card } from "./index";
import ExportButton from "./ExportButton";
import './News.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data for Charts
  const [articleCountsByAuthor, setArticleCountsByAuthor] = useState({});

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const category = newscategory;
  const title = capitalize(category);
  document.title = `${capitalize(title)} - News`;

  const updatenews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpointPath(country, category));
      const parsedData = response.data;
      setArticles(parsedData.articles);

      // Process data for analytics
      processArticleAnalytics(parsedData.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const processArticleAnalytics = (articles) => {
    const authorCounts = {};
    const typeCounts = {};

    articles.forEach((article) => {
      const author = article.source.name || "Unknown Author";
      const type = category;

      // Count articles by author
      authorCounts[author] = (authorCounts[author] || 0) + 1;

      // Count articles by type
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    setArticleCountsByAuthor(authorCounts);
  };

  useEffect(() => {
    updatenews();
  }, []);

  // Prepare data for charts
  const authorChartData = {
    labels: Object.keys(articleCountsByAuthor),
    datasets: [
      {
        label: "Articles by Author",
        data: Object.values(articleCountsByAuthor),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Centered Header */}
          <div className="news-header">{header(capitalize(category))}</div>

          <Container className="news-container">
            <Row>
              {articles.map((element) => (
                <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    publishedAt={element.publishedAt}
                    imageUrl={element.image === null ? NullImage : element.image}
                    urlNews={element.url}
                  />
                </Col>
              ))}
            </Row>

            {/* Export Section */}
            <div className="export-section">
              <h4>Export Options</h4>
              <ExportButton data={articles} filename={`news_data_${category}.csv`} />
            </div>

            {/* Analytics Section */}
            <div className="news-analytics-heading">News Analytics</div>
            <div className="analytics-section">
              <div className="chart-container">
                <h5 style={{ textAlign: "center" }}>Articles by Author</h5>
                <Bar data={authorChartData} />
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
