import app from './src/app';

const port = process.env.NODE_PORT || 4000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`server running on port ${port}`);
  }
});
