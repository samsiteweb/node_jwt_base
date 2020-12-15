const paginate = (req, res, next) => {
    const reqQuery = { ...req.query };
    const removeFields = ["select", "sort", "page", "size"];
    removeFields.forEach((param) => delete reqQuery[param]);
    const size = req.query.size ? parseInt(req.query.size) : 15;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    req.paginate = {
        size: size,
        page: page
    }
    next();
}

module.exports = paginate