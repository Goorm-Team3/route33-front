import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../api/api';


const LoginPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const handleUserIdChange = (event) => {
      setUserId(event.target.value);
    }

    const handleUserPWChange = (event) =>{
      setUserPw(event.target.value);
    }

    const handleLogin = async () => {
      try{
        const userInfo = {
          loginId : userId,
          password : userPw
        };
        const response = await authUser(userInfo);
        if(response.status===200){
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken
          localStorage.setItem("accessToken",accessToken);
          localStorage.setItem("refreshToken",refreshToken);

          navigate("/main");
        }else{
          alert(response.message);
        }

      }catch(error){
        if(error.response.status === 400 || error.response.status === 401){
          alert(error.response.data.message);
          // 400 : 존재하지 않는 아이디 입니다. 401 : 비밀번호가 일치하지 않습니다.
        }else{
          alert("서버 오류가 발생했습니다.")
          console.log(error);
        }
      }
    };
    const handleSignup = () => {
            navigate('/signup');
    };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Route33</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="사용자 ID"
          style={styles.input}
          onChange={handleUserIdChange}
          name="userId"
        />
        <input
          type="password"
          placeholder="비밀번호"
          style={styles.input}
          onChange={handleUserPWChange}
          name='userPw'
        />
        <button style={styles.button} onClick={handleLogin}>로그인</button>
        <button style={styles.button} onClick={handleSignup}>회원가입</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#87CEFA',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LoginPage;
