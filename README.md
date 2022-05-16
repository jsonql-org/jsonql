# jsonql

> V.2

jsonql main mono repo (manage by [pnpm](https://pnpm.io))

## Introduction

It's a very simple concept DRY (Don't Repeat Yourself!)

After over a decade as a full stack developer, I keep finding myself doing repetitive work.
Backend API, then front end write connector all over again. So back in 2016, I start working
on this little project. Have the backend generate a contract, and the front end read it,
then generate all the relevant calls plus validations based on the arguments of the backend api.
Save me a hell lot of time, and this is what jsonql all about

```

BACKEND <--> CONTRACT <--> FRONT END

```

The contract basically looks like this (v.2):

```json
{
  "data": {
    "methodName": {
      "params": []
    }
  } ,
  "error": {} ,
  "meta": {}
}

```

Simple ... well, simple idea was never easy to implement. But I manage to create a working version
(Called it V.1 but still lots of features not completed). And actually put it to commercial use,
and its the core system that drive a (near) real time system that serve up over 7000 handsets in UK, it
provides near real time railway information for the largest train company in the country.

And lots happens, and kind of stop on the development, but I keep thinking about the short coming of this system,
namely the socket part and performance, because trying to mix a CORS http system with socket is no easy task.

In V.2 I change the approach from one big system to many smaller parts that provide distinctive feature,
and this approach allow me to rebuild an entire new system in 3 months: [Velocejs](https://github.com/veloce-js)

And the story doesn't stop here, because after learning many other system and languages, I found the idea of
jsonql still has it's edge. Unlike GraphQL, you need to learn a new (kinda) language, there is nothing new
to learn by using jsonql. Just follow couple rules (or not, just set up the way you see fit) and just code
the way you have been, be it plain old CJS, ESM, or our new friend TS. And it doesn't stop there, what about
the other non-js coder? Python, Rust, Go, Kotlin, Dart ...? Yes they are all welcome, and you can help to
make it happens too.

I will rewrite the documentation once the [Velocejs](https://github.com/veloce-js) reach v.1, which is soon.

In the mean time, help test this tech stack and try them out:

- [@jsonql/ast](./packages/ast/README.md)
- [@jsonql/contract](./packages/contract/README.md)
- [@jsonql/validator](./packages/validator/README.md)

There are several supporting libraries

- [@jsonql/constants](./packages/constants/README.md)
- [@jsonql/errors](./packages/errors/README.md)
- [@jsonql/utils](./packages/utils/README.md)
- [@jsonql/validator-core](./packages/validator-core/README.md)

Coming soon

May 2022

---

Joel Chu (c) 2022
