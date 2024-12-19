"use client";

import { useState } from "react";
import { loginUser } from "../../api/api";
import Link from "next/link";
import Button from "../common/Button";
import InputItem from "./input-item";
import Image from "next/image";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleLogin = async () => {
    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("이메일 혹은 비밀번호를 확인해주세요.");
      setEmail("");
      return; // 이메일이 잘못되었으면 로그인 진행하지 않음
    } else {
      setEmailError(""); // 이메일 형식이 올바르면 오류 메시지 초기화
    }

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("authToken", response.data.token);
      window.location.href = "/"; // 로그인 후 홈으로 리디렉션
    } catch (error) {
      // 로그인 중 오류가 발생하면 기존의 error 상태는 사용하지 않음
      setEmailError("이메일 혹은 비밀번호를 확인해주세요.");
      console.error("로그인 중 오류", error);
    }
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      <form className="gap-[2.4rem] flex flex-col">
        <InputItem
          label="이메일"
          id="email"
          type="email"
          placeholder={emailError || "이메일 입력"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputItem
          label="비밀번호"
          id="pw"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            비밀번호를 잊으셨나요?
          </span>
        </Link>
        <Button
          type="submit"
          size="large"
          color="primary"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem]"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          로그인
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] flex items-center justify-center"
        >
          <Image
            src="/icons/google.svg"
            alt="kakao 로고"
            width={24}
            height={24}
            className="mr-2"
          />
          Goggle로 시작하기
        </Button>
        <Button
          type="submit"
          size="large"
          color="white"
          addClassName="text-[1.6rem] font-bold mt-[0.8rem] flex items-center justify-center"
        >
          <Image
            src="/icons/kakao.svg"
            alt="kakao 로고"
            width={24}
            height={24}
            className="mr-2"
          />
          kakao로 시작하기
        </Button>
      </form>

      <p className="flex gap-[1rem] text-gray-500 text-[1.6rem] mx-auto">
        계정이 없으신가요?
        <Link href="/signup" aria-label="회원가입으로 이동">
          <span className="text-primary text-[1.6rem] font-medium underline">
            회원가입 하기
          </span>
        </Link>
      </p>
    </div>
  );
}
