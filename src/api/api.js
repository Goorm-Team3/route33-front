import axios from "axios";
import SERVER from "./url";


export const signup = async(userInfo)=>{
    try{
        const response = await axios.post(`${SERVER}/user/register`,userInfo);
        if(response.status === 200 | response.status===201){
            alert("회원가입이 완료되었습니다. 로그인 창으로 이동합니다.");
        }
    }catch(error){
        if(error.response && error.response.status ===409){
            alert("이미 존재하는 아이디 입니다.");
        }else{
            console.log(error);
        }
    }
}



// 사용자 인증 : login

export const authUser = async (userInfo) => {
    try {
      const response = await axios.post(`${SERVER}/user/login`, userInfo);
      console.log(response.data);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export const getuserAccountInfo = async ()=>{
    const config = {
        headers: {
        //   Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
        },
      };
    try{
        const response = await axios.get(`${SERVER}/user/getAccount`,config);
        if(response.status === 200){
            return response;
        }

    }catch (error){
        console.log(error);
        throw error;
    }

  }


  // logout -> 추후 수정 필요
  export const logout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
        },
      };
      const response = await axios.get(`${SERVER}/user/logout/`, config);
      if (response.status === 200) {
        alert("정상적으로 로그 아웃되었습니다..");
        return response.data;
      }
    } catch (err) {
      throw new Error("fetch department error");
    }
  };

//예금
  export const deposit = async(accountInfo)=>{
    try{
        const response = await axios.post(`${SERVER}/account/deposit`,accountInfo);
        if(response.status === 200 | response.status===201){
            alert("성공적으로 입금했습니다.");
        }
    }catch(error){
        if(error.response && error.response.status ===409){
            alert("입금에 실패했습니다.");
        }else{
            console.log(error);
        }
    }
}

//출금
export const withdrawal = async(accountInfo)=>{
    try{
        const response = await axios.post(`${SERVER}/account/withdrawal`,accountInfo);
        if(response.status === 200 | response.status===201){
            alert("성공적으로 출금했습니다.");
        }
    }catch(error){
        if(error.response && error.response.status ===409){
            alert("출금에 실패했습니다.");
        }else{
            console.log(error);
        }
    }
}

//송금
export const transfer = async(accountInfo)=>{
    try{
        const response = await axios.post(`${SERVER}/account/transfer`,accountInfo);
        if(response.status === 200 | response.status===201){
            alert("성공적으로 송금했습니다.");
        }
    }catch(error){
        if(error.response && error.response.status ===409){
            alert("송금에 실패했습니다.");
        }else{
            console.log(error);
        }
    }
}