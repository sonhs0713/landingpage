import { Link } from 'react-router-dom'

function ThankYou() {
  return (
    <main className="status-page">
      <div className="status-card">
        <h1 className="status-title">결제가 완료되었습니다.</h1>
        <p className="status-description">
          입력하신 이메일로 1시간 이내 분석 리포트를 보내드립니다.
          <br />
          (평일 오전 10시 ~ 오후 6시 기준)
          <br />
          문의사항은 sonhs0713@gmail.com로 연락주세요
        </p>
        <Link to="/" className="hero-button status-home-button">
          메인으로 돌아가기
        </Link>
      </div>
    </main>
  )
}

export default ThankYou
