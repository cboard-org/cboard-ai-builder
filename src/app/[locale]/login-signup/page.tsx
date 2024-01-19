export default async function Page() {
  return (
    <>
      <div>
        <form
        //   method="post"
        //   action={formSubmit}
        >
          <label>
            Username
            <input name="username" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}
