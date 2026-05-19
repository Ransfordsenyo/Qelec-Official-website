// Basic authentication middleware (for future admin routes)
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Replace with your actual admin credentials
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'password';

    if (username === adminUser && password === adminPass) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { basicAuth };