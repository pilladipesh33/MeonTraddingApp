const { createSlice } = require("@reduxjs/toolkit");

const chartSlice = createSlice({
  name: "chart",
  initialState: { chart: false, data: {} },
  reducers: {
    chartTrue(state, action) {
      const { payload } = action;
      return { chart: true, data: payload };
    },
    chartFalse(state, action) {
      const { payload } = action;
      return { chart: false, data: payload };
    },
  },
});

export const { chartTrue, chartFalse } = chartSlice.actions;
export default chartSlice.reducer;
