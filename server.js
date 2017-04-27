import app from './src/app';

const port = process.env.NODE_PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`server running on port ${port}`);
  }
});
