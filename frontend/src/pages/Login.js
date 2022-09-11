function Login() {
  return (
    <div>
      <p>로그인페이지</p>
      <form method="POST" action="/loginAction">
        <p><label>ID: <input key="id"/></label></p>
        <p><label>PW: <input key="pw"/></label></p>
      </form>
    </div>
  )
}

export default Login;