# Utility Types

1. Partial<Type>

주어진 타입의 `모든 하위 타입 집합`을 나타내는 타입을 반환한다.

예시 코드
```ts
interface Todo {
  title: string;
  description: string;
}
 
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
 
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
 
const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
/**
 * updateTodo에 올수있는 타입
 * {}
 * {title: string}
 * {description: string}
 * {title: string, description: string}
 * /
```


실제 내부 구현코드
```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

2. Required<Type>

Type 집합의 모든 프로퍼티를 필수로 설정한 타입을 반환한다. `Partial`의 `반대`

예시 코드
```ts
interface Props {
  a?: number;
  b?: string;
}
 
const obj: Props = { a: 5 };
 
const obj2: Required<Props> = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```


실제 내부 구현코드
```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

3. Readonly<Type>

Type 집합의 모든 프로퍼티 읽기 전용(readonly)으로 설정한 타입을 생성한다, 즉 생성된 타입의 프로퍼티에 재할당 할 수 없다.

예시 코드
```ts
interface Todo {
  title: string;
}
 
const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};
 
todo.title = "Hello";
// Cannot assign to 'title' because it is a read-only property.
```


실제 내부 구현코드
```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

4. Record<Keys,Type>

타입 Type의 프로퍼티 키의 집합으로 타입을 생성한다.

예시 코드
```ts
interface PageInfo {
  title: string;
}
 
type Page = "home" | "about" | "contact";
 
const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
 
nav.about;
```


실제 내부 구현코드
```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

5. Pick<Type, Keys>

Type에서 프로퍼티 Keys의 집합을 선택해 타입을 생성한다.

예시 코드
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;
```

실제 내부 구현코드
```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

6. Omit<Type, Keys>
Type에서 선택한 모든 속성을 제거하여 타입을 생성한다.

예시 코드
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;
```


실제 내부 구현코드
```ts
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

7. Exclude<Type, ExcludedUnion>
ExcludedUnion에 할당할 수 있는 모든 유니온 멤버를 Type에서 제외하여 타입을 생성한다.

예시 코드
```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
     type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
     type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
     type T2 = string | number
```


실제 내부 구현코드
```ts
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

8. Extract<Type, Union>
Union에 할당할 수 있는 모든 유니온 멤버를 Type에서 가져와서 타입을 생성한다.

예시 코드
```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
     type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>;
     type T1 = () => void
```


실제 내부 구현코드
```ts
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

9. NonNullable<Type>
Type에서 null과 정의되지 않은 것(undefined)을 제외하고 타입을 생성한다.

예시 코드
```ts
type T0 = NonNullable<string | number | undefined>;
     type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>
     type T1 = string[]
```


실제 내부 구현코드
```ts
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {};
```

10. Parameters<Type>
함수 타입 Type의 매개변수에 사용된 타입에서 튜플 타입을 생성한다.

예시 코드
```ts
declare function f1(arg: { a: number; b: string }): void;
 
type T0 = Parameters<() => string>;
     type T0 = []

type T1 = Parameters<(s: string) => void>;
     type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>;
     type T2 = [arg: unknown]

type T3 = Parameters<typeof f1>;
     type T3 = [arg: {
    a: number;
    b: string;
}]

type T4 = Parameters<any>;
     type T4 = unknown[]

type T5 = Parameters<never>;
     type T5 = never

type T6 = Parameters<string>;
/**
 * Type 'string' does not satisfy the constraint '(...args: any) => any'.
 */
     type T6 = never

/**
 * Type 'string' does not satisfy the constraint '(...args: any) => any'.
 */

```


실제 내부 구현코드
```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

11. ConstructorParameters<Type>
생성자 함수 타입의 타입에서 튜플 또는 배열 타입을 생성합니다. 모든 매개변수 타입을 가지는 튜플 타입(또는 Type이 함수가 아닌 경우 타입 never)을 생성한다.

예시 코드
```ts
type T0 = ConstructorParameters<ErrorConstructor>;
     
type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>;
     
type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;
     
type T2 = [pattern: string | RegExp, flags?: string]
type T3 = ConstructorParameters<any>;
     
type T3 = unknown[]
 
type T4 = ConstructorParameters<Function>;
/**
 * Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.
 */
     
type T4 = never
```


실제 내부 구현코드
```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

12. ReturnType<Type>
생성자 함수 타입의 타입에서 튜플 또는 배열 타입을 생성합니다. 모든 매개변수 타입을 가지는 튜플 타입(또는 Type이 함수가 아닌 경우 타입 never)을 생성한다.

예시 코드
```ts
declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>;
     type T0 = string

type T1 = ReturnType<(s: string) => void>;
    type T1 = void

type T2 = ReturnType<<T>() => T>;
     type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
     type T3 = number[]

type T4 = ReturnType<typeof f1>;
     type T4 = {
    a: number;
    b: string;
}

type T5 = ReturnType<any>;
     type T5 = any

type T6 = ReturnType<never>;
     type T6 = never

type T7 = ReturnType<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
     type T7 = any

type T8 = ReturnType<Function>;
Type 'Function' does not satisfy the constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.
     
type T8 = any
/**
 * Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
  Type 'Function' provides no match for the signature 'new (...args: any): any'.
 */
     
type T4 = never
```


실제 내부 구현코드
```ts
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
