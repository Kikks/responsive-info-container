const InfoItem = ({ details }: { icon: string; details: string }) => (
	<div className='info-item'>
		<div className='info-item__icon' />
		<span className='info-item__details'>{details}</span>
	</div>
);

const Category = ({ name }: { name: string }) => (
	<div className='category'>
		<span className='category__name'>{name}</span>
	</div>
);

const PostMeta = () => {
	return (
		<div className='container'>
			<div className='info'>
				<div className='info__container'>
					<div className='info__group info__group--break-small'>
						<div className='info__group'>
							<InfoItem icon='' details='17 min read' />
						</div>
						<div className='info__group space-x'>
							<Category name='Business,' />
							<Category name='Data Science,' />
							<Category name='Engineering' />
						</div>
					</div>
					<div className='info__group info__group--break-xs'>
						<div className='info__group'>
							<InfoItem icon='' details='Published: 13 Sep, 2023' />
						</div>
						<div className='info__group'>
							<InfoItem icon='' details='No Comment' />
							<InfoItem icon='' details='Share' />
						</div>
					</div>
				</div>

				<button className='btn'></button>
			</div>
		</div>
	);
};

export default PostMeta;
