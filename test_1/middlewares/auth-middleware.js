import jwt from "jsonwebtoken";

export default function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (e) {
        res.json({status:'failed', message: 'unauthorized', description: 'Not successful, invalid token'});
    }
};