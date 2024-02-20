import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROLES } from '#constants';
import { selectUserRole, selectUserLogin, selectUserId } from '#selectors';
import { ToolTip } from '#components';
import { logout } from '#actions';
import { checkAccess } from '#utils';
import { FaUser } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { IoLogOutOutline } from 'react-icons/io5';
import { TbPlayerSkipBackFilled } from 'react-icons/tb';
import { BsSuitcase2 } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa6';
import styles from './control-panel.module.scss';

export const ControlPanel = () => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLES.ADMIN], roleId);

	return (
		<div className={styles.info}>
			{roleId === ROLES.GUEST ? (
				<span className={styles.highlight}>
					<Link to="/login" className={styles.link}>
						<ToolTip text={'Login'}>
							<FaUser className={styles.loginIcon} />
						</ToolTip>
					</Link>
				</span>
			) : (
				// </span>
				<div className={styles.panel}>
					<div className={styles.userName}>Hello, {login}</div>

					<IoLogOutOutline
						className={styles.logoutIcon}
						onClick={onLogout}
						style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}
					/>
				</div>
			)}

			<TbPlayerSkipBackFilled
				style={{ cursor: 'pointer' }}
				onClick={() => {
					navigate(-1);
				}}
			/>

			{roleId !== ROLES.GUEST && (
				<Link to={`/user/${userId}`}>
					<BsSuitcase2
						style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}
					/>
				</Link>
			)}
			{isAdmin && (
				<>
					<Link to="/hotel/create">
						<CiEdit
							style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}
						/>
					</Link>
					<Link to="/admin">
						<FaUsers
							style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}
						/>
					</Link>
				</>
			)}
		</div>
	);
};
