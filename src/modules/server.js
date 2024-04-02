import moment from "moment";
import store from "../vuex";
import config from "../../config.js";

export async function checkDate() {
  try {
    const params = new URLSearchParams();

    params.append("classFormat", store.state.bookings.availability.classFormat.format);
    params.append("startTime", store.state.bookings.availability.startTime);
    params.append("endTime", store.state.bookings.availability.endTime);
    const queryStrings = params.toString();

    const url = `${config.api_endpoints.availability.fetchAvailableDates}?${queryStrings}`;
    const res = await fetch(url);
    const unavailable = await res.json();
    const selectedDates = store.state.bookings.calendar.selectedDates;
    selectedDates.forEach((selected, index) => {
      const selectedDate = moment(selected.date);
      unavailable.forEach((monthObject) => {
        if (monthObject.month === selectedDate.month()) {
          monthObject.items.forEach((dayObject) => {
            if (dayObject.day === selectedDate.date()) {
              dayObject.items.forEach((timeObject) => {
                if (timeObject.time === selectedDate.format("HH:mm")) {
                  store.dispatch("toggleSelectedDate", {
                    date: selectedDate.toISOString(),
                  });
                }
              });
            }
          });
        }
      });
    });
    console.log(unavailable);
    store.commit("changeUnavailable", unavailable);
  } catch (e) {
    console.error(e);
  }
  // console.log(store.state.bookings.availability.unavailable);
}
export async function submitBookingData(booking) {
  try {
    const url = config.api_endpoints.bookings.submitBookingData;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    };
    const response = await fetch(url, options);
    return response;
  } catch (e) {
    throw e;
  }
}
export async function createPaymentIntent() {
  return await fetch(config.api_endpoints.payments.paymentIntent, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: store.state.bookings.booking.paymentData.checkoutPrice,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const { clientSecret } = await response.json();
      return clientSecret;
    })
    .catch((e) => console.error(e));
}
export async function abortBooking() {
  const clientSecret = store.state.bookings.booking.paymentData.clientSecret;
  return await fetch(config.api_endpoints.bookings.abortBooking, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientSecret: clientSecret,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      console.log(response.message);
    })
    .catch((e) => console.error(e));
}
export async function checkPaymentStatus() {
  try {
    const res = await fetch(config.api_endpoints.payments.paymentStatus);
    if (!res.ok) {
      throw new Error("Server did not respond successfully");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}
export async function handleContactRequest(contactForm) {
  try {
    const url = config.api_endpoints.contact.requestContact;
    const requestBody = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm),
    };
    const response = await fetch(url, requestBody);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
