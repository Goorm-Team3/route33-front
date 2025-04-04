import axios from "axios";
import SERVER from "./url";
import axiosInstance from "./axiosInstance";

export const signup = async(userInfo)=>{
    try{
        const response = await axios.post(`${SERVER}/user/register`,userInfo);
        if(response.status === 200 || response.status===201){
            return response;
        }
    }catch(error){
        throw error;
    }
}



// 사용자 인증 : login
export const authUser = async (userInfo) => {
    try {
      const response = await axios.post(`${SERVER}/user/login`, userInfo);
      if (response.status === 200) {
        alert("로그인에 성공했습니다.");
        return response;
      }
    } catch (error) {
      throw error;
    }
  };


  // main 
  export const getuserAccountInfo = async ()=>{
    const token = localStorage.getItem("accessToken");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`, // 인증 토큰을 헤더에 추가
        },
      };
    try{
        const response = await axiosInstance.get(`/account`,config);
        if(response.status === 200){
            return response;
        }

    }catch (error){
        throw error;
    }

  }


  // logout -> 추후 수정 필요
  export const logout = async () => {
    try {
      const tokenInfo ={
        refreshToken : localStorage.getItem("refreshToken")
      };
      const response = await axios.post(`${SERVER}/user/logout`,tokenInfo);
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  };


//예금
  export const deposit = async(accountInfo)=>{
    try{
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
        const response = await axiosInstance.post(`/account/deposit`,accountInfo,config);
        if(response.status === 200){
          return response;
        }
    }catch(error){
      // if(error.response.status === 401){
      //   await refreshToken();
      // }
      throw error;
    }
}

//출금
export const withdraw = async(accountInfo)=>{
    try{
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
        const response = await axiosInstance.post(`/account/withdraw`,accountInfo,config);
        if(response.status === 200 ){
          return response;
        }
    }catch(error){
      // if(error.response.status === 401){
      //   await refreshToken();
      // }
      throw error;
    }
}

//송금
export const transfer = async(accountInfo)=>{
    try{
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        };
        const response = await axiosInstance.post(`/account/transfer`,accountInfo,config);
        if(response.status === 200 ){
          return response;
        }
    }catch(error){
      // if(error.response.status === 401){
      //   await refreshToken();
      // }
      throw error;
    }
}


// export const refreshToken = async(accountInfo)=>{
//   try{
//       const token = localStorage.getItem("refreshToken");
//       const refreshInfo = {
//         "refreshToken" : token
//       };
//       const response = await axios.post(`${SERVER}/user/token/refresh`,refreshInfo);
//       if(response.status === 200 ){
//         const data = response.data;
//         const accessToken = data.accessToken;
//         const refreshToken = data.refreshToken
//         localStorage.setItem("accessToken",accessToken);
//         localStorage.setItem("refreshToken",refreshToken);
//       }
//   }catch(error){
//       throw error;
//   }
// }