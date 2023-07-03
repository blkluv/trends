import styled from 'styled-components';

interface Props {
	children?: any;
	title?: string;
	buttonText?: string;
	onToggleModal: () => boolean;
}

const Modal = ({
	children = '',
	title = '',
	buttonText = 'close',
	onToggleModal,
}: Props) => {
	return (
		<ModalStyles>
			<h1 className='title'>{title}</h1>
			<div className='content'>{children}</div>
			<button onClick={() => onToggleModal()}>{buttonText}</button>
		</ModalStyles>
	);
};

export default Modal;

// CSS Components
const ModalStyles = styled.div`
	background: var(--color-blue-semi_transparent);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;
