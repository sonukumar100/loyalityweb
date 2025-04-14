# Instruction

- Clone the repository using ‘git clone <repo-url>’
- Then run
  ```jsx
  yarn install
  yarn start
  ```
- Open http://localhost:3000

### How to create a component?

```jsx
yarn generate component
```

![Untitled](instruction/Untitled.png)

It will ask these question, always choose the option as shown in image.

### How to create a RTK Slice?

```jsx
yarn generate slice
```

![Untitled](instruction/Untitled%201.png)

It will ask these question, always choose the option as shown in image.

### How to create RTK Query?

- First create a slice using above mentioned command.
- Then in slice/index.ts import rtk query api

![Untitled](instruction/Untitled%202.png)

- Then create a rtk query api like
  ![Untitled](instruction/Untitled%203.png)
- Mention the state for rtk query in src/types/RootState.ts file
  ![Untitled](instruction/Untitled%204.png)
- Then mention the rtk middleware in src/store/rtkQueryMiddleware.ts file.
  ![Untitled](instruction/Untitled%205.png)
