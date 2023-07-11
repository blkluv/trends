import { TbShirtFilled, TbMovie, TbMusic, TbCpu2, TbDeviceTv, TbPhotoEdit, TbCircleX, TbMail } from 'react-icons/tb';
import styled from 'styled-components';
import { IStyledProps } from '../interfaces/cssComponentStyles';

interface Props {
	icon: string;
  fontSize?: string;
  display?: string;
}

const Icon = ({ icon, fontSize, display }: Props) => {
	const icons: any = {
		movie: <TbMovie />,
		clothing: <TbShirtFilled />,
		music: <TbMusic />,
		videoAndTv: <TbDeviceTv />,
		technology: <TbCpu2 />,
    edit: <TbPhotoEdit/>,
    delete: <TbCircleX/>,
    mail: <TbMail/>
	};

	return <IconStyles display={display} fontSize={fontSize}>{icons[icon]}</IconStyles>;
};

export default Icon;

const IconStyles = styled.span<IStyledProps>`
  display: flex;
  justify-content: center;
  ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : 'font-size: 1.5rem'};
  ${(props) => props.display ? 'display: ' + props.display : ''};

  @media only screen and (max-width: 500px) {
    font-size: 1rem;
	}
`
