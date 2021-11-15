import styled from "styled-components";

export default styled.div`
  padding-left: 20px;
  padding-right: 20px;

  @media (min-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1024px;
  }

  @media (min-width: 1050px) {
    padding: 0;
  }
`;
