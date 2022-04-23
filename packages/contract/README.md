# @jsonql/contract

This module responsible for generate map between the server and client.
Also collection of functions to help generate AST map of your code (MJS, TS)

- Replace almost every old design
- the validation map will be replace with `@jsonql/ast`
- Drop the JSDOC support, need to write out the validation rule along with their resolver
- the validation rules can mark as `serverOnly` and public contract will act accordingly  

---

Joel Chu (C) 2022
