import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <p>메인페이지</p>
      <Link to="/login">로그인</Link>
    </div>
  )
}

export default Main;