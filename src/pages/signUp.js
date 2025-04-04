import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userPwConfirm, setUserPwConfirm] = useState("");

    const handleUserNameChange = (event) =>{
      setUserName(event.target.value)
    }
    const handleUserIdChange = (event) =>{
      setUserId(event.target.value)
    }
    const handleUserPwChange = (event) =>{
      setUserPw(event.target.value)
    }
    const handleUserPwConfirm = (event)=>{
      setUserPwConfirm(event.target.value)
    }

    const handleSignUp = async () => {
      try{
        const userInfo = {
          username : userName,
          loginId : userId,
          password : userPw,
          passwordConfirm : userPwConfirm
        };
        const response = await signup(userInfo);
        if(response && response.status === 200){
          alert(response.data.message); // 회원가입 성공
          navigate('/');
        }
      }catch(error){
        if(error.response.status === 400 && error.response.data.message){
          alert(error.response.data.message);
          // 400 : 송금을 위한 잔액이 부족합니다, 현재 잔액:
        }else{
          alert("회원가입에 실패했습니다.")
          console.log("회원가입 실패: \n", error);
        }
      }
    };
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Route33 - 회원가입</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="사용자 이름"
          style={styles.input}
          onChange={handleUserNameChange}
          name = "userName"
        />
        <input
          type="text"
          placeholder="로그인 ID"
          style={styles.input}
          name = "userId"
          onChange={handleUserIdChange}
        />
        <input
          type="password"
          placeholder="비밀번호"
          style={styles.input}
          name='userPw'
          onChange={handleUserPwChange}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          style={styles.input}
          name='userPwConfirm'
          onChange={handleUserPwConfirm}
        />
        <button style={styles.button} onClick={handleSignUp}>회원가입</button>
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

export default SignUpPage;
