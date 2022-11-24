import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import kakaoLogin from "../../assets/image/kakaotalk-icon.png";
import NaverLogin from "../../assets/image/btnG_아이콘원형.png";
import GoogleLogin from "../../assets/image/icons8-구글-로고-48.png";

import {
  LoginContainer,
  Title,
  Form,
  Or,
  ButtonWrap,
  LoginButton,
  SocialButtonWrap,
  SignInLogo,
  Wrapper,
  BigMent,
  LogoBox,
} from "./styles";
import Input from "../../components/Common/Elements/Input";
import { signin } from "../../apis/userApi";
import { setAccessToken } from "../../shared/Cookie/Cookie";

import BigLogoSvg from "../../assets/svg/BigLogoSvg";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  // currentPage가 있으면 currentPage로 이동시키기

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const email = watch("email");
  const password = watch("password");

  const ActiveIsPassedLogin = () => {
    return email.includes("@") && password.length >= 8 && !errors.password
      ? setIsActive(true)
      : setIsActive(false);
  };

  const onSubmit = async (data) => {
    const response = await signin(data);
    const {
      status,
      data: { accessToken, refreshToken, currentPage },
    } = response;
    if (status === 200) {
      setAccessToken(accessToken);
      localStorage.setItem("token", refreshToken);
      if (currentPage) {
        return navigate(`/groups/${currentPage}`);
      } else {
        return navigate("/main/write");
      }
    }
  };

  return (
    <Wrapper>
      <LoginContainer>
        <SignInLogo>
          <LogoBox>
            <BigLogoSvg />
          </LogoBox>
          <BigMent>Manage all the statuses of your team.</BigMent>
        </SignInLogo>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={{
              ...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
                  message: "올바른 이메일 형식을 입력해주세요.",
                },
              }),
            }}
            type={"email"}
            placeholder="이메일 입력"
            onKeyUp={ActiveIsPassedLogin}
            _border={
              watch("email")?.length === 0
                ? "#BBBBBB"
                : errors.email
                ? "#FF2D53"
                : "#5FCB94"
            }
            label={"이메일"}
            errors={errors}
            errorName={"email"}
          />
          <Input
            register={{
              ...register("password", {
                required: "비밀번호를 입력해주세요.",
                maxLength: {
                  value: 20,
                  message: "20자리 이하로 작성해주세요",
                },
                minLength: {
                  value: 8,
                  message: "8자리 이상으로 작성해주세요",
                },
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                  message: "영어, 특수문자 포함 8~20자리 입니다.",
                },
              }),
            }}
            type={"password"}
            placeholder="비밀번호 입력"
            onKeyUp={ActiveIsPassedLogin}
            _border={
              watch("password")?.length === 0
                ? "#BBBBBB"
                : errors.password
                ? "#FF2D53"
                : "#5FCB94"
            }
            label={"비밀번호"}
            errors={errors}
            errorName={"password"}
          />

          <ButtonWrap>
            <button>계정 찾기</button>
            <button>비밀번호 찾기</button>
          </ButtonWrap>
          <LoginButton className={isActive ? "activeLoginBtn" : "loginBtn"}>
            로그인
          </LoginButton>
          <Or>
            <span>또는</span>
          </Or>
          <SocialButtonWrap>
            <img src={NaverLogin} alt="kakaoLogin" width="32px" height="32px" />
            <img src={kakaoLogin} alt="kakaoLogin" width="32px" height="32px" />
            <img
              src={GoogleLogin}
              alt="kakaoLogin"
              width="32px"
              height="32px"
            />
          </SocialButtonWrap>
        </Form>
      </LoginContainer>
    </Wrapper>
  );
}

export default Signin;
