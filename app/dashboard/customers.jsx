"use client";
import { useState, useEffect } from "react";
import css from "./customers.module.css";

function Customers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch("/api/getusers");
      if (!response.ok) {
        return new Response("failed to load users");
      }
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
      console.log(data);
    }

    getUsers();
  }, []);

  console.log(users);

  const Card = (props) => {
    return (
      <div className={css.userCard}>
        <h1>{props.name}</h1>
        <h1>{props.email}</h1>
        <h1>{props.password}</h1>
      </div>
    );
  };

  return (
    <div>
      <h1>Our Customers</h1>
      {isLoading && <p>Getting User Data...</p>}
      {users.map((user) => {
        return (
          <Card
            key={user.id}
            name={user.name}
            email={user.email}
            password={user.password}
          />
        );
      })}
    </div>
  );
}

export default Customers;