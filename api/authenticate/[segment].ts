import { authenticate } from '../../utils/authenticate';

export default function handler(req, res) {
  const { segment = '' } = req.query;
  authenticate(segment, function (err, token) {
    var result
    if ( err || !token ) {
      result = {"error": err || "bad_code"};
      console.error(result.error);
    } else {
      result = {"token": token};
      console.log("token", result.token, true);
    }
    res.status(200).json(result);
  }, false);
}