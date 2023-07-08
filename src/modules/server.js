async function checkDate(classFormat) {
  return await fetch(
    `http://localhost:3000/api/availability?classFormat=${classFormat}`
  )
    .then((res) => res.json())
    .then((message) => {
      console.log(message.message);
    });
}
export default {
  checkDate,
};
