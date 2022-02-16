import { useContext, createContext, useState } from "react";

const UserContext = createContext([
  {
    firstName: "idriss",
    lastName: "iht",
    age: 23,
    email: "dihratene@gmail.com"
  },
  (obj) => obj
]);

const LevelFive = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      <h5>{`my Name is ${user.firstName} ${user.lastName} and i have ${user.age}`}</h5>
      <button
        onClick={() => {
          setUser(Object.assign({}, user, { age: user.age + 1 }));
        }}>
        Increment age
      </button>
    </div>
  );
};

const LevelFour = () => (
  <div>
    <h4>Lever Four</h4>
    <LevelFive></LevelFive>
  </div>
);

const LevelThree = () => {
  return (
    <div>
      <h4>Lever three</h4>
      <LevelFour></LevelFour>
    </div>
  );
};

const LevelTwo = () => (
  <div>
    <h4>Lever two</h4>
    <LevelThree></LevelThree>
  </div>
);

const ContextComponent = () => {
  const userState = useState({
    firstName: "reda",
    lastName: "hejjaj",
    age: 20,
    email: "reda@fdkg.com"
  });

  return (
    <UserContext.Provider value={userState}>
      <h1>first Level</h1>
      <LevelTwo></LevelTwo>
    </UserContext.Provider>
  );
};
export default ContextComponent;
