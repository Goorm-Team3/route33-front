import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { deposit } from '../api/api';

const DepositPage = () => {

    const navigate = useNavigate();
    const [depositAmount, setDepositAmount] = useState("");

    const handelAmountChange = (event) =>{
      setDepositAmount(event.target.value);
    }
    const handleMain = () => {
      navigate('/main');
    };
    const handleDeposit = async() => {
      try{
        const depositInfo={
          amount : Number(depositAmount)
        };
        const response = await deposit(depositInfo);
        if(response && response ===200){
          alert("입금되었습니다.");
          navigate('/main');
        }else{
          alert("입금에 실패했습니다.");
        }
      }catch (error){
        console.log(error);
        alert("문제가 발생했습니다.");
      }
    };



  return (
    <div style={styles.container}>
      <h1 style={styles.title}>입금하기</h1>

      <div style={styles.infoBox}>
        <strong>계좌 번호:</strong> 110-1234-5678
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
