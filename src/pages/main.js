import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getuserAccountInfo } from '../api/api';
import { logout } from '../api/api';


const MainPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [balance, setBalance] = useState(0);

    const handleDeposit = () => {
        navigate('/deposit',{
          state :{account : accountNumber}
        });
    };

    const handleWithdraw = () => {
        navigate('/withdraw',{
          state :{account : accountNumber}
        });
    };

    const handleTransfer = () => {
        navigate('/transfer',{
          state :{account : accountNumber}
        });
    };

    const handleLogout = async() => {
      try{
        
        const response = await logout();
        if(response.status === 200){
          alert(response.data.logout);
          localStorage.clear();
          navigate('/');
        }
        
      }catch(error){
        alert(error.response.data.message);

      }
        await logout();
    };


    useEffect(() => {
      const fetchAccountInfo = async () => {
          try {
              const response = await getuserAccountInfo();
              if (response && response.status === 200) {
                  const data = response.data.data;
                  console.log(data);
                  setUserName(data.username);
                  setAccountNumber(data.accountNumber);
                  setBalance(data.balance);
              } 
          } catch (error) {
            if(error.response.status === 400 && error.response.data.message){
              alert(error.response.data.message);
              // 400 : 존재하지 않는 회원 입니다.
            }else{
              alert("서버 오류가 발생했습니다.")
              console.log("계좌 정보 요청 실패: \n", error);
            }
          }
      };

      fetchAccountInfo();
  }, []);



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>삼심삼쩜삼 뱅킹</h1>
      <div style={styles.infoBox}>
        <div style={styles.infoItem}>
          <strong>사용자 이름 :</strong> {userName}
        </div>
        <div style={styles.infoItem}>
          <strong>계좌 번호 :</strong> {accountNumber}
        </div>
        <div style={styles.infoItem}>
          <strong>잔액 :</strong> ￦ {balance}
        </div>
      </div>

      <div style={styles.buttonBox}>
        <button style={styles.button} onClick={handleDeposit}>입금</button>
        <button style={styles.button} onClick={handleWithdraw}>출금</button>
        <button style={styles.button} onClick={handleTransfer}>송금</button>
        <button style={styles.button} onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  infoBox: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '2rem',
    backgroundColor: '#f9f9f9',
  },
  infoItem: {
    marginBottom: '1rem',
    fontSize: '1.2rem',
  },
  buttonBox: {
    display: 'flex',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#87CEFA',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default MainPage;
