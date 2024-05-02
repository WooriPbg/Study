# 초과 속성 검사(Excess Property Checks)

객체 리터럴은 다른 변수에 할당하거나 인수로 전달할 때 특별한 처리를 받고 과도한 속성 검사를 거친다.

예시 코드
```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
 
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
 
let mySquare = createSquare({ colour: "red", width: 100 });
/**
 * Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
 */
```

## 초과 속성 검사 피하는 법

1. type assertion

예시 코드
```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

2. 인덱스 서명(Index Signature)

예시 코드
```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

3. 객체를 다른 변수에 할당

예시 코드
```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
