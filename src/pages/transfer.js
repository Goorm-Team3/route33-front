import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { transfer } from '../api/api';


const TransferPage = () => {

    const navigate = useNavigate();
    const [targetAccount, setAccount] = useState("");
    const [amount, setAmount] = useState("");

    const handleAccountChange = (event)=>{
      setAccount(event.target.value);
    }

    const handelAmountChange = (event) =>{
      setAmount(event.target.value);
    }

    const handleTransfer = async() => {
      try{
        const transferInfo ={
          amount : amount,
          accountnumber: targetAccount
        };
        const response = await transfer(transferInfo);
        if(response && response.status ===200){
          alert("송금되었습니다.");
        }else{
          alert("잔액을 확인해주세요")
        }
        navigate('/main');
      }catch(error){
        alert("송금에 실패했습니다.");
        navigate('/main');
      }
    };
    
    const handleMain = () => {
        navigate('/main');
    };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>송금하기</h1>

      <div style={styles.infoBox}>
        <strong>내 계좌 번호:</strong> 110-1234-5678
      </div>

      <input
        type="text"
        placeholder="송금 대상 계좌번호"
        style={styles.input}
        name='targetAccount'
        onChange={handleAccountChange}
      />

      <input
        type="text"
        placeholder="송금할 금액"
        style={styles.input}
        name='amount'
        onChange={handelAmountChange}
      />
      <div style={styles.buttonBox}>
        <button style={styles.button} onClick={handleMain}>취소</button>
        <button style={styles.button} onClick={handleTransfer}>송금</button>
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
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#87CEFA',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonBox: {
    display: 'flex',
    gap: '1rem',
  },
};

export default TransferPage;
