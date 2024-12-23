"use client";

import React from "react";
import Image from "next/image";
import { registerOAuthApp } from "../../api/api"; // OAuth 앱 등록 함수 임포트

const KakaoLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 앱 키
  const redirectUri = "http://localhost:3000"; // 카카오에 등록한 리디렉션 URI

  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  const handleKakaoLogin = async () => {
    try {
      // 카카오 앱 등록을 수행
      const response = await registerOAuthApp("KAKAO"); // 카카오로 앱 등록
      console.log("카카오 OAuth 앱 등록 성공:", response);

      // OAuth 앱 등록 후 카카오 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("카카오 OAuth 앱 등록 실패:", error);
      alert("카카오 OAuth 앱 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <a
      href={kakaoLoginUrl} // 기본적으로 카카오 로그인 페이지로 리디렉션
      onClick={handleKakaoLogin} // 클릭 시 앱 등록 후 리디렉션
      className="text-[1.6rem] font-bold mt-[0.8rem] flex items-center justify-center bg-white p-3 rounded-full"
    >
      <Image
        src="/icons/kakao.svg"
        alt="카카오 로고"
        width={24}
        height={24}
        className="mr-2"
      />
      카카오로 시작하기
    </a>
  );
};

export default KakaoLoginButton;
