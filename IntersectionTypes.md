# 교차 타입(Intersection Types)
여러가지 타입을 하나로 결합한다.
기존 타입에 새로운 필드를 추가 하고 싶을 때 사용한다.

예시 코드
```ts
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
```

## 주의점
겹치는 필가 존재할 경우

1. 겹치는 필드의 타입이 같은 경우

예시 코드
```ts
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
```

2. 겹치는 필드의 타입이 다른 경우

예시 코드
```ts
type Developer = {
    output: number; // ** 
    developer: () => void;
}
 
type Designer = {
    output: string | number; // ** 
    design: () => void;
}
 
const 개자이너: Developer & Designer = {
    // output: 'sth cool', // error
    output: 1, // ok (string | number) & number 이라서 number type은 ok!
    developer() {
        console.log("업무 중");
    },
    design() {
        console.log("업무 중");
    }
}
```