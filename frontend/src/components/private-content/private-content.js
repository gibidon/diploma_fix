import { useSelector } from 'react-redux';
import { selectUserRole } from '#selectors';
import { checkAccess } from '#utils';

export const PrivateContent = ({ children, accessRoles, serverError = null }) => {
	const userRole = useSelector(selectUserRole);
	const accessError = checkAccess(accessRoles, userRole) ? null : 'ERROR.ACCESS_DENIED';
	const error = accessError || serverError;

	return error ? error : children;
};
