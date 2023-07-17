import { TbShirtFilled, TbMovie, TbMusic, TbCpu2, TbDeviceTv, TbPhotoEdit, TbCircleX, TbMail, TbMailForward, TbGraph } from 'react-icons/tb';
import { FaRegComments } from 'react-icons/fa';
import styled from 'styled-components';
import { IStyledProps } from '../interfaces/cssComponentStyles';

interface Props {
	icon: string;
  fontSize?: string;
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  paddingBottom?:string;
  marginBottom?:string;
  border?: string;
}

const Icon = ({ icon, fontSize, display, justifyContent, alignItems, marginBottom, paddingBottom, border }: Props) => {
	const icons: any = {
		movie: <TbMovie />,
		clothing: <TbShirtFilled />,
		music: <TbMusic />,
		videoAndTv: <TbDeviceTv />,
		technology: <TbCpu2 />,
    edit: <TbPhotoEdit/>,
    delete: <TbCircleX/>,
    mail: <TbMail/>,
    mailForward: <TbMailForward/>,
    comments: <FaRegComments/>,
    trends: <TbGraph/>
	};

	return <IconStyles display={display} fontSize={fontSize} justifyContent={justifyContent} alignItems={alignItems} marginBottom={marginBottom} paddingBottom={paddingBottom} border={border}>{icons[icon]}</IconStyles>;
};

export default Icon;

const IconStyles = styled.span<IStyledProps>`
  display: flex;
  justify-content: center;
  ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : 'font-size: 1.5rem'};
  ${(props) => props.display ? 'display: ' + props.display : ''};
  ${(props) => props.alignItems ? 'align-items: ' + props.alignItems : ''};
  ${(props) => props.justifyContent ? 'justify-content: ' + props.justifyContent : ''};
  ${(props) => props.marginBottom ? 'margin-bottom: ' + props.marginBottom : ''};
  ${(props) => props.paddingBottom ? 'justify-content: ' + props.paddingBottom : ''};
  ${(props) => props.border ? 'border: ' + props.border : ''};

  @media only screen and (max-width: 500px) {
    font-size: 1rem;
	}
`
