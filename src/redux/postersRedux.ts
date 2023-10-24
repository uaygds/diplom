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
export interface ForEpisodes {
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
  dataCharactersWithParams: DataCharacters | undefined;
  dataEpisodes: DataEpisodes | undefined;
  dataLocations: DataLocations | undefined;
  episodes: ForEpisodes[];
  characters: ForCharacters[];
  charactersWithParams: ForCharacters[];
  locations: ForLocations[];
  error: boolean;
  character: ForCharacters | undefined;
}

const initialState: PostersState = {
  characters: [],
  episodes: [],
  locations: [],
  dataCharacters: undefined,
  dataCharactersWithParams: undefined,
  charactersWithParams: [],
  dataEpisodes: undefined,
  dataLocations: undefined,
  error: false,
  character: undefined,
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

export const thunkGetCharactersWithParams = createAsyncThunk(
  "posters/getCharactersWithParams",
  async ({ params }: { params: URLSearchParams | undefined }) => {
    const response = await axios.get<DataCharacters>(
      `https://rickandmortyapi.com/api/character/?${params}`
    );
    return response.data;
  }
);

export const thunkGetCharacter = createAsyncThunk(
  "poster/getCharacter",
  async (id: string | undefined) => {
    const response = await axios.get<ForCharacters>(
      `https://rickandmortyapi.com/api/character${id ? `/${id}` : ""}`
    );
    return response.data;
  }
);

export const thunkGetEpisodes = createAsyncThunk(
  "posters/getEpisodes",
  async ({ params }: { params: URLSearchParams | undefined }) => {
    const response = await axios.get<DataEpisodes>(
      `https://rickandmortyapi.com/api/episode/?${params}`
    );
    return response.data;
  }
);

export const thunkGetLocations = createAsyncThunk(
  "posters/getLocations",
  async ({ params }: { params?: URLSearchParams | undefined }) => {
    const response = await axios.get<DataLocations>(
      `https://rickandmortyapi.com/api/location/?${params}`
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
      thunkGetCharacter.fulfilled,
      (state, action: PayloadAction<ForCharacters>) => {
        state.character = action.payload;
      }
    );
    builder.addCase(
      thunkGetCharacters.fulfilled,
      (state, action: PayloadAction<DataCharacters>) => {
        state.dataCharacters = action.payload;
        state.characters = action.payload.results;
      }
    );
    builder.addCase(
      thunkGetCharactersWithParams.fulfilled,
      (state, action: PayloadAction<DataCharacters>) => {
        state.dataCharactersWithParams = action.payload;
        state.charactersWithParams = action.payload.results;
      }
    );
  },
});

export default postersSlice.reducer;
