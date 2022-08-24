export default function authenticate(req, res) {
  console.log('----------------------------------------------------------------');
  console.log(process.env);
  console.log('----------------------------------------------------------------');
  res.status(200).response({
    body: '123'
  })
}