import styled from "styled-components";

export default styled.div`
  margin-left: 10px;
  margin-right: 10px;

  @media (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1024px;
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (min-width: 1050px) {
    padding: 0;
  }
`;
