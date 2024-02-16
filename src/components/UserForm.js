import React from "react";

export default function UserForm() {
  return (
    <form>
      <label htmlFor='username"'>
        <input type="text" name="username"></input>
      </label>
      <label htmlFor="password">
        <input type="text" name="password"></input>
      </label>
      <button type="button"></button>
    </form>
  );
}
