import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { deposit } from '../api/api';
import { useLocation } from "react-router-dom";


const DepositPage = () => {

    const navigate = useNavigate();
    const [depositAmount, setDepositAmount] = useState(0);
    const location = useLocation();
    const { account } = location.state || {};


    const handelAmountChange = (event) =>{
      setDepositAmount(event.target.value);
    }
    const handleMain = () => {
      navigate('/main');
    };
    const handleDeposit = async() => {
      try{
        const depositInfo={
          amount : depositAmount
        };
        const response = await deposit(depositInfo);
        if(response.status ===200){
          alert(response.data.message); // 입금 성공
          navigate('/main');
        }
      }catch (error){
        alert("서버 오류가 발생했습니다.")
        console.log("입금 요청 실패: \n", error);
      }
    };



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>입금하기</h1>

      <div style={styles.infoBox}>
        <strong>계좌 번호:</strong> {account}
      </div>

      <input
        type="text"
        placeholder="입금할 금액을 입력하세요"
        style={styles.input}
        name='amount'
        onChange={handelAmountChange}
      />
        <div style={styles.buttonBox}>
          <button style={styles.button} onClick={handleMain}>취소</button>
          <button style={styles.button} onClick={handleDeposit}>입금</button>
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
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  infoBox: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '400px',
    marginBottom: '1.5rem',
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
  buttonBox: {
    display: 'flex',
    gap: '1rem',
  },
};

export default DepositPage;
