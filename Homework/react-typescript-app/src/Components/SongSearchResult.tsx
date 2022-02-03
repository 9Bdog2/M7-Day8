import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Song from "./Song";
import { useParams } from "react-router-dom";
import { ISongs } from "./MainSearch";

const SongSearchResult = () => {
  const [songs, setSongs] = useState<ISongs | null>(null);
  const params = useParams();

  useEffect(() => {
    getSongs();
  }, []);

  const baseEndpoint =
    "https://striveschool-api.herokuapp.com/api/deezer/track/";

  const getSongs = async () => {
    const response = await fetch(baseEndpoint + params.songId);
    // const { data, error }
    const song = await response.json();
    /* as {
      data?: ISongs;
      error?: unknown;
    };

    if (error) return console.error(error);*/

    setSongs(song);
  };

  return (
    <Container>
      <Row>
        <Col>
          {songs && <Song song={songs} />}
          {/*songs.map((songData) => ())*/}
        </Col>
      </Row>
    </Container>
  );
};

export default SongSearchResult;
