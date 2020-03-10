import AuthService from '@services/AuthService';

const authMiddleware = async (req: any, res: any, next: any) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send({
			success: false,
			message: 'No token provided'
		});
	}

	//Bearer {hash}
	const parts: string[] = authHeader.split(' ');

	if (!(parts.length === 2)) {
		return res.status(401).send({
			success: false,
			message: 'Token error'
		});
	}

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).send({
			success: false,
			message: 'Token malformatted'
		});
	}

	try {
		req.username = await AuthService.verifyToken(token);
		next();
	} catch (err) {
		return res.status(401).send({
			success: false,
			message: 'Token invalid'
		});
	}
};

export default authMiddleware;
