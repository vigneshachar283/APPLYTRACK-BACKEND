const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

       const header = req.headers.authorization;

        if (!header) {
            return res.status(401).send("No token provided");
        }
       
       const token = header.split(" ");

       const bearer = token[1];

         if (!bearer) {
            return res.status(401).send("Invalid token format");
        }

        const decoded = jwt.verify(
            bearer,
            process.env.JWT_SECRET
        );

        req.user = decoded;

  next();
    } catch (err) {
   
        res.status(500).send("Internal server err ${err.message}");

    }
};

module.exports = {authMiddleware};