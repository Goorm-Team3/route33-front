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
        if(response.status ===200){
          alert(response.data.message); // 송금 성공
          navigate('/main');
        }
      }catch(error){
        if(error.response.status === 400 && error.response.data.message){
          alert(error.response.data.message);
          // 400 : 송금을 위한 잔액이 부족합니다, 현재 잔액:
          // 400 : 회원 번호 userId에 대한 계좌를 찾을 수 없습니다.
        }else{
          alert("서버 오류가 발생했습니다.")
          console.log("송금 요청 실패: \n", error);
        }
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
