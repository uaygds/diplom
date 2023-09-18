import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Info {
  count: number;
  next: string;
  pages: number;
  prev: string;
}

export interface ForCharacters {
  id: number;
  name: string;
  status: "Alive" | "Dead";
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
interface ForEpisodes {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
interface ForLocations {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

interface DataCharacters {
  info: Info;
  results: ForCharacters[];
}

interface DataEpisodes {
  info: Info;
  results: ForEpisodes[];
}

interface DataLocations {
  info: Info;
  results: ForLocations[];
}

interface PostersState {
  dataCharacters: DataCharacters | undefined;
  dataEpisodes: DataEpisodes | undefined;
  dataLocations: DataLocations | undefined;
  episodes: ForEpisodes[];
  characters: ForCharacters[];
  locations: ForLocations[];
  error: boolean;
}

const initialState: PostersState = {
  characters: [],
  episodes: [],
  locations: [],
  dataCharacters: undefined,
  dataEpisodes: undefined,
  dataLocations: undefined,
  error: false,
};

export const thunkGetCharacters = createAsyncThunk(
  "posters/getCharacters",
  async () => {
    const response = await axios.get<DataCharacters>(
      `https://rickandmortyapi.com/api/character`
    );
    return response.data;
  }
);

export const thunkGetEpisodes = createAsyncThunk(
  "posters/getEpisodes",
  async () => {
    const response = await axios.get<DataEpisodes>(
      `https://rickandmortyapi.com/api/episode`
    );
    return response.data;
  }
);

export const thunkGetLocations = createAsyncThunk(
  "posters/getLocations",
  async () => {
    const response = await axios.get<DataLocations>(
      `https://rickandmortyapi.com/api/location`
    );
    return response.data;
  }
);

export const postersSlice = createSlice({
  name: "posters",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      thunkGetLocations.fulfilled,
      (state, action: PayloadAction<DataLocations>) => {
        state.locations = action.payload.results;
        state.dataLocations = action.payload;
      }
    );
    builder.addCase(
      thunkGetCharacters.rejected ||
        thunkGetEpisodes.rejected ||
        thunkGetLocations.rejected,
      (state) => {
        state.error = false;
      }
    );
    builder.addCase(
      thunkGetEpisodes.fulfilled,
      (state, action: PayloadAction<DataEpisodes>) => {
        state.dataEpisodes = action.payload;
        state.episodes = action.payload.results;
      }
    );
    builder.addCase(
      thunkGetCharacters.fulfilled,
      (state, action: PayloadAction<DataCharacters>) => {
        state.dataCharacters = action.payload;
        state.characters = action.payload.results;
      }
    );
  },
});

export default postersSlice.reducer;
