import { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useState, ChangeEvent, FormEvent } from "react";
import Song from "./Song";

/* Implement a nice main page with an input field for the search,
 and show here also the search results. */
/* Implement a nice main page with an input field for the search,
  and show here also the search results. */

/* {
            "id": 1109731,
            "readable": true,
            "title": "Lose Yourself (From \"8 Mile\" Soundtrack)",
            "title_short": "Lose Yourself",
            "title_version": "(From \"8 Mile\" Soundtrack)",
            "link": "https://www.deezer.com/track/1109731",
            "duration": 326,
            "rank": 952888,
            "explicit_lyrics": true,
            "explicit_content_lyrics": 1,
            "explicit_content_cover": 0,
            "preview": "https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-12.mp3",
            "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
            "artist": {
                "id": 13,
                "name": "Eminem",
                "link": "https://www.deezer.com/artist/13",
                "picture": "https://api.deezer.com/artist/13/image",
                "picture_small": "https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/56x56-000000-80-0-0.jpg",
                "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/250x250-000000-80-0-0.jpg",
                "picture_big": "https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/500x500-000000-80-0-0.jpg",
                "picture_xl": "https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/1000x1000-000000-80-0-0.jpg",
                "tracklist": "https://striveschool-api.herokuapp.com/api/deezer/artist/13/top?limit=50",
                "type": "artist"
            },
            "album": {
                "id": 119606,
                "title": "Curtain Call: The Hits",
                "cover": "https://api.deezer.com/album/119606/image",
                "cover_small": "https://e-cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/56x56-000000-80-0-0.jpg",
                "cover_medium": "https://e-cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/250x250-000000-80-0-0.jpg",
                "cover_big": "https://e-cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/500x500-000000-80-0-0.jpg",
                "cover_xl": "https://e-cdns-images.dzcdn.net/images/cover/e2b36a9fda865cb2e9ed1476b6291a7d/1000x1000-000000-80-0-0.jpg",
                "md5_image": "e2b36a9fda865cb2e9ed1476b6291a7d",
                "tracklist": "https://api.deezer.com/album/119606/tracks",
                "type": "album"
            },
            "type": "track"
        }, */

interface MainSearchProps {}
interface MainSearchState {
  query: string;
  payload: ISongs[] | [];
}

/* export interface IData {
  data: ISongs[];
} */

export interface ISongs {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

class MainSearch extends Component<MainSearchProps, MainSearchState> {
  state: MainSearchState = {
    query: "",
    payload: [],
  };

  baseEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      this.baseEndpoint + this.state.query + "&limit=10"
    );
    if (!response.ok) {
      alert("Error fetching results");
      return;
    }

    const { data } = await response.json();
    console.log(data);

    this.setState({ payload: data });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={10} className="mx-auto my-3">
            <h1>Music Search</h1>
          </Col>
          <Col xs={10} className="mx-auto">
            <Form onSubmit={this.handleSubmit}>
              <Form.Control
                type="search"
                value={this.state.query}
                onChange={this.handleChange}
                placeholder="type and press Enter"
              />
            </Form>
          </Col>
          <Col xs={10} className="mx-auto mb-5">
            {this.state.payload.map((song) => (
              <Song key={song.id} song={song} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainSearch;
