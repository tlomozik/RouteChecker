import * as palette from "../Variables.js";
import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const AuthorizationButton = styled(Button)`
  margin-top: 10px;
  width: auto;
  background-color: ${palette.headerColor};
`;
