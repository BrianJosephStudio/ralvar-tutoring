import store from "../vuex";

async function checkDate() {

  const params = new URLSearchParams()

  params.append('classFormat', store.state.bookings.availability.classFormat.format)
  params.append('startTime', store.state.bookings.availability.startTime)
  params.append('startTime', store.state.bookings.availability.endTime)
  const queryStrings = params.toString()

  const url = `http://localhost:3000/api/availability${queryStrings}`

  // return await fetch(url)
  //   .then((res) => res.json())
  //   .then((message) => {
  //     console.log(message.message);
  //   });
}
export default {
  checkDate,
};
