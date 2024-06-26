function App() {
  return (
    <div>
      <form>
        <h1>Register</h1>
        <input
          type="string"
          placeholder="Name"
        />
        <input
          type="number"
          placeholder="Age"
        />
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Password"
        />
        <input
          type="password"
          placeholder="Confirm password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
