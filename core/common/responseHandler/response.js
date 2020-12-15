exports.emptyResponse = (res) => {
  return res.status(404).json({
    success: true,
    message: "Empty!!!, Records not found",
  });
};
exports.failResponse = (res, msg) => {
  return res.status(400).json({
    success: false,
    message: msg,
  });
};
exports.successResponse = (res, data, msg) => {
  if (!data) {
    return res.status(200).json({
      success: true,
      message: msg ? msg : 'successful action',
    });
  } else {
    return res.status(200).json({
      success: true,
      message: msg ? msg : 'successful action',
      count: data.length,
      data: data
    });
  }

};
