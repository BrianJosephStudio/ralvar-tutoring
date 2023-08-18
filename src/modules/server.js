import store from "../vuex";

export async function checkDate() {
  console.log(store.state.bookings.availability.unavailable);

  const params = new URLSearchParams();

  params.append(
    "classFormat",
    store.state.bookings.availability.classFormat.format
  );
  params.append("startTime", store.state.bookings.availability.startTime);
  params.append("endTime", store.state.bookings.availability.endTime);
  const queryStrings = params.toString();

  const url = `http://localhost:3000/api/availability?${queryStrings}`;
  try {
    const res = await fetch(url);
    const json = await res.json();
    store.commit("changeUnavailable", json);
  } catch (e) {
    console.error(e);
  }
  console.log(store.state.bookings.availability.unavailable);
}
export async function submitBookingData(booking) {
  const url = `http://localhost:3000/api/submitBookingData`;
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  };
  const response = fetch(url, options);
  if (response.ok) {
    const data = await response.json();
  }
  //do something with json
}
