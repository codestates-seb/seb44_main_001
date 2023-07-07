import SemiHeader from "../../../common/components/SemiHeader";
import { Layout } from "../../../common/style";
import { Background } from "../../Signup/views/Signup";
import profile from "../../../common/assets/profile.svg"
import { styled } from "styled-components";
import Button from "../../../common/components/Button";
import { useState } from "react";

export default function User() {
  const [isMine, setIsMine] = useState(true);
  return (
    <div>
      <SemiHeader title="나의 프로필" content=""/>
      <Layout>
        <ProfileBackground>
          <ProfileBox>
            <div style={{display:"flex"}}>
              <ProfileImg src={profile} />
              <div style={{display:"flex", flexDirection:"column", marginTop:"2rem"}}>
                <div>혜수는졸려잉</div>
                <div>경기도 화성시</div>
                <div>태그목록</div>
              </div>
            </div>
            {isMine
              ? <Button children={"프로필 수정"} />
            : <>&nbsp;</>}
          </ProfileBox>
          <MsgBox>
            <div>
              자기소개입니다!!
            </div>
          </MsgBox>
        </ProfileBackground>
      </Layout>
    </div>
  )
}

const ProfileBackground = styled(Background)`
  
`

const ProfileBox = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
`

const ProfileImg = styled.img`
  width: 10rem; 
  margin-right: 2rem;
`
const ProfileContentBox = styled.div`
  display: flex;

`

const MsgBox = styled.div`
background-color: var(--color-pink-3);
width: 100%;
min-height: 100px;
padding: 1rem;
border-radius: 10px;
margin-top: 2rem;
border: solid 2px var(--color-pink-1)
`
