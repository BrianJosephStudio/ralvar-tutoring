import store from "../vuex";

async function checkDate() {
  const params = new URLSearchParams();

  params.append(
    "classFormat",
    store.state.bookings.availability.classFormat.format,
  );
  params.append("startTime", store.state.bookings.availability.startTime);
  params.append("endTime", store.state.bookings.availability.endTime);
  const queryStrings = params.toString();

  const url = `http://localhost:3000/api/availability?${queryStrings}`;

  return await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      store.commit("changeUnavailable");
      console.log(JSON.stringify(res));
    });
}
export default {
  checkDate,
};
