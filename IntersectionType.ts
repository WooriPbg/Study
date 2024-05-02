//1 

interface ErrorHandling {
success: boolean;
error?: { message: string };
}

interface ArtworksData {
artworks: { title: string }[];
}

interface ArtistsData {
artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
if (response.error) {
    console.error(response.error.message);
    return;
}

console.log(response.artists);
};

// 2

type Developer = {
    output: string;
    developer: () => void;
}
 
type Designer = {
    output: string;
    design: () => void;
}
 
const 개자이너: Developer & Designer = {
    output: 'sth cool', // ok
    developer() {
        console.log("업무 중");
    },
    design() {
        console.log("업무 중");
    }
}

// 3

type Developer2 = {
    output: number; // ** 
    developer: () => void;
}
 
type Designer2 = {
    output: string | number; // ** 
    design: () => void;
}
 
const 개자이너2: Developer2 & Designer2 = {
    // output: 'sth cool', // error
    output: 1, // ok (string | number) & number 이라서 number type은 ok!
    developer() {
        console.log("업무 중");
    },
    design() {
        console.log("업무 중");
    }
}