import styled from 'styled-components';

export const List = styled.li`
    // Disable Class Changes

    list-style: none;
    width: 10%;
    border: 1px solid;
    text-align: center;
    padding: 5px;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
    .empty-img img {
      opacity: 1;
    }
  `