import styled from "styled-components";
import { IStyledProps } from "../../interfaces/cssComponentStyles";

export const StyledForm = styled.div<IStyledProps>`
	max-width: 50%;
	margin: auto;
  
  
	label {
		font-size: 0.95rem;
		color: var(--color-grey-500);
	}

	textarea,
	input {
		font-size: 0.7rem;
		border-radius: 0.1rem;
		padding: 0.2rem;
		resize: none;
		border: 1px solid var(--color-grey-100);
	}

	textarea:focus,
	input:focus {
		background-color:  var(--color-pink-10);
		outline: none;
	}

  select{
    margin: 0.4rem 0;
    padding: 0.1rem;
    font-size: 0.9rem;
    margin-top: 0;
  }

  select:focus{
    outline: none;
    background-color: var(--color-pink-10);
  }
`;