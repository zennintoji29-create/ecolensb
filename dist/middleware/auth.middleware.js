"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const supabase_1 = require("../config/supabase");
const errors_1 = require("../types/errors");
async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.AppError('Missing or invalid Authorization header', 401, 'UNAUTHORIZED');
        }
        const token = authHeader.split(' ')[1];
        const { data: { user }, error, } = await supabase_1.supabaseAdmin.auth.getUser(token);
        if (error || !user) {
            throw new errors_1.AppError('Invalid or expired token', 401, 'UNAUTHORIZED');
        }
        req.user = {
            id: user.id,
            email: user.email,
        };
        next();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=auth.middleware.js.map