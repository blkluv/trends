import { FieldValues, useForm } from 'react-hook-form';
import { FormControl } from './TrendForm';
import toast from 'react-hot-toast';
import { Button } from './TrendForm';
import styled from 'styled-components';
import { useTrendingStore } from '../store';
import { IStyledProps } from '../interfaces/cssComponentStyles';
import { StyledForm } from './CssComponents/StyledComponents';
import { useEffect } from 'react';
import { useMutateUpdateComment } from './../hooks/useMutateUpdateComment';

interface Props {
	username: string;
	trendId: number;
	initialFormFields: CommentFormFields;
}

interface CommentFormFields {
  id: number;
	comment: string;
}

// ! Add input validation to improve UX
const DashboardCommentForm = ({
	username,
	trendId,
	initialFormFields,
}: Props) => {
	const theme = useTrendingStore((store) => store.theme);
	const { register, setValue, handleSubmit } = useForm();
	const {
		isError: isCommentError,
		error: commentErr,
		mutate: updateComment,
	} = useMutateUpdateComment();
	const commentError: any = commentErr;

	useEffect(() => {
		setValue('commentContent', initialFormFields.comment);
	});

	// Commenting
	const onSubmitComment = async({ commentContent }: FieldValues) => {
		const newComment = {
      id: initialFormFields.id,
			trend_id: trendId,
			content: commentContent,
			author: username,
		};
    console.log('newComment', newComment);
		updateComment(newComment);

		if (isCommentError) return toast.error(commentError.message);

		toast.success('Updating comment...');
	};

	return (
		<StyledCommentForm setting={theme}>
			<StyledForm setting={theme}>
				<h2>Edit Comment</h2>
				<form onSubmit={handleSubmit(onSubmitComment)}>
					<FormControl className='form-control'>
						<textarea
							maxLength={300}
							rows={3}
							placeholder='Leave a comment. Max 300 characters.'
							{...register('commentContent')}
						/>
					</FormControl>
					<Button>Send</Button>
				</form>
			</StyledForm>
		</StyledCommentForm>
	);
};

export default DashboardCommentForm;

//CSS Components
const StyledCommentForm = styled.div<IStyledProps>`
	${(props) =>
		props.setting === 'light'
			? 'color:  var(--color-black-500);'
			: 'color:  var(--color-grey-500);'};

	h2 {
		${(props) =>
			props.setting === 'light'
				? 'color:  var(--color-indigo-50);'
				: 'color:  var(--color-pink-100);'};
		font-size: 1.2rem;
	}
	@media only screen and (max-width: 500px) {
		h2 {
			font-size: 1rem;
		}
	}
`;
