//LABLES
const labelDay = document.querySelector(".label-day");
const labelMonth = document.querySelector(".label-month");
const labelYear = document.querySelector(".label-year");
//ERRORS
const dayError = document.querySelector(".day");

const monthError = document.querySelector(".month");
const yearError = document.querySelector(".year");

//INPUTS
const dayInput = document.querySelector(".input-day");
const monthInput = document.querySelector(".input-month");
const yearInput = document.querySelector(".input-year");
//SVG
const stratIcon = document.querySelector("svg");

//CALCULATES DARTE
const calculateYear = document.querySelector(".calculate-year");
const calculateMonth = document.querySelector(".calculate-month");
const calculateDay = document.querySelector(".calculate-day");

//PUBLIC VARIABLES
let month;
let year;
let maxDays = 31;
let valueOfDays = "";
const date = new Date();

//GET CURRENT DATE
let ourDay = date.getDate();
let ourMonth = date.getMonth() + 1;

let ourYear = date.getFullYear();

//FUNCTIONS

const calculate = () => {
	let day = Number(dayInput.value);
	let month = Number(monthInput.value);
	let year = Number(yearInput.value);

	const pastDate = new Date(year, month - 1, day);

	const timeDiff = date - pastDate;
	const secunds = timeDiff / 1000;
	const minuts = secunds / 60;
	const hours = minuts / 60;
	const dayCount = hours / 24;
	const monthCount = dayCount / 30.4368499;
	const monthsDiff = monthCount;
	const remainingMonthsDiff = monthsDiff % 12;
	const resztaZMiesiąca = remainingMonthsDiff - Math.floor(remainingMonthsDiff);

	const remainingDaysDiff = Math.round(
		dayCount - monthCount * 30.4368499 + resztaZMiesiąca * 30.4368499
	);
	let yearsDiff;
	if (year > 0 && year < 100) {
		yearsDiff = Math.floor(monthsDiff / 12) + 1900;
	} else {
		yearsDiff = Math.floor(monthsDiff / 12);
	}

	if (day === 0 && month === 0 && year === 0) {
		calculateDay.textContent = " -- ";
		calculateMonth.textContent = " -- ";
		calculateYear.textContent = " --";
	} else if (day === 0 || month === 0 || year === 0) {
		calculateDay.textContent = " -- ";
		calculateMonth.textContent = " -- ";
		calculateYear.textContent = " --";
	} else if (day <= maxDays && month <= 12 && year <= ourYear) {
		calculateDay.textContent = remainingDaysDiff;
		calculateMonth.textContent = Math.floor(remainingMonthsDiff);
		calculateYear.textContent = yearsDiff;
	} else {
		calculateDay.textContent = " -- ";
		calculateMonth.textContent = " -- ";
		calculateYear.textContent = " --";
	}
};

const setDays = () => {
	let daysOftheWeek = Number(dayInput.value);

	if (daysOftheWeek === 0) {
		dayError.classList.remove("hidden");
		dayInput.classList.add("errors");
		labelDay.classList.add("label-error");
		dayError.textContent = "The filled is required";
	} else if (daysOftheWeek < 0 || daysOftheWeek > maxDays) {
		dayError.classList.remove("hidden");
		dayInput.classList.add("errors");
		labelDay.classList.add("label-error");
		dayError.textContent = `Give the correct day of the month ${valueOfDays}`;
	} else {
		dayError.classList.add("hidden");
		dayInput.classList.remove("errors");
		labelDay.classList.remove("label-error");
	}
};
const setMonths = () => {
	month = Number(monthInput.value);
	if (month === 0) {
		monthError.classList.remove("hidden");
		monthInput.classList.add("errors");
		labelMonth.classList.add("label-error");
		monthError.textContent = "The filled is required";
	} else if (month < 0 || month > 12) {
		monthError.classList.remove("hidden");
		monthInput.classList.add("errors");
		labelMonth.classList.add("label-error");
		monthError.textContent = "Give the correct month(1 - 12)";
	} else {
		monthError.classList.add("hidden");
		monthInput.classList.remove("errors");
		labelMonth.classList.remove("label-error");
	}
};
const setYears = () => {
	year = Number(yearInput.value);

	if (year === 0) {
		yearError.classList.remove("hidden");
		yearInput.classList.add("errors");
		labelYear.classList.add("label-error");
		yearError.textContent = "The filled is required";
		console.log(yearInput.value + " jest nic");
	} else if (year > 2023) {
		yearError.classList.remove("hidden");
		yearInput.classList.add("errors");
		labelYear.classList.add("label-error");
		yearError.textContent = "Must be in the past";
	} else {
		yearError.classList.add("hidden");
		yearInput.classList.remove("errors");
		labelYear.classList.remove("label-error");
	}
};
const exceptions = () => {
	month = Number(monthInput.value);
	year = Number(yearInput.value);

	const exception = [2, 4, 6, 9, 11];
	if (month === exception[0]) {
		maxDays = 28;
		valueOfDays = "(1 - 28)";

		dayError.innerText = `Give the correct day of the month ${valueOfDays}`;
	} else {
		maxDays = 31;
	}

	if (year % 4 === 0 && month === exception[0] && year !== 0) {
		maxDays = 29;
		valueOfDays = `(1 - 29)`;
		dayError.textContent = `Give the correct day of the month ${valueOfDays}`;
	} else {
	}

	if (
		month == exception[1] ||
		month == exception[2] ||
		month == exception[3] ||
		month == exception[4]
	) {
		maxDays = 30;
		valueOfDays = "(1 - 30)";
		dayError.textContent = `Give the correct day of the month ${valueOfDays}`;
	} else {
	}
};

const startCalculate = () => {
	setDays();
	setMonths();
	setYears();
	if (ourDay && month > ourMonth && year >= ourYear) {
		yearError.classList.remove("hidden");
		yearInput.classList.add("errors");
		labelYear.classList.add("label-error");
		yearError.textContent = "Must be in the past";
	} else calculate();
};

//LISTENERS

stratIcon.addEventListener("click", exceptions);
stratIcon.addEventListener("click", startCalculate);
