import { verifyToken } from "../providers/jwtProvider.js";

export const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Authentication Error: Please Login");
    }

    const userInfo = verifyToken(token);
    if (!userInfo) {
        return res.status(401).send("Authentication Error: Unauthorize user");
    }

    req.user = userInfo;
    next();
};

export const optionalAuth = (req, res, next) => {
    const token = req.header("x-auth-token");

    // No token? No problem - just continue without user info
    if (!token) {
        req.user = null;
        return next();
    }

    // Try to verify token
    const userInfo = verifyToken(token);

    // If valid token, attach user info. If invalid, treat as unauthenticated
    req.user = userInfo || null;
    next();
};

export const isRecruiter = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (req.user.userType !== 'recruiter') {
        return res.status(403).json({ message: 'Recruiter access required' });
    }
    
    next();
};

export const isRecruiterOrAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    const isRecruiterUser = req.user.userType === 'recruiter';
    const isAdminUser = req.user.userType === 'admin' || req.user.isAdmin;
    
    if (!isRecruiterUser && !isAdminUser) {
        return res.status(403).json({ message: 'Recruiter or admin access required' });
    }
    
    next();
};

export const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    const isAdminUser = req.user.userType === 'admin' || req.user.isAdmin;
    
    if (!isAdminUser) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
};





