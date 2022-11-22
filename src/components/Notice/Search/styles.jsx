import styled from "styled-components";
import { FlexAlignBox } from "../../../shared/Styles/flex";

export const SearchForm = styled.div`
  ${FlexAlignBox}
  position: relative;
  justify-content: center;

  svg {
    position: absolute;
    right: 3rem;
    cursor: pointer;
  }
  input {
    width: 100%;
    height: 46px;
    padding: 0px 16px 0px 16px;
    font-weight: 400;
    border: none;
    border-radius: 5px;
  }
`;
