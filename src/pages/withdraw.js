import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { withdrawal } from '../api/api';


const WithdrawPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");

    const handelAmountChange = (event) =>{
      setAmount(event.target.value);
    }
    const handleWithdrawal = async () => {
      try{
        const ammountInfo = {
          amount : amount
        };
        const response = await withdrawal(ammountInfo);
        if(response && response.status ===200){
          alert("출금되었습니다");
        }else{
          alert("잔액을 확인 해 주세요");
        }
        navigate('/main');
      }catch(error){
        console.log(error);
        alert("출금에 실패했습니다.");
      }
    };

    const handelCancle = ()=> {
      navigate('/main');
    }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>출금하기</h1>

      <div style={styles.infoBox}>
        <strong>계좌 번호:</strong> 110-1234-5678
      </div>

      <input
        type="text"
        placeholder="출금할 금액을 입력하세요"
        style={styles.input}
        name='amount'
        onChange={handelAmountChange}

      />
      <div style={styles.buttonBox}>
        <button style={styles.button} onClick={handelCancle}>취소</button>
        <button style={styles.button} onClick={handleWithdrawal}>출금</button>

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

export default WithdrawPage;
