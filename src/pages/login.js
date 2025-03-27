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
        if(response && response.status===200){
          // const toekn = response.data.token;
          const name = response.data.name;
          // localStorage.setItem("token",token);
          localStorage.setItem("userName",name);
          alert("로그인 되었습니다");
          navigate("/main");
        }else{
          alert("Id/Pw를 다시 확인 해 주세요");
        }

      }catch(error){
        console.log(error);
        alert("로그인에 실패했습니다.");
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
