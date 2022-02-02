import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Song from "./Song";
import { useParams } from "react-router-dom";

const SongSearchResult = () => {
  const [songs, setSongs] = useState([]);
  const params = useParams();

  useEffect(() => {
    getSongs();
  }, []);

  const baseEndpoint =
    "https://striveschool-api.herokuapp.com/api/deezer/track/";

  const getSongs = async () => {
    const response = await fetch(baseEndpoint + params.id);
    const { data } = await response.json();

    getSongs(data);
  };

  return (
    <Container>
      <Row>
        <Col>
          {data.map((songData) => (
            <Song key={songData.id} payload={songData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SongSearchResult;
