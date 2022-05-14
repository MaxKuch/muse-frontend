export interface IArtist {
    _id: string;
    thumbnail: string;
    name: string;
    description?: string;
}

export interface IAlbum {
    _id: string;
    thumbnail: string;
    name: string;
    artist: IArtist;
    description?: string;
}

export interface IAudio {
    album: IAlbum;
    _id: string;
    src: string;
    thumbnail: string;
    artist: IArtist;
    name: string;
    listens: number;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    favoriteSongs: IAudio[];
}

export interface IOption {
    label: string;
    value: string;
}

export interface IApiError {
    data: {
        message: string;
        status: number;
    }
}

export interface IFetchParams {
    offset?: number; 
    searchQuery?: string;
}