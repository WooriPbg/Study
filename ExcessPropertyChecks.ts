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

// 1
let mySquare1 = createSquare({ colour: "red", width: 100 });

// 2
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface SquareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

let squareOptions = { colour: "red", width: 100 };

// 3
let mySquare3 = createSquare(squareOptions);
