import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import BellSvg from "../../../../assets/svg/BellSvg";
import LogoSvg from "../../../../assets/svg/LogoSvg";
import QuestionSvg from "../../../../assets/svg/QuestionSvg";
import SearchSvg from "../../../../assets/svg/SearchSvg";
import {
  editProfileModalAtom,
  headerMenuAtom,
} from "../../../../recoil/modalAtoms";
import { groupUserAtom } from "../../../../recoil/userAtoms";
import { existCookie } from "../../../../utils/existCookie";
import { handleImgError } from "../../../../utils/handleImgError";
import AlertModal from "../../../Modals/AlertModal";
import ProfileEditModal from "../../../Modals/ProfileEditModal";
import HeaderMenu from "../HeaderMenu";
import {
  RightNav,
  Nav,
  SearchForm,
  Wrapper,
  SearchInput,
  FakeImg,
} from "./styles";

const GroupHeader = () => {
  const [headerMenu, setHeaderMenu] = useRecoilState(headerMenuAtom);
  const [editProfile, setEditProfile] = useRecoilState(editProfileModalAtom);
  const [headerAlert, setHeaderAlert] = useState(false);
  const { groupId } = useParams();
  const groupUser = useRecoilValue(groupUserAtom);
  const navigate = useNavigate();

  // 토큰이 없다면 시작페이지로 이동
  useEffect(() => {
    const cookie = existCookie();
    if (!cookie) {
      return navigate("/");
    }
  }, [navigate]);

  return (
    <Wrapper as="header">
      <Nav as="nav">
        <Link to={"/main"}>
          <LogoSvg />
        </Link>
        <SearchForm>
          <SearchSvg />
          <SearchInput
            type="text"
            placeholder="일정을 알고 싶은 팀원, 프로젝트를 검색해보세요"
          />
        </SearchForm>
        <RightNav>
          <li>
            <QuestionSvg />
          </li>
          <li onClick={() => setHeaderAlert(true)}>
            <BellSvg />
          </li>
          <li onClick={() => setHeaderMenu(true)}>
            {groupUser && groupUser.groupAvatarImg ? (
              <img
                src={groupUser.groupAvatarImg}
                alt={groupUser.groupUserNickname}
                onError={handleImgError}
              />
            ) : (
              <FakeImg />
            )}

            {headerMenu && <HeaderMenu user={groupUser} />}
          </li>
        </RightNav>
      </Nav>
      {headerAlert ? <AlertModal setHeaderAlert={setHeaderAlert} /> : null}
      {editProfile ? (
        <ProfileEditModal
          closeModal={setEditProfile}
          user={groupUser}
          groupId={groupId}
        />
      ) : null}
    </Wrapper>
  );
};

export default GroupHeader;
