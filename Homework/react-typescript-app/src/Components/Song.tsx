import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ISongs } from "./MainSearch";

interface IProp {
  song: ISongs;
}

const Song = ({ song }: IProp) => (
  <Row
    className="mx-0 mt-3 p-3"
    style={{ border: "1px solid #00000033", borderRadius: 4 }}
  >
    <Col xs={3}>
      <Link to={`/${song.artist.name}`}>{song.title}</Link>
      {/* {song.artist.name} */}
    </Col>
    <Col xs={3}>{song.artist.link}</Col>
    <Col xs={9}>
      <a href={song.link} target="_blank" rel="noreferrer">
        {song.title} - {song.artist.name}
      </a>
    </Col>
  </Row>
);

export default Song;
