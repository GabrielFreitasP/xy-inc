import AuthService from '@services/AuthService';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ error: 'No token provided' });

	//Bearer {hash}
	const parts = authHeader.split(' ');

	if (!parts.length == 2) return res.status(401).send({ error: 'Token error' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

	try {
		req.username = AuthService.verifyToken(token);
		next();
	} catch (err) {
		return res.status(401).send({ error: 'Token invalid' });
	}
};
