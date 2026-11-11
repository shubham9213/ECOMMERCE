async function admin (req, resp, next) {
    if(req.user && req.user.role==="admin"){
        next();
    } else {
        resp.status(403).json({ message: "Access denied. Admin only." });
    }
}
export default admin;